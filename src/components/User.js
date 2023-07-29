import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './User.css';

const User = ({ userId, handleUserLogout }) => {
    const [finalSearch, setFinalSearch] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [editUser, setEditUser] = useState(true)
    const [editEmail, setEditEmail] = useState(true)
    const [editPass, setEditPass] = useState(true)

    const textInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(textInput)
        setFinalSearch(textInput.current.value)
        setFormSubmitted(true)
    }



return (
    <div className='userContainer'>
        <Navbar handleSubmit={handleSubmit} textInput={textInput} handleUserLogout={handleUserLogout}/>
        <div>
            <div>
                <Container component='main' maxWidth='m' sx={{color: 'white', fontWeight: '400', fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0.00938em'}}>
                    <Box 
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: '#0b1528'
                        }}>
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <AccountBoxIcon/>
                            </Avatar>
                            <Typography component='h1' variant='h5'>
                                Update account details
                            </Typography>
                            <Box component='form' 
                            onSubmit={handleSubmit} 
                            sx={{ mt: 1 }}
                            noValidate>
                            <div className='textWrap'>
                                <TextField 
                                    margin='normal'
                                    id='user'
                                    label='Username'
                                    disabled={editUser}
                                    name='user'
                                    autoComplete='user'
                                    sx={{bgcolor: 'white', width: '75%'}}
                                    autoFocus/>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        sx={{ mr: 2 , color: 'white', paddingLeft: '25px', paddingTop: '25px'}}
                                        onClick={() => setEditUser(!editUser)}
                                    >
                                        <CreateIcon />
                                    </IconButton>
                            </div>
                            <div className='textWrap'>
                                <TextField 
                                    margin='normal'
                                    id='pass'
                                    label='Email'
                                    disabled={editEmail}
                                    name='pass'
                                    autoComplete='pass'
                                    sx={{bgcolor: 'white', width: '75%'}}
                                    autoFocus/>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        sx={{ mr: 2 , color: 'white', paddingLeft: '25px', paddingTop: '25px'}}
                                        onClick={() => setEditEmail(!editEmail)}
                                    >
                                        <CreateIcon />
                                    </IconButton>
                            </div>
                            <div className='textWrap'>
                                <TextField 
                                    margin='normal'
                                    id='pass'
                                    label='Password'
                                    disabled={editPass}
                                    name='pass'
                                    autoComplete='pass'
                                    sx={{bgcolor: 'white', width: '75%'}}
                                    autoFocus/>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        sx={{ mr: 2 , color: 'white', paddingLeft: '25px', paddingTop: '25px'}}
                                        onClick={() => setEditPass(!editPass)}
                                    >
                                        <CreateIcon />
                                    </IconButton>
                            </div>
                            <div className='textWrap'>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2, width: '75%'}}>
                                        Save Changes
                                </Button>
                            </div>
                                {/* <Grid container>
                                    <Grid item xs>
                                        <Link onClick={() => navigate('/forgot')} href="/forgot" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link onClick={() => navigate('/signup')} href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid> */}
                            </Box>
                    </Box>
                </Container>
            </div>
        </div>
    </div>
)
}

export default User