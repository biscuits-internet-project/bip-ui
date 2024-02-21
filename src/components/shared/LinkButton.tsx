import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Button } from '@material-ui/core'

const LinkButton = ({text, to }) => {
    return (
        <Link underline="none" component={RouterLink} to={to}>
            <Button>{text}</Button>
        </Link>
    )
}

export default LinkButton