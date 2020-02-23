import React from 'react';
import { Helmet } from "react-helmet";
import { Grid } from '@material-ui/core';
import ResourceCard from './shared/ResourceCard';
import PageHeading from './shared/PageHeading';

const Resources: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Resources</title>
			</Helmet>
			<PageHeading text="Resources"/>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Band History"
					  content="blurb here"
					  image="/band.jpg"
					  url="/resources/history"
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Gear"
					  content="blurb here"
					  image="/gear.jpg"
					  url="/resources/gear"
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Music"
					  content="blurb here"
					  image="/music.jpg"
					  url="/resources/music"
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="Side Projects"
					  content="blurb here"
					  image="/electron.jpg"
					  url="/resources/side-projects"
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="The Hot Air Balloon"
					  content="blurb here"
					  image="/hot-air-balloon.jpg"
					  url="/resources/hot-air-balloon"
					></ResourceCard>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<ResourceCard
					  title="The Chemical Warfare Brigade"
					  content="blurb here"
					  image="/cwb.jpg"
					  url="/resources/chemical-warfare-brigade"
					></ResourceCard>
				</Grid>
			</Grid>

		</>
	)
}
export default Resources
