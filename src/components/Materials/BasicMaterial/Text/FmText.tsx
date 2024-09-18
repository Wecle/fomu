import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useFormContext } from '@/hooks'

interface FmTextareaProps {
  codeId: string
  value: string
  dragging?: boolean
}

const FmText = ({ codeId, value: defaultValue }: FmTextareaProps) => {
  const { updateConfig } = useFormContext()
  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateConfig(codeId, 'basicConfig', {
      defaultValue: e.target.value
    })
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
