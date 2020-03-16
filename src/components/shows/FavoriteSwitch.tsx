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
    const [favorite, setFavorite] = useState(false)
    const {state} = useContext(AppContext);
    const {favorites} = state

    const handleFavoriteChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        postFavorite(event.target.checked)
    };

    const postFavorite = useCallback(async (value) => {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/shows/${showId}/${value ? "favorite" : "unfavorite"}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": currentUser?.token
            }
        });
        setFavorite(value)

        // need to update the favorites in state from here

    }, [showId, currentUser])

    useEffect(() => {
        setFavorite(favorites.includes(showId))
    }, [showId, favorites])

    return (
        <Switch
            name="favorite"
            checked={favorite}
            onChange={handleFavoriteChange()}
            color="secondary"
            value={showId}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    );
}

export default FavoriteSwitch
