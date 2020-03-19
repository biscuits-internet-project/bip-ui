import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  paragraph: {
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 1.8,
  },
})

const Paragraph = (props) => {
  const classes = useStyles()
  return (
    <Typography {...props} className={classes.paragraph}>
      {props.children}
    </Typography>
  )
}

export default Paragraph
