import React, { useEffect, useState } from "react"
import moment from "moment"
import { AccountCircle } from "styled-icons/remix-fill"
import { CommentDiscussion } from "styled-icons/octicons"
import {
    ContentDiv,
    SmallHeader,
    CommentFormPaper,
    CommentFormWrapper,
    CommentFormInput,
    CommentFormCancelButton,
    CommentFormSubmitButton,
    CommentListItem,
    CommentListItemAvatar,
    CommentListItemUser,
} from "../styled"
import firebaseConfig from "../firebase/config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';


async function postComment({ db, username, text, postType, postId }) {

    const newComment = {
        username: username,
        text: text,
        dateCreated: new Date(),
    }
    if (postType === 'blogPost') {
        newComment['blogPostId'] = postId;
    }
    else if (postType === 'recipe') {
        newComment['recipeId'] = postId;
    }

    const newCommentRef = await addDoc(collection(db, "comments"), newComment);
    return newCommentRef
}



const Comments = ({ postType, postId }) => {

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    const [comments, setComments] = useState([])
    const [commentName, setCommentName] = useState("")
    const [commentText, setCommentText] = useState("")
    const [showForm, setShowForm] = useState(false)

    let queryField = ""

    if (postType === "blogPost") {
        queryField = "blogPostId"
    } else if (postType === "recipe") {
        queryField = "recipeId"
    }
    
    useEffect(() => {
        const q = query(
            collection(db, "comments"),
            where(queryField, "==", postId),
            orderBy("dateCreated", "desc")
        )
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const snapshotComments = []
            snapshot.forEach((doc) => {
                snapshotComments.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setComments(snapshotComments)
        });

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [postType, postId])

    const handlePostCommentCancel = (e) => {
        e.preventDefault()
        setShowForm(false)
        setCommentName("")
        setCommentText("")
    }

    function handlePostCommentSubmit(e) {
        e.preventDefault()
        const newCommentRef = postComment({
            db: db,
            username: commentName,
            text: commentText,
            postType,
            postId,
        })
        // console.log(newCommentRef)
        setShowForm(false)
        setCommentName("")
        setCommentText("")
    }

    return (
        <ContentDiv>
            <SmallHeader>
                <CommentDiscussion
                    size={20}
                    style={{ margin: "auto 8px auto 5px" }}
                />
                Comments
            </SmallHeader>
            <CommentFormPaper show={showForm ? 0 : 1} elevation={3}>
                <div
                    role="button"
                    aria-hidden="true"
                    onClick={() => {
                        setShowForm(true)
                    }}
                >
                    What are your thoughts?
                </div>
            </CommentFormPaper>

            <CommentFormPaper show={showForm ? 1 : 0} elevation={3}>
                <CommentFormWrapper onSubmit={handlePostCommentSubmit}>
                    <CommentFormInput
                        fullWidth
                        required={showForm}
                        name="username"
                        margin="dense"
                        placeholder="Name"
                        value={commentName}
                        onChange={(e) => {
                            e.persist()
                            setCommentName(e.target.value)
                        }}
                    />
                    <CommentFormInput
                        fullWidth
                        required={showForm}
                        name="text"
                        margin="dense"
                        placeholder="What are your thoughts?"
                        value={commentText}
                        onChange={(e) => {
                            e.persist()
                            setCommentText(e.target.value)
                        }}
                    />
                    <div>
                        <CommentFormCancelButton
                            onClick={handlePostCommentCancel}
                            type="cancel"
                        >
                            Cancel
                        </CommentFormCancelButton>
                        <CommentFormSubmitButton type="submit">
                            Comment
                        </CommentFormSubmitButton>
                    </div>
                </CommentFormWrapper>
            </CommentFormPaper>

            {comments.map((comment) => (
                <CommentListItem key={comment.id}>
                    <div>
                        <CommentListItemAvatar>
                            <AccountCircle size="30" />
                        </CommentListItemAvatar>
                        <CommentListItemUser>
                            <strong>{comment.username + " says..."}</strong>
                            <span>
                                {moment(comment.dateCreated.toDate()).format(
                                    "HH:mm - Do MMM YYYY"
                                )}
                            </span>
                        </CommentListItemUser>
                    </div>
                    <div>{comment.text}</div>
                </CommentListItem>
            ))}
        </ContentDiv>
    )
}

export default Comments
