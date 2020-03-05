import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import { IShow } from './Show';
import ListShows  from './ListShows'
import { Helmet } from "react-helmet"
import { LinearProgress, Button } from '@material-ui/core';
import PageHeading from './shared/PageHeading';
import ShowSearch from './shared/ShowSearch';

const Shows: React.FC = () => {
	const params = useParams();
	const [loading, setLoading] = useState(false)
	const currentYear = new Date().getFullYear()
	const [selectedYear, setSelectedYear] = useState(params.year || currentYear)
	const [shows, setShows] = useState<IShow[]>([])
	const years = Array(currentYear - 1995 + 1).fill(0).map((_, idx) => 1995 + idx)
	const history = useHistory()

	const changeYear = (year) => {
		setShows([])
		history.push(`/shows/year/${year}`)
		setSelectedYear(year)
	}

	useEffect(() => {
		setLoading(true)
		const fetchSetlists = async () => {
			const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?year=${selectedYear}`)
			setShows(data.data)
			setLoading(false)
		}
		fetchSetlists()
	}, [selectedYear])
	return (
		<>
			<Helmet>
				<title>Biscuits Internet Project - Shows</title>
			</Helmet>
			<PageHeading text="Shows" />
			<ShowSearch setShows={setShows} setLoading={setLoading}></ShowSearch>

			{years.map((year) => {
				return (
					<Button key={year} onClick={() => changeYear(year)} style={{display: "inline", marginRight: 6}}>
						{year}
					</Button>
				)
			})}
			<div style={{ height: 20 }}></div>

			{loading &&
				<>
					<div style={{ height: 30 }}></div>
					<LinearProgress />
					<div style={{ height: 30 }}></div>
				</>
			}
			<ListShows shows ={shows}/>
		</>

	)
}

export default Shows;