import React, { useState, useContext } from 'react'
import PageHeading from './shared/PageHeading'
import { AppContext } from '../context/AppProvider';
import UserForm from './users/UserForm';

const Profile: React.FC = () => {
    const { state } = useContext(AppContext)
	const { currentUser } = state

    return (
        <>
          <PageHeading text="Your Profile"/>
          {currentUser &&
            <UserForm user={currentUser} handleClose={() => {}} />
          }
        </>
      );
}

export default Profile