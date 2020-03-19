import React, { useContext } from 'react';
import { IUser } from '../users/Users';
import { Switch } from '@material-ui/core';
import { AppContext } from '../../context/AppProvider';

interface Props {
    showId: string
    currentUser: IUser
}

const SawItSwitch: React.FC<Props> = ({ showId, currentUser }) => {
    const {state} = useContext(AppContext);
    const {asyncActions} = useContext(AppContext)

    const handleSawItChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        asyncActions.postAttendance(currentUser.token, showId, event.target.checked)
    };

    return (
        <Switch
            name="sawit"
            checked={state.attendances.includes(showId)}
            onChange={handleSawItChange()}
            color="secondary"
            value={showId}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    );
}

export default SawItSwitch
