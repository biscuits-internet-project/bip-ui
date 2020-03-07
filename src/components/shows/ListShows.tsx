import React, {memo} from 'react';
import Setlist from './Setlist'

const ListShows = ({shows}) => {
    return (
        <>
            {shows.map((show) => {
                return (
                    <Setlist key={show.id} show={show} />

                )
            })}
        </>
    )
}

export default memo(ListShows, (prev, next) => prev.shows.length === next.shows.length)