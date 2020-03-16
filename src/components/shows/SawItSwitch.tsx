import React, { useState, useEffect, useCallback, useContext } from 'react';
import { IUser } from '../users/Users';
import { Switch } from '@material-ui/core';
import axios from 'axios'
import { AppContext } from '../../context/AppProvider';

interface Props {
    showId: string
    currentUser: IUser
}

const SawItSwitch: React.FC<Props> = ({ showId, currentUser }) => {
    const [sawIt, setSawIt] = useState(false)
    const {state} = useContext(AppContext);
    const {attendances} = state

    const handleSawItChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        postSawIt(event.target.checked)
    };

    const postSawIt = useCallback(async (value) => {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/shows/${showId}/${value ? "attend" : "unattend"}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": currentUser?.token
            }
        });
        setSawIt(value)

        // need to update the attendances in state from here

    }, [showId, currentUser])

    useEffect(() => {
        setSawIt(attendances.includes(showId))
    }, [showId, attendances])

    return (
        <Switch
            name="sawit"
            checked={sawIt}
            onChange={handleSawItChange()}
            color="secondary"
            value={showId}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    );
}

export default SawItSwitch
