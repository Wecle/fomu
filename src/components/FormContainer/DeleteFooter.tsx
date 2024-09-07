import { Box, Text } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'

const DeleteFooter = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'delete-footer'
  })

  return (
    <Box
      ref={setNodeRef}
      height="60px"
      bg={isOver ? 'red.600' : 'red.500'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="background-color 0.2s"
    >
      <Text color="white" fontWeight="bold">
        拖动到此处删除
      </Text>
    </Box>
  )
}

export default DeleteFooter
