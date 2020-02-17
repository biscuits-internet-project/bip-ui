import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = () => {
    return (
        <>
            <div style={{height: 20}}></div>
            <ReCAPTCHA sitekey="6Lf1EtUUAAAAAACJOSf1LEVoA6REzhCv3XA2tpo8" theme="dark" />
            <div style={{height: 20}}></div>
        </>
    )
}

export default ReCaptcha