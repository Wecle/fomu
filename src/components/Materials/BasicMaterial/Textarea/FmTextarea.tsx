import { useState } from 'react'
import { Textarea } from '@chakra-ui/react'

interface FmTextareaProps {
  value: string
  dragging?: boolean
}

const FmTextarea = ({ value: defaultValue }: FmTextareaProps) => {
  const [value, setValue] = useState(defaultValue || '')
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return <Textarea value={value} onChange={handleInputChange}></Textarea>
}

export default FmTextarea
