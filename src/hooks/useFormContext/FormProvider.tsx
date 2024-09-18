import { createContext, useCallback, useMemo, useState } from 'react'
import {
  AnyMaterialItem,
  MaterialItemConfigKey,
  MaterialItemConfigValue
} from '@/components/Materials/materials'

interface FormContextType {
  activeWidget: AnyMaterialItem | null
  updateConfig: (
    codeId: string,
    configKey: MaterialItemConfigKey,
    newConfig: MaterialItemConfigValue
  ) => void
  changeActiveWidget: (widget: AnyMaterialItem | null) => void
}

export const FormContext = createContext<FormContextType>({
  activeWidget: null,
  updateConfig: () => {},
  changeActiveWidget: () => {}
})

interface FormProviderProps {
  children: React.ReactNode
  setMaterials: (value: React.SetStateAction<AnyMaterialItem[]>) => void
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  setMaterials
}: FormProviderProps) => {
  const [activeWidget, setActiveWidget] = useState<AnyMaterialItem | null>(null)

  const changeActiveWidget = (widget: AnyMaterialItem | null) => {
    setActiveWidget(widget)
  }

  const updateConfig = useCallback(
    (
      codeId: string,
      configKey: MaterialItemConfigKey,
      newConfig: MaterialItemConfigValue
    ) => {
      setMaterials((prevMaterials) => {
        const activeIndex = prevMaterials.findIndex(
          (material) => material.codeId === codeId
        )
        const activeMaterial = prevMaterials[activeIndex]
        const updatedConfig = {
          ...(activeMaterial.__config__ ?? {}),
          [configKey]: {
            ...(activeMaterial.__config__?.[configKey] ?? {}),
            ...newConfig
          }
        }
        const updatedMaterial = { ...activeMaterial, __config__: updatedConfig }

        setTimeout(() => {
          changeActiveWidget(updatedMaterial)
        })

        return [
          ...prevMaterials.slice(0, activeIndex),
          updatedMaterial,
          ...prevMaterials.slice(activeIndex + 1)
        ]
      })
    },
    [setMaterials]
  )

  const contextValue = useMemo(() => {
    return {
      activeWidget,
      updateConfig,
      changeActiveWidget
    }
  }, [activeWidget, updateConfig])

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  )
}

export default FormProvider
