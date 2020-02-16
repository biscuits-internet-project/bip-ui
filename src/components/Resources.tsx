import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";

const useStyles = makeStyles({
	root: {
	  minWidth: 275,
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 14,
	},
	pos: {
	  marginBottom: 12,
	},
  });


const Resources: React.FC = () => {
	const classes = useStyles();
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Resources</title>
			</Helmet>
			<h1>Resources</h1>
			Links to useful stuff like nugs.net, the db.com site, twitter handles, etc.

		</>
	)
}
export default Resources
