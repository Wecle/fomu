import { useState } from 'react'
import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react'
import logo from '../assets/images/logo.svg'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <Box textAlign="center" sx={{ '::selection': { bg: 'green.900' } }}>
      <Flex
        minH="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="#282c34"
        color="white"
      >
        <Image
          src={logo}
          className="animate-speed"
          boxSize="15rem"
          sx={{
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'spin 20s linear infinite'
            }
          }}
          alt="logo"
        />
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <Text
          bgGradient="linear(to-r, blue.300, pink.300)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="black"
          sx={{ '::selection': { bg: 'transparent' } }}
        >
          Vite + React + Typescript + Tailwindcss
        </Text>
        <Box mt={3}>
          <Button
            my={6}
            rounded="md"
            bg="gray.300"
            px={4}
            py={2}
            color="#282C34"
            _hover={{ bg: 'gray.200' }}
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </Button>
        </Box>
        <Text>
          Edit <code style={{ color: '#8d96a7' }}>App.tsx</code> and save to
          test HMR updates.
        </Text>
        <Flex mt={3} gap={3} textAlign="center" color="#8d96a7">
          <Link
            color="#61dafb"
            _hover={{ color: 'blue.400' }}
            href="https://reactjs.org"
            isExternal
          >
            Learn React
          </Link>
          {' | '}
          <Link
            color="#61dafb"
            _hover={{ color: 'blue.400' }}
            href="https://vitejs.dev/guide/features.html"
            isExternal
          >
            Vite Docs
          </Link>
          {' | '}
          <Link
            color="#61dafb"
            _hover={{ color: 'blue.400' }}
            href="/hello-world"
          >
            Hello World
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Home
