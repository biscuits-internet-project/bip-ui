import React, {ReactElement} from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { QueueMusic, LibraryMusic, Room, Home } from '@material-ui/icons';

interface sideMenuItem {
	name: string | undefined,
	label: string,
	icon: ReactElement
}
const itemList: sideMenuItem[] = [
	{
		name: undefined,
		label: 'Dashboard',
		icon: <Home/>
	},
	{
		name: 'shows',
		label: 'Shows',
		icon: <QueueMusic/>
	},
	{
		name: 'songs',
		label: 'Songs',
		icon: <LibraryMusic/>
	},
	{
		name: 'venues',
		label: 'Venues',
		icon: <Room/>
	},
]

const SideMenu = () => {
		const match = useRouteMatch();
		const history = useHistory()
		const {adminPage} = match.params
		console.log(adminPage)
		return (
				<Drawer
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
