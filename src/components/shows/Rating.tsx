import React, { useContext } from 'react'
import { IUser } from '../users/Users'
import { AppContext } from '../../context/AppProvider'
import { withStyles } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import { Rating as MuiRating } from '@material-ui/lab'
import TdbIcon from '../shared/TdbIcon'

interface Props {
  rateable_id: string
  rateable_type: string
  currentUser: IUser
}

const StyledRating = withStyles({
  iconFilled: {
    color: purple[300],
  },
  iconHover: {
    color: purple[500],
  },
})(MuiRating)

const Rating: React.FC<Props> = ({
  rateable_type,
  rateable_id,
  currentUser,
}) => {
  const { state, asyncActions } = useContext(AppContext)

  const handleRatingChange = (event, value) => {
    if (value === null) {
      return
    }
    asyncActions.postRating(
      currentUser.token,
      rateable_type,
      rateable_id,
      value,
    )
  }

  return (
    <StyledRating
      name={rateable_id}
      icon={<TdbIcon />}
      precision={0.5}
      value={
        state.ratings.find(
          (r) =>
            r.rateable_type === rateable_type && r.rateable_id === rateable_id,
        )?.value || 0
      }
      onChange={(event, newValue) => {
        handleRatingChange(event, newValue)
      }}
    />
  )
}

export default Rating
