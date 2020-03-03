import React, {memo} from 'react';
import Setlist from './Setlist'

const ListShows = ({setlists}) => {
    return (
        <>
            {setlists.map((setlist, id) => {
                return (
                    <Setlist key={id} date={setlist.date} slug={setlist.slug} venue={setlist.venue} tracks={setlist.tracks} notes={setlist.notes} />
                )
            })}
        </>
    )
}
export default memo(ListShows, (prev, next) => prev.setlists.length === next.setlists.length)