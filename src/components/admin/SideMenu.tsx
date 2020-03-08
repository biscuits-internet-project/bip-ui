import React, {ReactElement} from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { QueueMusic, Home, AccountCircle } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      top: '80px'
    }
  })
);

interface sideMenuItem {
	name: string | undefined,
	label: string,
	icon: ReactElement
}
const itemList: sideMenuItem[] = [
	{
		name: 'users',
		label: 'Users',
		icon: <AccountCircle/>
	}
]

const SideMenu = () => {
		const classes = useStyles();
		const match = useRouteMatch();
		const history = useHistory()
		const {adminPage} = match.params
		return (
				<Drawer
					classes={{
						paper: classes.drawerPaper
					}}
					variant="persistent"
					anchor="left"
					open={true}
				>
					<List component="nav" aria-label="main mailbox folders">
							{itemList.map((item: sideMenuItem)=> {
								return (
									<ListItem
										key={item.label}
										button
										selected={adminPage ? adminPage === item.name : !item.name}
										onClick={()=> history.push(`/admin/${item.name}`)}
									>
										<ListItemIcon>
											{item.icon}
										</ListItemIcon>
										<ListItemText primary={item.label} />
									</ListItem>
								)
							})}
					</List>
				</Drawer>
    )
}

export default SideMenu
