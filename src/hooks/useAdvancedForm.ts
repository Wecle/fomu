import { useCallback, useMemo, useState } from 'react'

export interface AdvancedFormType<T> {
  activeWidget: T | null
  changeActiveWidget: (widget: T | null) => void
}

const useAdvancedForm = <T>(): AdvancedFormType<T> => {
  const [activeWidget, setActiveWidget] = useState<T | null>(null)

  const changeActiveWidget = useCallback((widget: T | null) => {
    setActiveWidget(widget)
  }, [])

  const contextValue = useMemo(
    () => ({
      activeWidget,
      changeActiveWidget
    }),
    [activeWidget, changeActiveWidget]
  )

  return contextValue
}

export default useAdvancedForm
