import { Box } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'

interface FormContainerProps {
  components: React.ReactNode[]
}

const FormContainer = ({ components }: FormContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: 'form-container'
  })

  return (
    <Box ref={setNodeRef} w="100%" h="100%" margin="auto" bg="white">
      {components.map((Component, index) => (
        <Box key={index} p="1">
          <Box borderWidth="1px" p="2">
            {Component}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default FormContainer
