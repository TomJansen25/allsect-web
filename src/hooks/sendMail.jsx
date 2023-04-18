import PropTypes from "prop-types";

export const sendMail = ({ mailTo, mailFrom }) => {
    console.log(mailTo, mailFrom)
}


sendMail.propTypes = {
    mailTo: PropTypes.string.isRequired,
    mailFrom: PropTypes.string.isRequired
}
