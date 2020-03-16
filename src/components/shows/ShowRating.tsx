import React, { useState, useEffect, useCallback, useContext } from 'react';
import { IUser } from '../users/Users';
import axios from 'axios'
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
    const [rating, setRating] = useState(0)
    const { state } = useContext(AppContext);
    const { ratings } = state

    const handleRatingChange = (event, value) => {
        postRating(value)
    };

    const postRating = useCallback(async (value) => {
        console.log(value)
        console.log(showId)
        if (value === null) {
            return
        }
        const data = { value: value }
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/shows/${showId}/rate`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": currentUser?.token
            }
        });
        setRating(value)

        // need to update the ratings in state from here

    }, [showId, currentUser])

    useEffect(() => {
        console.log(ratings)
        console.log(showId)
        const rating = ratings.find(r => r.show_id === showId)
        console.log(rating)
        if (rating) {
            setRating(rating.value)
        }
    }, [showId, ratings])

    return (
        <StyledRating
            name={showId}
            icon={<TdbIcon />}
            value={rating}
            onChange={(event, newValue) => {
                handleRatingChange(event, newValue);
            }}
        />

    );
}

export default RatingSwitch
