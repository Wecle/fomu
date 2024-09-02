import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar'
import FormContainer from '@/components/FormContainer'

const Home = () => {
  const [components, setComponents] = useState<React.ReactNode[]>([])

  const addComponent = (component: React.ReactNode) => {
    setComponents([...components, component])
  }

  return (
    <Box display="flex" h="100vh" w="100vw">
      <MaterialBar addComponent={addComponent} />
      <Box flex="1" p="4" bg="gray.100">
        <FormContainer components={components} />
      </Box>
    </Box>
  )
}

export default Home
