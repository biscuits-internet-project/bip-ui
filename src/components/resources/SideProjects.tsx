import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import PageHeading from '../shared/PageHeading';
import axios, { AxiosResponse } from 'axios'
import { Card, Typography, CardContent, Grid } from '@material-ui/core';

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
			<Helmet>
				<title>Biscuits Internet Project - Side Projects</title>
			</Helmet>
			<PageHeading text="Side Projects"/>
			<Grid container spacing={3}  alignItems="stretch">
				{sideProjects.map((sp) => {
					return (
						<Grid item xs={12} sm={6} md={4} style={{display: 'flex', width: 350}}>
							<Card style={{display: 'flex', width: "100%"}}>
								<CardContent>
									<Typography variant="h3">{sp.name}</Typography>
									<Typography>
										{sp.dates.split(",").map((item) => {
											return (
												<span key={item} style={{paddingRight: 6}}>{item}</span>
											)
										})}
									</Typography>
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
