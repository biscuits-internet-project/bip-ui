import React, {useState, useEffect} from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'
import {ISetlist} from './Setlist';
import Setlist from './Setlist';

const Shows: React.FC = () => {

	const [loading, setLoading] = useState(false)
	const currentYear = new Date().getFullYear()
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [setlists, setSetlists] = useState<ISetlist[]>([])
	const params = useParams();
	const years = Array(currentYear - 1995 + 1).fill(0).map((_, idx) => 1995 + idx)
	const history = useHistory()	

	const changeYear = (e) => {
		setSelectedYear(e.target.value)
		history.push(`/shows?year=${e.target.value}`)
	}

	useEffect(()=> {
		setLoading(true)
		const fetchSetlists = async () => {
			const data:AxiosResponse = await axios.get(`https://stg-api.discobiscuits.net/api/shows?year=${selectedYear}`)
			setSetlists(data.data)
			setLoading(false)
		}
		fetchSetlists()
	},[])
	return (
		<>
			{loading && <h3>.....Loading</h3>}
			<select name="years" id="years" onChange={changeYear}>
				{years.map((year) => {
					return (
						<option value={year} selected={year == selectedYear}>{year}</option>
					)
				})}
			</select>

			<div className="setlists">
				<h2 className="setlists__title">Shows</h2>
				<div className="setlists__feed setlists__feed--latest">
					{setlists.map((setlist) => {
						return (
							<Setlist date={setlist.date} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
						)
					})}
				</div>
			</div>
		</>

	)
}

export default Shows;  