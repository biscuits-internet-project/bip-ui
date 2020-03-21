import React, { useState } from 'react';
import { ITrack } from './Tracklist';
import { Link as RouterLink } from 'react-router-dom'
import { Popover, Typography, Link, makeStyles, Theme, createStyles, ClickAwayListener } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Paragraph from '../shared/Paragraph';

interface Props {
    track: ITrack
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: 20,
            width: 450,
            backgroundColor: "#333333",
            //color: "#e6b800"
        },
        popover: {
        },
        jamchartContainer: {
            backgroundColor: "#333333", //purple[700],
            padding: 4,
        }
    }),
);

const TrackSongLink: React.FC<Props> = ({ track }) => {
    const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles();

    const handlePopoverOpen = (event, trackSlug) => {
        setAnchorEl(event.currentTarget)
        setOpenedPopoverId(trackSlug)
    }

    const handleClickAway = () => {
        setOpenedPopoverId(null)
        setAnchorEl(null)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
        setOpenedPopoverId(null)
    };

    return (
        <span className={track.note ? classes.jamchartContainer : ""}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Link
                    component={RouterLink}
                    to={!track.note && `/songs/${track.song_slug}`}
                    className={track.note ? "jamchart" : ""}
                    onClick={track.note ? (e) => handlePopoverOpen(e, track.slug) : undefined}
                >
                    {track.song_title}
                </Link>
            </ClickAwayListener>

            {track.note &&
                <Popover
                    id={track.slug}
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={openedPopoverId === track.slug}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                >
                    <Paragraph>
                        {track.note}
                    </Paragraph>
                    <Typography>
                        <Link
                            component={RouterLink}
                            to={`/songs/${track.song_slug}`}
                        >
                            View {track.song_title} details
                        </Link>
                    </Typography>
                </Popover>
            }
        </span>

    );
}

export default TrackSongLink
