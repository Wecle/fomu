import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface FmRadioProps {
  value: string
  dragging?: boolean
}

const FmRadio: React.FC<FmRadioProps> = ({
  value: defaultValue
}: FmRadioProps) => {
  return (
    <Box p={2} border="1px" borderRadius="md" borderColor="gray.200">
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
