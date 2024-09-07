import { useCallback, useState, useRef } from 'react'
import { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import {
  MaterialItem,
  renderMaterialItem
} from '@/components/Materials/materials'
import { arrayMove } from '@dnd-kit/sortable'

interface FomuDndOptins {
  useWidgetDragOverlay?: boolean
}

export default function useFomuDnd(options?: FomuDndOptins) {
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null
  )
  const useDragOverlayRef = useRef(false)

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
    const newMaterials = [...materials, newMaterialData]
    return arrayMove(newMaterials, newMaterials.length - 1, insertIndex)
  }

  const updateMaterials = useCallback(
    ({ over }: DragOverEvent) => {
      setMaterials((prevMaterials) => {
        const activeCodeId = activeMaterial?.codeId as string
        const overCodeId = over?.id

        const oldIndex = prevMaterials.findIndex(
          (m) => m.codeId === activeCodeId
        )
        const newIndex = prevMaterials.findIndex((m) => m.codeId === overCodeId)

        const isExistingMaterial = oldIndex !== -1

        return isExistingMaterial
          ? reorderExistingMaterial(prevMaterials, oldIndex, newIndex)
          : insertNewMaterial(
              prevMaterials,
              activeMaterial as MaterialItem,
              newIndex
            )
      })
    },
    [activeMaterial]
  )

  const updateMaterialComponent = async () => {
    if (activeMaterial && !activeMaterial.renderComponent) {
      activeMaterial.renderComponent = await renderMaterialItem(
        activeMaterial.widgetType
      )
    }
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    console.log('handleDragStart', active)
    const material = active.data.current as MaterialItem

    useDragOverlayRef.current =
      options?.useWidgetDragOverlay || !material.codeId

    if (!material.codeId) {
      const cloneMaterial = JSON.parse(JSON.stringify(material))
      cloneMaterial.codeId = getCodeId(cloneMaterial)

      return setActiveMaterial(cloneMaterial)
    }
    setActiveMaterial(material)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (useDragOverlayRef.current && active.id !== over?.id) {
      console.log('handleDragOver', event)
      updateMaterials(event)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('handleDragEnd', event)
    useDragOverlayRef.current = false
    updateMaterialComponent()
    updateMaterials(event)
    setActiveMaterial(null)
  }

  return {
    materials,
    activeMaterial,
    useWidgetDragOverlay: useDragOverlayRef.current,
    addMaterial,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }
}
