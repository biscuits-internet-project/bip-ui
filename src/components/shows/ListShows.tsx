import React, { memo, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Setlist from './Setlist'
import { IShow } from './Show';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link, Box, Button } from '@material-ui/core';
import Moment from 'react-moment';
import { AppContext } from '../../context/AppProvider';
import SawItSwitch from './SawItSwitch';
import ShowRating from './ShowRating';
import FavoriteSwitch from './FavoriteSwitch';

const ListShows = ({ shows }) => {
	const { state } = useContext(AppContext)
    const { currentUser } = state
	const [viewSetlists, setViewSetlists] = useState(true)
    const [toggleViewText, setToggleViewText] = useState("View Compact List")

	const toggleView = () => {
        if (viewSetlists) {
            setViewSetlists(false)
            setToggleViewText("View Setlists")
        } else {
            setViewSetlists(true)
            setToggleViewText("View Compact List")
        }
    }

    return (
        <>
			<Box style={{marginTop: 10, marginBottom: 10, textAlign: "right"}}>
				<Button onClick={() => toggleView()}>{toggleViewText}</Button>
			</Box>

            {viewSetlists ? (
                <>
                    {shows.map((show: IShow) => {
                        return (
                            <Setlist key={show.id} show={show} />
                        )
                    })}
                </>
            ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Venue</TableCell>
                                    <TableCell>Relisten</TableCell>
                                    {currentUser &&
                                        <>
                                            <TableCell>Saw it

                                            </TableCell>
                                            <TableCell>Rating</TableCell>
                                            <TableCell>Favorite</TableCell>
                                        </>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shows.map((show: IShow) => (
                                    <TableRow key={show.slug}>
                                        <TableCell>
                                            <Link component={RouterLink} to={`/shows/${show.slug}`} >
                                                <Moment format="M/DD/YYYY">
                                                    {show.date}
                                                </Moment>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link component={RouterLink} to={`/venues/${show.venue.slug}`}>
                                                {show.venue.name}<br />
                                                {show.venue.city}
                                                <span>, </span>
                                                {show.venue.state}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {show.relisten_url &&
                                                <Link href={show.relisten_url} target="blank">
                                                    <img src="/relisten.png" alt="relisten" />
                                                </Link>
                                            }
                                        </TableCell>
                                        {currentUser &&
                                            <>
                                                <TableCell>
                                                    <SawItSwitch showId={show.id} currentUser={currentUser} />
                                                </TableCell>
                                                <TableCell>
                                                    <ShowRating showId={show.id} currentUser={currentUser} />
                                                </TableCell>
                                                <TableCell>
                                                   <FavoriteSwitch showId={show.id} currentUser={currentUser} />
                                                </TableCell>
                                            </>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </>
    )
}

export default memo(ListShows, (prev, next) => prev.shows.length === next.shows.length)