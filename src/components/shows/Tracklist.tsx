import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Popover, Typography, Link, makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

export interface ITracklist {
	tracks: ITrack[]
}

export interface ITrack {
	id: string
	slug: string
	note: "",
	all_timer: false,
	song_title: string
	song_slug: string
	song_id: string
	segue: string
	position: number
	set: string
	annotations: string[]
	annotations_with_newlines: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		annotations: {
			fontStyle: "italic",
			marginTop: 8
		},
		set: {
			marginTop: 8
		},
		paper: {
			padding: 20,
			width: 400,
		  },
		  popover: {
			pointerEvents: 'none',
		  },
	}),
);

const Tracklist: React.FC<ITracklist> = ({ tracks }) => {
	const classes = useStyles();
	const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null)
	const [anchorEl, setAnchorEl] = useState(null)
	let annLookup = {}

	const handlePopoverOpen = (event, trackSlug) => {
		// this anchor el doesn't seem like it's getting set properly and
		// the popover is showing up in the upper left corner of the screen
		// instead of at the Link element from this event
		setAnchorEl(event.currentTarget)
		setOpenedPopoverId(trackSlug)
	  }

	const handlePopoverClose = () => {
		console.log(anchorEl)
		setAnchorEl(null)
		setOpenedPopoverId(null)
	};

	const orderTracks = (tracks) => {
		let sets = {};
		tracks.forEach(track => {
			if (!sets[track.set]) { sets[track.set] = []; }
			sets[track.set].push(track);

			track.annotations.forEach(ann => {
				if (!annLookup.hasOwnProperty(ann)) {
					annLookup[ann] = Object.keys(annLookup).length + 1
				}
			})
		});
		return sets;
	}
	let sets = orderTracks(tracks)

	return (
		<div>
			{Object.keys(sets).map((key, i) => {
				return (
					<Typography key={uuidv4()} className={classes.set}>
						<span style={{ paddingRight: 6 }}>{key} </span>
						{sets[key].map((track: ITrack, index: number) => {
							return (
								<span key={uuidv4()}>
									<Link
										on
										component={RouterLink}
										to={`/songs/${track.song_slug}`}
										className={track.note ? "jamchart" : ""}
										onMouseEnter={track.note ? (e) => handlePopoverOpen(e, track.slug) : undefined}
										onMouseLeave={track.note ? handlePopoverClose : undefined}
										aria-owns={openedPopoverId === track.slug ? "foo" : undefined}
										aria-haspopup="true"
									>
										{track.song_title}
									</Link>

									<Popover
										id="foo"
										className={classes.popover}
										classes={{
											paper: classes.paper,
										}}
										open={openedPopoverId === track.slug}
										anchorEl={anchorEl}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										  }}
										  transformOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										  }}
										onClose={handlePopoverClose}
										disableRestoreFocus
									>
										<Typography>{track.note}</Typography>
									</Popover>
									{track.annotations.map((a, i) => {
										return <sup key={i}> {annLookup[a]}</sup>
									})}
									{track.segue &&
										<span style={{ paddingRight: 4, paddingLeft: 4 }}> {track.segue} </span>
									}
									{track.segue === "" && sets[key].length > index + 1 &&
										<span style={{ paddingRight: 8 }}>, </span>
									}
								</span>
							)
						})}

					</Typography>
				)
			})}

			{annLookup && Object.keys(annLookup).map(function (key) {
				return (
					<Box key={key} className={classes.annotations}>
						<strong>{annLookup[key]}</strong> {key}
					</Box>
				)
			})}
		</div>
	)
}

export default Tracklist