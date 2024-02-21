import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { List, Typography } from '@material-ui/core';

const OperaMenuCard = ({title, children}) => {
    return (
        <Card style={{height: "100%"}}>
            <CardContent>
                <Typography variant="h2">{title}</Typography>
                <List>
                    {children}
                </List>
            </CardContent>
        </Card>
    )
}

export default OperaMenuCard