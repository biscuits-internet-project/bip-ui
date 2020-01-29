import React from 'react'
import Typography from '@material-ui/core/Typography';
import { FolderOutlined} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
//import { flexbox } from '@material-ui/system';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '4px'
    },
    icon: {
        margin: '0px 16px 0px 16px'
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});


const Panel = ({children, title,width = '100%'}) => {
    const classes = useStyles()
    return (
        <>
        <div className={classes.container}>
            <FolderOutlined color="secondary" className={classes.icon}/>
            <Typography variant='h6'>{title}</Typography>
        </div>
        <Card style={{width}}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
        </>
    )
}

export default Panel