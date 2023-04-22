import React, {useState, useContext} from 'react'
import { Input, Button, Stack, InputGroup, InputRightElement, Text, Center, Heading, Box, AbsoluteCenter } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {Auth} from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    const history = useHistory()

    const {curr_user, setCurr_user} = useContext(Auth)

    const handleLogin = () => {
        const user = {email, password}
        axios.post("/api/login", user)
        .then(res => {
            toast.success(res.data.message)
            window.localStorage.setItem('Socially_Current_User', JSON.stringify(res.data.user))
            setCurr_user(res.data.user)
            history.push("/")
        })
    }

  return (
    <Box position='relative' h='100vh'>
    <AbsoluteCenter p='4' axis='both'>
    <Stack>
        <Input value={email} placeholder='Enter your mail' w='350px' size='lg' onChange={e => setEmail(e.target.value)}/>
        <InputGroup size='lg' mt='20px'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
        <Button colorScheme='whatsapp' size='lg' mt='20px' onClick={handleLogin}>Login </Button>
        <Center><Text as='b'>Dont't have an account? <Text as='u' cursor='pointer' onClick={() => history.push('/')}>Register</Text></Text></Center>
    </Stack>
    </AbsoluteCenter>
    </Box>
  )
}

export default LoginPage