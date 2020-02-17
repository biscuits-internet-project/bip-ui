import React, { useState } from 'react'

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
          <h1>Your Profile</h1>
      );
}

export default Profile