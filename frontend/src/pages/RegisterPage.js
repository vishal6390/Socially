import React, {useState} from 'react'
import { Input, Button, Stack, InputGroup, InputRightElement, Text, Center, AbsoluteCenter, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'
import { toast } from 'react-toastify';

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [age, setAge] = useState()
    const [dob, setDob] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleRegister = () => {

        if(username && email && password && (password === reEnterPassword) && age && dob && profilePic){
            setLoading(true)
            const data = new FormData()
            data.append("file", profilePic)
            data.append("upload_preset", 'socially')
            data.append("cloud_name", 'dbct68twk')

            fetch('https://api.cloudinary.com/v1_1/dbct68twk/image/upload', {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then((data) => {
                const obj = {
                    username, email, password, reEnterPassword, age, dob, profilePic: data.url
                }
                axios.post("http://localhost:9002/api/register", obj)
                .then((res) => {
                    toast.success(res.data.message)
                    setLoading(false)
                    history.push("/login")
                }).catch(err => {
                    toast.error("Error Occurred")
                    setLoading(false)
                })
                
            })
        }else{
            
            toast.error("Invalid input")
        }
    }

  return (
    <>
    <Box position='relative' h='100vh'>
    <AbsoluteCenter p='4' axis='both'>
    <Stack>
        <Input value={username} placeholder='Enter your username' w='350px' size='lg' onChange={e => setUsername(e.target.value)}/>
        <Input value={email} placeholder='Enter your e-mail' w='350px' size='lg' onChange={e => setEmail(e.target.value)}/>
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
        <InputGroup size='lg' mt='20px'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Re-Enter password'
                value={reEnterPassword}
                onChange={e => setReEnterPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
        <Input type={Number} value={age} onChange={e => setAge(e.target.value)} placeholder='Enter your age' size='lg' mt='20px' />
        <Input type='date' value={dob} onChange={e => setDob(e.target.value)} size='lg' mt='20px' />
        <Input type='file' onChange={e => setProfilePic(e.target.files[0])} size='lg' mt='20px' />

        <Button colorScheme='whatsapp' size='lg' mt='20px' onClick={handleRegister} isLoading={loading}>Register</Button>
        <Center><Text as='b'>Already have an account? <Text as='u' cursor='pointer' onClick={() => history.push('/login')}>login</Text></Text></Center>
        {console.log(username)}
    </Stack>
    </AbsoluteCenter>
    </Box>
    </>
  )
}

export default RegisterPage