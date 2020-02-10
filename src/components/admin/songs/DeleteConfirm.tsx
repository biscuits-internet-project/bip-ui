import React from 'react'
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {ISong} from '../../Songs'

export interface IDeleteConfirm {
	id: string
	songs: ISong[]
    handleClose: () => void
    handleDelete: () => void
    deleteOpen: boolean
}

const DeleteConfirm:React.FC<IDeleteConfirm> = ({deleteOpen, handleClose, songs, id, handleDelete}) => {
    const song: ISong | undefined = songs.find(song => song.slug === id)
    return (
        <Dialog
            fullWidth
            open={deleteOpen}
            onClose={handleClose}
        >
            <DialogTitle style={{padding: '8px 24px'}}>Delete Song?</DialogTitle>
            <DialogContent style={{marginBottom: '16px'}}>
                <>
                    {song && (
                        <>
                            <Typography>This will delete:</Typography>
                            <div style={{display: 'flex', margin: '8px 0px', alignItems: 'center'}}>
                                <Typography color="secondary" variant="h6">{song.title}</Typography>
                                <span style={{margin: '0px 8px'}}>by</span>
                                <Typography color="secondary" variant="h6">{song.author_name}</Typography>
                            </div>
                        </>
                    )}
                    <Typography>Are you sure you want to do this?</Typography>
                </>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleDelete}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirm