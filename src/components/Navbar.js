//import React, { useState, useRef } from 'react';
import React from 'react';
//import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreIcon from '@mui/icons-material/MoreVert';
import './SearchPod.css';
//import PodcastDetail from './PodcastDetail';

const Navbar = ({ handleSubmit, handleClick, textInput }) => {
    // const [finalSearch, setFinalSearch] = useState('')
    // const [formSubmitted, setFormSubmitted] = useState(false)

    // const textInput = useRef()
    // const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(textInput)
    //     setFinalSearch(textInput.current.value)
    //     setFormSubmitted(true)
    // }

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     navigate('/likes')
    // }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        PodFinder
                    </Typography>
                    <div className='searchWrap'>
                        <form className='searchBar' onSubmit={handleSubmit}>
                            <input type='text' ref={textInput} required placeholder='Search...' />
                                <button className='searchBtn'>
                                    <span>Search</span>
                                </button>
                        </form>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        color="inherit"
                        onClick={handleClick}
                        >
                        <FavoriteIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                        >
                        <MoreIcon />
                        </IconButton>
                    </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {/* {formSubmitted ?
                    // <PodcastDetail userId={userId} finalSearch={finalSearch} />
                    <TstDetail userId={userId} finalSearch={finalSearch} />
            : <></>
            } */}
        </div>
    );
}

export default Navbar