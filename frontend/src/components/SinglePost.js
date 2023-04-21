import React from 'react'
import { Card, CardHeader, Flex, Avatar, Box, IconButton, Heading, Text, Button, Image, CardBody,CardFooter, HStack, Spacer, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const SinglePost = ({post}) => {

  const history = useHistory()

  const deletePost = () => {
    if(post.userId === JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id) {
      const obj = {
        postId: post._id
      }
      // console.log(post._id)
      axios.post("http://localhost:9002/api/deletePost", obj)
      .then(res => {
        history.push('/')
        toast.success(res.data.message)
      }).catch(err => {
        toast.error("Error Occurred")
      })
    } else {
      toast.error("You can delete only your posts")
    }
  }

  return (
    <Card w='650px'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src={post.profilePic} />

        <Box>
          <Heading size='sm'>{post.username}</Heading>
          <Text>{Date(post.current_time).toString().slice(0, 25)}</Text>
        </Box>
      </Flex>
      
      <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<MoreVertOutlinedIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem onClick={deletePost}>
          Delete this post
        </MenuItem>
      </MenuList>
    </Menu>
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
      {post.caption}
    </Text>
  </CardBody>
  <Image
    objectFit='cover'
    src={post.postPic}
    alt='Chakra UI'
  />

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
        <Button flex='1' variant='ghost' leftIcon={<ThumbUpAltOutlinedIcon />}>
            Like
        </Button>
        <Spacer />
        <Button flex='1' variant='ghost' leftIcon={<QuestionAnswerOutlinedIcon />}>
            Comment
        </Button>
        <Spacer />
        <Button flex='1' variant='ghost' leftIcon={<ShareOutlinedIcon />}>
            Share
        </Button>
    
  </CardFooter>
</Card>
  )
}

export default SinglePost