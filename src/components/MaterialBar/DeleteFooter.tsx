import { Box, Text } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'

interface DeleteFooterProps {
  in?: boolean
}

const DeleteFooter = (props: DeleteFooterProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash'
  })

  return (
    <Box
      ref={setNodeRef}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      height="60px"
      bg={isOver ? 'red.600' : 'red.500'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s ease-in-out"
      transform={props.in ? 'none' : 'translateY(100%)'}
    >
      <Text color="white" fontWeight="bold">
        拖动到此处删除
      </Text>
    </Box>
  )
}

export default DeleteFooter
