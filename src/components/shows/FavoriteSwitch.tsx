import React, { useState, useEffect, useCallback, useContext } from 'react';
import { IUser } from '../users/Users';
import { Switch } from '@material-ui/core';
import axios from 'axios'
import { AppContext } from '../../context/AppProvider';

interface Props {
    showId: string
    currentUser: IUser
}

const FavoriteSwitch: React.FC<Props> = ({ showId, currentUser }) => {
    const {state} = useContext(AppContext);
    const {asyncActions} = useContext(AppContext)

    const handleFavoriteChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        asyncActions.postFavorite(currentUser.token, showId, event.target.checked)
    };

    return (
        <Switch
            name="favorite"
            checked={state.favorites.includes(showId)}
            onChange={handleFavoriteChange()}
            color="secondary"
            value={showId}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    );
}

export default FavoriteSwitch
