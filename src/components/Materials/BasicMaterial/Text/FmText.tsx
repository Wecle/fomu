import { useState } from 'react'
import { Input } from '@chakra-ui/react'

interface FmTextareaProps {
  value: string
  dragging?: boolean
}

const FmText: React.FC<FmTextareaProps> = ({
  value: defaultValue
}: FmTextareaProps) => {
  const [value, setValue] = useState(defaultValue || '')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return <Input value={value} onChange={handleInputChange}></Input>
}

export default FmText
