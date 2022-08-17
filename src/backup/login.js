import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import Container from "@material-ui/core/Container"
import { AccountCircle } from "styled-icons/remix-fill"
import styled from "styled-components"

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

const LoginPage = () => {
    const [formValues, setFormValues] = useState({ email: "", password: "" })
    const { firebase, user } = useContext(FirebaseContext)
    const [errorMessage, setErrorMessage] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        firebase
            .login({
                email: formValues.email,
                password: formValues.password,
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    function handleInputChange(e) {
        e.persist()
        setErrorMessage("")
        setFormValues((currentValues) => ({
            ...currentValues,
            [e.target.name]: e.target.value,
        }))
    }

    const handleLogout = () => {
        firebase.logout().then(() => navigate("/"))
    }

    return (
        <section>
            <SEO title="Login" />
            <Container maxWidth="sm">
                {!!user && !!user.email && (
                    <div>Hello, {user.username || user.email}</div>
                )}
                <FormPaper>
                    <ContactFormAvatar size="40" />
                    <h3>Sign in</h3>
                    <UnstyledGatsbyLink to="/register">
                        No account yet? Sign up!
                    </UnstyledGatsbyLink>
                    <FormWrapper onSubmit={handleSubmit}>
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
                            name="password"
                            onChange={handleInputChange}
                            placeholder="password"
                            type="password"
                            variant="outlined"
                            id="password"
                            label="Password"
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
                            Login
                        </FormSubmitButton>
                    </FormWrapper>
                    <FormSubmitButton
                        type="submit"
                        value="logout"
                        onClick={handleLogout}
                        fullWidth
                        variant="contained"
                    >
                        Logout
                    </FormSubmitButton>
                </FormPaper>
            </Container>
        </section>
    )
}

export default LoginPage
