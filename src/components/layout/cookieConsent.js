import React from "react"
import CookieConsent from "react-cookie-consent"
import { brandColors } from "../../styles/brandColors"
import styled from "styled-components"

const CookieConsentWrapper = styled.div`
    #rcc-confirm-button {
        &:hover {
            background: ${brandColors.darkgreen} !important;
        }
    }

    #rcc-decline-button {
        &:hover {
            background: red !important;
            color: white !important;
        }
    }
`

const ButtonStyle = {
    textTransform: "uppercase",
    fontFamily: "Roboto, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    borderRadius: "4px",
    lineHeight: "1.75",
    padding: "6px 14px",
    margin: "12px 15px",
}

const CookieConsentBar = () => {
    return (
        <CookieConsentWrapper>
            <CookieConsent
                location="bottom"
                debug={false}
                enableDeclineButton={false}
                overlay
                flipButtons
                contentStyle={{
                    minHeight: "unset",
                }}
                buttonStyle={{
                    ...ButtonStyle,
                    background: brandColors.green,
                    color: "white",
                }}
                declineButtonStyle={{
                    ...ButtonStyle,
                    background: brandColors.grey,
                    color: brandColors.darkgrey,
                }}
                buttonText="Accept"
                setDeclineCookie={false}
                declineButtonText="Decline"
                cookieName="google-analytics-cookie"
                expires={100}
            >
                This site uses cookies to improve our user experience...
            </CookieConsent>
        </CookieConsentWrapper>
    )
}

export default CookieConsentBar
