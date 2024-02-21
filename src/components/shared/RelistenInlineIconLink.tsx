import React from 'react'
import { Link } from '@material-ui/core'

const RelistenInlineIconLink = ({ url }) => {
  return (
    <span style={{ paddingLeft: 12, verticalAlign: 'middle' }}>
      <Link href={url} target="blank">
        <img src="/relisten.png" alt="relisten" />
      </Link>
    </span>
  )
}

export default RelistenInlineIconLink
