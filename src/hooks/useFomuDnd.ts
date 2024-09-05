import { useCallback, useState } from 'react'
import { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import { MaterialItem } from '@/components/Materials/materials'
import { arrayMove } from '@dnd-kit/sortable'

export default function useFomuDnd() {
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null
  )

  const addMaterial = (material: MaterialItem) => {
    console.log('addMaterial', material)
  }

  const getCodeId = useCallback(
    ({ widgetType, type }: MaterialItem) => {
      const currentMaterialCount = materials.filter(
        (m) => m.widgetType === widgetType
      ).length
      return `${type}_${currentMaterialCount}`
    },
    [materials]
  )

  const reorderExistingMaterial = (
    materials: MaterialItem[],
    oldIndex: number,
    newIndex: number
  ) => {
    return arrayMove(materials, oldIndex, newIndex)
  }

  const insertNewMaterial = (
    materials: MaterialItem[],
    newMaterialData: MaterialItem,
    insertIndex: number
  ) => {
    return [
      ...materials.slice(0, insertIndex),
      newMaterialData,
      ...materials.slice(insertIndex)
    ]
  }

  const updateMaterials = useCallback(({ active, over }: DragOverEvent) => {
    setMaterials((prevMaterials) => {
      const activeCodeId = active.data.current?.codeId as string
      const overCodeId = over?.id

      const oldIndex = prevMaterials.findIndex((m) => m.codeId === activeCodeId)
      const newIndex = prevMaterials.findIndex((m) => m.codeId === overCodeId)

      const isExistingMaterial = oldIndex !== -1

      return isExistingMaterial
        ? reorderExistingMaterial(prevMaterials, oldIndex, newIndex)
        : insertNewMaterial(
            prevMaterials,
            JSON.parse(JSON.stringify(active.data.current)),
            newIndex
          )
    })
  }, [])

  const handleDragStart = ({ active }: DragStartEvent) => {
    const material = active.data.current as MaterialItem
    material.codeId = getCodeId(material)
    setActiveMaterial(material)
  }

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      console.log('handleDragOver', event)
      updateMaterials(event)
    },
    [updateMaterials]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('handleDragEnd', event)
    updateMaterials(event)
    setActiveMaterial(null)
  }

  return {
    materials,
    activeMaterial,
    addMaterial,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }
}
