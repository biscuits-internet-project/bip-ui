import React, { useState } from 'react';
import { ITrack } from './Tracklist';
import { Link as RouterLink } from 'react-router-dom'
import { Popover, Typography, Link, makeStyles, Theme, createStyles } from '@material-ui/core';

interface Props {
    track: ITrack
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: 20,
            width: 400,
        },
        popover: {
            pointerEvents: 'none',
        },
        jamchartContainer: {
            backgroundColor: "#333333", //purple[700],
            padding: 4,
        }
    }),
);

const JamChartHoverLink: React.FC<Props> = ({ track }) => {
    const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles();

    const handlePopoverOpen = (event, trackSlug) => {
        setAnchorEl(event.currentTarget)
        setOpenedPopoverId(trackSlug)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
        setOpenedPopoverId(null)
    };

    return (
        <span className={track.note ? classes.jamchartContainer : ""}>
            <Link
                on
                component={RouterLink}
                to={`/songs/${track.song_slug}`}
                className={track.note ? "jamchart" : ""}
                onMouseEnter={track.note ? (e) => handlePopoverOpen(e, track.slug) : undefined}
                onMouseLeave={track.note ? handlePopoverClose : undefined}
                aria-owns={openedPopoverId === track.slug ? track.slug : undefined}
                aria-haspopup="true"
            >
                {track.song_title}
            </Link>

            <Popover
                id={track.slug}
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
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{track.note}</Typography>
            </Popover>
        </span>

    );
}

export default JamChartHoverLink
