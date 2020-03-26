import React, { useEffect, useState } from 'react';
import PageHeading from '../shared/PageHeading';
import axios, { AxiosResponse } from 'axios'
import { Card, Typography, CardContent, Grid } from '@material-ui/core';
import Paragraph from '../shared/Paragraph';
import HtmlHead from '../shared/HtmlHead';

interface ISideProject {
	notes?: string,
	dates: string,
	name: string,
	members: string[]
}

const SideProjects: React.FC = () => {
	const [sideProjects, setSideProjects] = useState<ISideProject[]>([])

	useEffect(() => {
		const fetchSideProjects = async () => {
			const data:AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/side_projects`)
			setSideProjects(data.data)
		}
		fetchSideProjects()
	}, [])
	return (
		<>
			<HtmlHead
			  title="Side Projects"
			  description="From Barber and the Laid Back Band to Younger Brother Live and everything in between. And we mean EVERYTHING."
			  image_url="https://discobiscuits.net/electron.jpg"
			/>
			<PageHeading text="Side Projects"/>
			<Grid container spacing={3}  alignItems="stretch">
				{sideProjects.map((sp) => {
					return (
						<Grid item xs={12} sm={6} md={4} style={{display: 'flex', width: 350}}>
							<Card style={{display: 'flex', width: "100%"}}>
								<CardContent>
									<Typography variant="h3">{sp.name}</Typography>
									<Paragraph>
										{sp.dates.split(",").map((item) => {
											return (
												<span key={item} style={{paddingRight: 6}}>{item}</span>
											)
										})}
									</Paragraph>
									{sp.members.map((mem) => {
											return <div key={mem}> {mem}</div>
									})}
								</CardContent>
							</Card>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
export default SideProjects
