import React, { ReactNode, useContext } from 'react'
import {Route, Redirect, RouteComponentProps} from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

interface IPrivateRoute {
    component: ReactNode
    adminOnly?: boolean
    [x: string]: any
}

const PrivateRoute = ({component: Component, adminOnly = false, ...rest}) => {
    const { state } = useContext(AppContext)
	const { currentUser } = state
    const isAdmin = currentUser?.roles.includes("admin")
    const permitted = (adminOnly && isAdmin) || (!adminOnly && currentUser)

    return (
        <Route {...rest} render={(props:RouteComponentProps<any>): React.ReactNode => {
            return permitted ? <Component {...props}/> : <Redirect to='/login'  />
        }}/>
    )
}

export default PrivateRoute