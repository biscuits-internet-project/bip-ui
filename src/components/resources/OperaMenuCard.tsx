import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, List } from '@material-ui/core';

const OperaMenuCard = ({title, children}) => {
    return (
        <Card style={{height: "100%"}}>
            <CardHeader title={title}/>
            <CardContent>
                <List>
                    {children}
                </List>
            </CardContent>
        </Card>
    )
}

export default OperaMenuCard