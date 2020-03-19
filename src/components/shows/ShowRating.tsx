import React, { useContext } from 'react';
import { IUser } from '../users/Users';
import { AppContext } from '../../context/AppProvider';
import { withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import TdbIcon from '../shared/TdbIcon';

interface Props {
    showId: string
    currentUser: IUser
}

const StyledRating = withStyles({
    iconFilled: {
        color: purple[300],
    },
    iconHover: {
        color: purple[500],
    },
})(Rating);

const RatingSwitch: React.FC<Props> = ({ showId, currentUser }) => {
    const { state, asyncActions } = useContext(AppContext)

    const handleRatingChange = (event, value) => {
        if (value === null) {
            return
        }
        asyncActions.postRating(currentUser.token, showId, value)
    };

    return (
        <StyledRating
            name={showId}
            icon={<TdbIcon />}
            value={state.ratings.find(r => r.show_id === showId)?.value || 0}
            onChange={(event, newValue) => {
                handleRatingChange(event, newValue);
            }}
        />
    );
}

export default RatingSwitch
