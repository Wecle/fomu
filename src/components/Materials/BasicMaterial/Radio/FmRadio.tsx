import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface FmRadioProps {
  value: string
  dragging?: boolean
}

const FmRadio = ({ value: defaultValue }: FmRadioProps) => {
  return (
    <Box p={2} borderRadius="md">
      <RadioGroup defaultValue={defaultValue}>
        <Stack direction="row">
          <Radio value="1">First</Radio>
          <Radio value="2">Second</Radio>
          <Radio value="3">Third</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  )
}

export default FmRadio
