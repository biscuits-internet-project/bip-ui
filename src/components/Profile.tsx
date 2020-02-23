import React, { useState } from 'react'
import PageHeading from './shared/PageHeading'

interface IProfile {
    email: string
    username: string
    first_name: string
    last_name: string
}

const initialValues: IProfile = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
}

const Profile: React.FC = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    return (
          <PageHeading text="Your Profile"/>
      );
}

export default Profile