import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core';
import ResourceCard from './shared/ResourceCard';

const useStyles = makeStyles({
	root: {
	  maxWidth: 450,
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

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Band History"
					  content="blurb here"
					  image="/band.jpg"
					  url=""
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Gear"
					  content="blurb here"
					  image="/gear.jpg"
					  url=""
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Music"
					  content="blurb here"
					  image="/music.jpg"
					  url=""
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Side Projects"
					  content="blurb here"
					  image="/electron.jpg"
					  url=""
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="The Hot Air Balloon"
					  content="blurb here"
					  image="/hot-air-balloon.jpg"
					  url=""
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="The Chemical Warfare Brigade"
					  content="blurb here"
					  image="/cwb.jpg"
					  url=""
					></ResourceCard>
				</Grid>
			</Grid>




		</>
	)
}
export default Resources
