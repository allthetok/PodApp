/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Copyright = ( props ) => {
	return <Typography variant='body2' color='text.secondary' align='center' {...props}>
		{'Copyright © '}
		<Link color='inherit' href='https://github.com/allthetok'>
            Allen Tok
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
}

const defaultTheme = createTheme()

const Signup = ({ handleIdChange, userId }) => {
	//const [userId, setUserId] = useState(null)
	const [checked, setChecked] = useState(false)

	localStorage.removeItem('userid')

	const navigate = useNavigate()

	const getUserId = async (dataTarget) => {
		const user = dataTarget.get('user')
		const pass = dataTarget.get('password')
		const email = dataTarget.get('email')

		const userConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/user',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'struser': user,
				'strpass': pass,
				'stremail': email,
				'newUser': true,
			}
		}

		await axios(userConfig).then(response => {
			handleIdChange(response.data.lnguserid, checked)
		}).catch(err => {
			console.log(err)
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		getUserId(data)
		console.log(userId)
	}
	useEffect(() => {
		if (userId) {
			navigate('/home')
			//localStorage.setItem('userid', userId)
		}
	}, [userId])

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component='h1' variant='h5'>
                            Sign Up
					</Typography>
					<Box component='form'
						onSubmit={handleSubmit}
						noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email'
							name='email'
							autoComplete='email'
							autoFocus/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='user'
							label='Username'
							name='user'
							autoComplete='user'
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'/>
						<FormControlLabel
							control={<Checkbox onClick={() => setChecked(!checked)} value='remember' color='primary' />}
							label='Remember me'/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
                                    Sign Up
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	)
}

export { Signup }