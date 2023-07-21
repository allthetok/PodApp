import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel';
import DialogTitle from '@mui/material/DialogTitle'

const LogoutDialog = ({ handleUserLogout }) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // const handleCloseLogout = (e) => {
    //     e.preventDefault()
    //     handleUserLogout
    //     setOpen(false)
    // }

    return (
        <div>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        color="inherit"
                        onClick={handleClickOpen}
                        >
                        <LogoutIcon />
                        </IconButton>
            </Box>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            
                        >
                            <DialogTitle id='alert-dialog-title' sx={ {backgroundColor: '#0b1528', color: '#fff', paddingBottom: '0'}}>
                                {'Are you sure you want to log out?'}
                            </DialogTitle>
                            <DialogActions sx={ {backgroundColor: '#0b1528', justifyContent: 'center', paddingTop: '0' }}>
                                <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                color="error"
                                
                                sx={ {}}
                                onClick={handleClose}>
                                    <CancelIcon sx={ {fontSize: '2.5rem'}}/>
                                </IconButton>
                                <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                color="success"
                                autoFocus
                                onClick={handleUserLogout}>
                                    <DoneIcon sx={ {fontSize: '2.5rem'}}/>
                                </IconButton>
                            </DialogActions>
                        </Dialog>
                    {/* </Box> */}
        </div>
    )
}

export default LogoutDialog 