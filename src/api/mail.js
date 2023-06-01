// import PropTypes from "prop-types";

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("" + process.env.SENDGRID_API_KEY)

//export const sendMail = ({ mailTo, mailFrom, name, subject, message }) => {
export default function handler(req, res) {

    const msg = `<!DOCTYPE html>
    <div style="border: 1px solid #e5e5e5; padding: 15px 20px; max-width: 600px; margin: auto;">
    <p>Hello Allsect,<br><br>You got a new message from ${req.body.name}:</p>
    <p style="padding: 12px; border-left: 6px solid #eee; font-style: italic;">${req.body.message}</p>
    <p>Send a message back to ${req.body.mailFrom} to respond.</p>
    <p><br>Cheers,<br>The Allsect Team</p>
    </div>
    </html>
    `

    const data = {
        to: req.body.mailTo,
        from: req.body.mailFrom,
        subject: "You've got mail!",
        text: `Email => ${req.body.mailFrom}`,
        html: msg,
    }

    sgMail
        .send(data)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            res.status(200).json({ message: "Your message was sent successfully." });
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ message: `There was an error sending your message. ${error}` });
        })
}

/*
sendMail.propTypes = {
    mailTo: PropTypes.string.isRequired,
    mailFrom: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subject: PropTypes.string,
    message: PropTypes.string,
    // reach_via: PropTypes.oneOf(["phone", "email"])
}
*/