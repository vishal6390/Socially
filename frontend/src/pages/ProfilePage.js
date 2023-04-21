import React, { useContext } from 'react'
import {Center, Flex, Grid, GridItem, Heading, Stack, Image, Spacer, Box, Text} from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'
import Posts from '../components/Posts'
import Leftbar from '../components/Leftbar'
import { Auth } from '../context/AuthContext'

const ProfilePage = () => {

  const {curr_user, setCurr_user} = useContext(Auth)

  return (
    <>
      <Grid
        templateAreas={`"nav nav"
                        "left right"`}
        gridTemplateRows={'50px 1fr'}
        gridTemplateColumns={'40% 60%'}
        h='100vh'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='white' area={'nav'}>
          <Navbar />
        </GridItem>
        <GridItem pl='2' bg='white' area={'left'}>
          <Flex>
            <Spacer />
            <Stack>
              <Box mt='50px'>
                <Image src={curr_user.profilePic} borderRadius='full' boxSize='sm' alt={curr_user.username} objectFit='cover' />
              </Box>
              <Center>
                <Text>Username: {curr_user.username}</Text>
              </Center>
              <Center>
                <Text>Age: {curr_user.age}</Text>
              </Center>
              <Center>
                <Text>DOB: {curr_user.dateOfBirth}</Text>
              </Center>
            </Stack>
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem pl='2' bg='white' area={'right'}>
          <Flex>
          <Stack spacing='20px'>
            <Center><Heading mt='50px'>Your Posts</Heading></Center>
            <Center><Posts isProfile={true}/></Center>
            
          </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default ProfilePage