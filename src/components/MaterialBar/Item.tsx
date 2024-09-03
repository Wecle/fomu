import { Box } from '@chakra-ui/react'
import { materialNameMap } from '../Materials/materials'

interface ItemProps {
  type: string
}

const Item = ({ type }: ItemProps) => {
  return (
    <Box
      p="2"
      mb="2"
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      cursor="grab"
    >
      {materialNameMap[type as keyof typeof materialNameMap]}
    </Box>
  )
}

export default Item
