import { Box } from '@chakra-ui/react'

interface ItemProps {
  value: string
}

const Item = ({ value }: ItemProps) => {
  return (
    <Box
      p="2"
      mb="2"
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      cursor="grab"
    >
      {value}
    </Box>
  )
}

export default Item
