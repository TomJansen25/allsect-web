import React, { useState } from "react";
import { TextField, Backdrop, CircularProgress, Snackbar, Alert, Container } from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
// import emailjs from "emailjs-com"
import styled from "styled-components";
import { MailSend } from "styled-icons/remix-fill"
// import { Error } from "styled-icons/material-twotone"
import SEO from "../components/layout/seo";
import {
    FormPaper,
    ContactFormWrapper,
    FormSubmitButton,
} from "../components/styled"

const BackdropWrapper = styled(Backdrop)`
    z-index: 25;
    color: white;
`

const Div = styled.div`
    min-width: 250px;
    width: 30vw;
    max-width: 600px;
    position: relative;
    margin-bottom: 10px;
`

const ContactForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const resetForm = () => {
        setName("")
        setEmail("")
        setMessage("")
    }

    const sendEmail = (e) => {
        e.preventDefault()
        setLoading(true)
        /*
        const templateParams = {
            name: name,
            email: email,
            message: message,
        }
        
        emailjs
            .send(
                "personal_mail",
                "info_allsect_mails",
                templateParams,
                "user_qg2kFBBpprPxwffTaPbFZ"
            )
            .then(
                (result) => {
                    setLoading(false)
                    setSnackbarSeverity("success")
                    setSnackbarMessage(
                        "Thanks for reaching out to us! We will be back with you soon."
                    )
                    setSnackbarOpen(true)
                    resetForm()
                },
                (error) => {
                    setLoading(false)
                    setSnackbarSeverity("error")
                    setSnackbarMessage(
                        "Unfortunately something went wrong, please try to send us a message again."
                    )
                    setSnackbarOpen(true)
                    resetForm()
                }
            )
        */
        setLoading(false)
        setSnackbarSeverity("error")
        setSnackbarMessage(
            "Unfortunately something went wrong, please try to send us a message again."
        )
        setSnackbarOpen(true)
        resetForm()
    }

    const closeBackdrop = () => {
        setLoading(false)
    }

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return
        }
        setSnackbarOpen(false)
    }

    return (
        <section>
            <Container maxWidth="sm">
                <FormPaper>
                    <Div>
                        <StaticImage
                            src="../images/contact-us.png"
                            alt="Contact us"
                            placeholder="blurred"
                            layout="fullWidth"
                        />
                    </Div>
                    <h3>Contact us!</h3>
                    <ContactFormWrapper noValidate onSubmit={sendEmail}>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            margin="dense"
                            value={name}
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            style={{ marginTop: "0px" }}
                        />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            margin="dense"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                        <TextField
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            margin="dense"
                            required
                            fullWidth
                            id="message"
                            label="Message"
                            name="message"
                            multiline
                            rows="1"
                            rowsMax="10"
                            placeholder="Type your message here..."
                        />
                        <FormSubmitButton
                            type="submit"
                            value="Send"
                            fullWidth
                            variant="contained"
                        >
                            <MailSend size={20} style={{ marginRight: "10px" }} />
                            Send message
                        </FormSubmitButton>
                    </ContactFormWrapper>
                </FormPaper>
            </Container>
            <BackdropWrapper open={loading} onClick={closeBackdrop}>
                <CircularProgress color="inherit" />
            </BackdropWrapper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert onClose={closeSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default ContactForm

export const Head = () => (
    <SEO
        title="Contact"
        description="Looking for information or do you have something interesting for us? Contact us and let us know."
    />
)