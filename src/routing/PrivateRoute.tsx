import React, { ReactNode } from 'react'
import {Route, Redirect, RouteComponentProps} from 'react-router-dom'

interface IPrivateRoute {
    component: ReactNode
    roles: string[]
    [x: string]: any
}

const PrivateRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={(props:RouteComponentProps<any>): React.ReactNode => {
        console.log(roles, 'roles')
        return roles.includes('admin') ? <Component {...props}/> : <Redirect to='/login'  />
    }}/>
)

export default PrivateRoute