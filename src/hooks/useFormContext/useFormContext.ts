import { useContext } from 'react'
import { FormContext } from './FormProvider'

const useFormContext = () => {
  const context = useContext(FormContext)

  return context
}

export default useFormContext
