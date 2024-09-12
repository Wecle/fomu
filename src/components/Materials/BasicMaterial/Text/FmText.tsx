import { useState } from 'react'
import { Input } from '@chakra-ui/react'

interface FmTextareaProps {
  value: string
  dragging?: boolean
}

const FmText = ({ value: defaultValue }: FmTextareaProps) => {
  const [value, setValue] = useState(defaultValue || '')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Input
      className="min-h-10"
      value={value}
      variant="unstyled"
      onChange={handleInputChange}
    ></Input>
  )
}

export default FmText
