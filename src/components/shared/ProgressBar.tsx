import React from 'react'
import { LinearProgress } from '@material-ui/core'

const ProgressBar = (props) => {
  return (
    <>
      <div style={{ height: 30 }}></div>
      <LinearProgress />
      <div style={{ height: 30 }}></div>
    </>
  )
}

export default ProgressBar
