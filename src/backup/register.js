import React, { useState, useContext } from "react"
import Container from "@material-ui/core/Container"

import { FirebaseContext } from "../components/firebase"
import SEO from "../components/layout/seo"
import {
    FormPaper,
    FormWrapper,
    AccountFormTextField,
    AccountFormAvatar,
    UnstyledGatsbyLink,
    FormSubmitButton,
    ErrorMessage,
} from "../components/styled"

const RegisterPage = () => {
    const { firebase } = useContext(FirebaseContext)

    const [errorMessage, setErrorMessage] = useState("")
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    })

    function handleSubmit(e) {
        e.preventDefault()

        if (formValues.password === formValues.confirmPassword) {
            firebase
                .register({
                    username: formValues.username,
                    email: formValues.email,
                    password: formValues.password,
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                })
        } else {
            setErrorMessage("Passwords did not match.")
        }
    }

    function handleInputChange(e) {
        e.persist()
        setErrorMessage("")
        setFormValues((currentValues) => ({
            ...currentValues,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <section>
            <SEO title="Login" />
            <Container maxWidth="sm">
                <FormPaper>
                    <AccountFormAvatar size="40" />
                    <h3>Register</h3>
                    <UnstyledGatsbyLink to="/login">
                        Already have an account? Sign in!
                    </UnstyledGatsbyLink>
                    <FormWrapper onSubmit={handleSubmit}>
                        <AccountFormTextField
                            required
                            value={formValues.username}
                            name="username"
                            id="username"
                            onChange={handleInputChange}
                            placeholder="Username"
                            type="text"
                            variant="outlined"
                            label="Username"
                        />
                        <AccountFormTextField
                            required
                            value={formValues.email}
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                            placeholder="email"
                            type="email"
                            variant="outlined"
                            label="Email Address"
                        />
                        <AccountFormTextField
                            required
                            value={formValues.password}
                            minLength={6}
                            name="password"
                            onChange={handleInputChange}
                            placeholder="Password"
                            type="password"
                            variant="outlined"
                            id="password"
                            label="Password"
                        />
                        <AccountFormTextField
                            required
                            value={formValues.confirmPassword}
                            minLength={6}
                            name="confirmPassword"
                            onChange={handleInputChange}
                            placeholder="Confirm password"
                            type="password"
                            variant="outlined"
                            id="confirmPassword"
                            label="Confirm password"
                        />
                        {!!errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        )}
                        <FormSubmitButton
                            type="submit"
                            value="login"
                            fullWidth
                            variant="contained"
                        >
                            Create an account
                        </FormSubmitButton>
                    </FormWrapper>
                </FormPaper>
            </Container>
        </section>
    )
}

export default RegisterPage
