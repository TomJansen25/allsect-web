import firebaseConfig from "./config"
import { firebase, initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions } from 'firebase/functions';

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
        this.functions = getFunctions(this.app)
        // this.storage = app.storage()
    }
    /*
    async register({ username, email, password }) {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                // const user = userCredential.user;
                // this.db.collection("users").doc(username).set({userId: newUser.user.uid})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    async login({ email, password }) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    async logout() {
        await this.auth.signOut()
    }
    */

    getUserAccount({ userId, onSnapshot }) {
        return this.db
            .collection("users")
            .where("userId", "==", userId)
            .limit(1)
            .onSnapshot(onSnapshot)
    }

    subscribeToComments({ postType, postId }) {
        let queryField = ""

        if (postType === "blogPost") {
            queryField = "blogPostId"
        } else if (postType === "recipe") {
            queryField = "recipeId"
        }

        const q = query(
            collection(this.db, "comments"),
            where(queryField, "==", "entovegan-pumpkin-soup"),
            orderBy("dateCreated", "desc")
        )

        /*
        const snapshotComments = []
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, doc.data())
                snapshotComments.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
        })
        */
        // unsubscribe, snapshotComments
        return onSnapshot(q) 

        /*
        return this.db
            .collection("comments")
            .where(queryField, "==", postId)
            .orderBy("dateCreated", "desc")
            .onSnapshot(onSnapshot)
        */
    }

    async postComment({ username, text, postType, postId }) {

        // console.log({ username, text, postType, postId });
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

        const newCommentRef = await addDoc(collection(this.db, "comments"), newComment);
        // console.log("Document written with ID: ", newCommentRef.id);
        /*
        const postCommentCallable = this.functions.httpsCallable("postComment")
        return postCommentCallable({
            username,
            text,
            postType,
            postId,
        })
        */
    }
}

const firebaseApp = new Firebase();
export default firebaseApp;
