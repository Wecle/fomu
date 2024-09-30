import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AnyMaterialItem } from '@/components/Materials/materials'
import {
  OperationType,
  PlatformType
} from '@/components/FormContainer/FormHeader'

const useFormHeader = ({
  setMaterials
}: {
  setMaterials: (value: React.SetStateAction<AnyMaterialItem[]>) => void
}) => {
  const [platform, setPlatform] = useState<PlatformType>('desktop')

  const handleFormChange = (
    operation: OperationType,
    widgetItem?: AnyMaterialItem
  ) => {
    switch (operation) {
      case 'copy':
        setMaterials((prevMaterials) => {
          if (!widgetItem) return prevMaterials
          const newMaterial = {
            ...JSON.parse(JSON.stringify(widgetItem)),
            codeId: uuidv4()
          }
          const index = prevMaterials.findIndex(
            (m) => m.codeId === widgetItem.codeId
          )
          return [
            ...prevMaterials.slice(0, index + 1),
            newMaterial,
            ...prevMaterials.slice(index + 1)
          ]
        })
        break
      case 'delete':
        setMaterials((prevMaterials) =>
          prevMaterials.filter(
            (material) => material.codeId !== widgetItem?.codeId
          )
        )
        break
      case 'reset':
        setMaterials([])
        break
      case 'desktop':
      case 'tablet':
      case 'mobile':
        setPlatform(operation)
        break
    }
  }

  return {
    platform,
    handleFormChange
  }
}

export default useFormHeader
