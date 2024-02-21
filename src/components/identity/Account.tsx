import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../shared/PageHeading'
import { AppContext } from '../../context/AppProvider';
import UserForm from '../users/UserForm';
import { IUser } from '../users/Users';

const Account: React.FC = () => {
  const { state } = useContext(AppContext)
  const { currentUser, first_name, last_name, email, username } = state
  const [user, setUser] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    if (currentUser) {
      const u = {
        id: currentUser.id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        username: username,
        token: currentUser.token,
        roles: currentUser.roles
      }
      setUser(u)
    }
  }, [currentUser, email, first_name, last_name, username])

  return (
    <>
      <PageHeading text="Your Account" />
      {currentUser &&
        <UserForm user={user} handleClose={() => { }} />
      }
    </>
  );
}

export default Account