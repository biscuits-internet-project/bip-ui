import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Paragraph from './Paragraph';

export interface IDeleteConfirm {
    handleClose: () => void
    handleDelete: () => void
    deleteOpen: boolean
}

const DeleteConfirm:React.FC<IDeleteConfirm> = ({children, deleteOpen, handleClose, handleDelete}) => {
    return (
        <Dialog
            fullWidth
            open={deleteOpen}
            onClose={handleClose}
        >
            <DialogTitle style={{padding: '8px 24px'}}>Delete Venue?</DialogTitle>
            <DialogContent style={{marginBottom: '16px'}}>
                <>
                    <Paragraph>This will delete:</Paragraph>
                    <div style={{display: 'flex', margin: '8px 0px', alignItems: 'center'}}>
                        {children}
                    </div>
                    <Paragraph>Are you sure you want to do this?</Paragraph>
                </>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleDelete}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirm