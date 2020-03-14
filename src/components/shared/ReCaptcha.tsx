import React from 'react'
import Reaptcha from 'reaptcha';

const ReCaptcha = ({callback}) => {
    return (
        <>
            <div style={{height: 20}}></div>
            <Reaptcha sitekey="6Lf1EtUUAAAAAACJOSf1LEVoA6REzhCv3XA2tpo8" theme="dark" onVerify={callback} />
            <div style={{height: 20}}></div>
        </>
    )
}

export default ReCaptcha