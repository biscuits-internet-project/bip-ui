import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, CardHeader, List } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
    },
});

const OperaMenuCard = ({title, children}) => {
    const classes = useStyles()
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