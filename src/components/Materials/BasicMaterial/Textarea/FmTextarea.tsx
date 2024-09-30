import { useEffect, useState } from 'react'
import { Textarea } from '@chakra-ui/react'
import { useFormContext } from '@/hooks'

interface FmTextareaProps {
  codeId: string
  value: string
  dragging?: boolean
}

const FmTextarea = ({ codeId, value: defaultValue }: FmTextareaProps) => {
  const { updateConfig } = useFormContext()
  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    updateConfig(codeId, 'basicConfig', {
      defaultValue: e.target.value
    })
  }

  return (
    <Textarea
      className="min-h-20"
      value={value}
      variant="unstyled"
      onChange={handleInputChange}
    ></Textarea>
  )
}

export default FmTextarea
