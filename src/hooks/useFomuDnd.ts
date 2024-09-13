import { useCallback, useState, useRef } from 'react'
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  CollisionDetection,
  DroppableContainer,
  closestCorners,
  pointerWithin
} from '@dnd-kit/core'
import {
  AnyMaterialItem,
  renderMaterialItem
} from '@/components/Materials/materials'
import { arrayMove } from '@dnd-kit/sortable'
import { v4 as uuidv4 } from 'uuid'

interface FomuDndOptins {
  useWidgetDragOverlay?: boolean
}

export default function useFomuDnd(options?: FomuDndOptins) {
  const [materials, setMaterials] = useState<AnyMaterialItem[]>([])
  const [activeMaterial, setActiveMaterial] = useState<AnyMaterialItem | null>(
    null
  )
  const useDragOverlayRef = useRef(false)
  const isMaterialDraggingRef = useRef(false)

  const addMaterial = (material: AnyMaterialItem) => {
    console.log('addMaterial', material)
  }

  const reorderExistingMaterial = (
    materials: AnyMaterialItem[],
    oldIndex: number,
    newIndex: number
  ) => {
    return arrayMove(materials, oldIndex, newIndex)
  }

  const insertNewMaterial = (
    materials: AnyMaterialItem[],
    newMaterialData: AnyMaterialItem,
    insertIndex: number
  ) => {
    const newMaterials = [...materials, newMaterialData]
    return arrayMove(newMaterials, newMaterials.length - 1, insertIndex)
  }

  const updateMaterials = useCallback(
    ({ over }: DragOverEvent) => {
      console.log('updateMaterials')
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
              activeMaterial as AnyMaterialItem,
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
    const material = active.data.current as AnyMaterialItem

    useDragOverlayRef.current =
      options?.useWidgetDragOverlay || !material.codeId
    isMaterialDraggingRef.current = !material.codeId

    if (!material.codeId) {
      const cloneMaterial = JSON.parse(JSON.stringify(material))
      cloneMaterial.codeId = uuidv4()

      return setActiveMaterial(cloneMaterial)
    }
    setActiveMaterial(material)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    console.log('handleDragOver', event)
    if (
      useDragOverlayRef.current &&
      over &&
      active.id !== over?.id &&
      over?.id !== 'trash'
    ) {
      updateMaterials(event)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('handleDragEnd', event)
    useDragOverlayRef.current = false
    isMaterialDraggingRef.current = false

    const { over } = event
    if (over && over.id === 'trash') {
      console.log('delete-zone', activeMaterial)
      setMaterials((prevMaterials) =>
        prevMaterials.filter(
          (material) => material.codeId !== activeMaterial?.codeId
        )
      )
    } else {
      updateMaterialComponent()
      updateMaterials(event)
    }
    setActiveMaterial(null)
  }

  const collisionDetectionAlgorithm: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args)

    if (pointerCollisions.length > 0) {
      return pointerCollisions
    }

    return closestCorners({
      ...args,
      droppableContainers: args.droppableContainers.filter(
        (container): container is DroppableContainer => container.id !== 'trash'
      ),
      active: args.active
    })
  }

  return {
    materials,
    activeMaterial,
    isMaterialDragging: isMaterialDraggingRef.current,
    useWidgetDragOverlay: useDragOverlayRef.current,
    addMaterial,
    setMaterials,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    collisionDetectionAlgorithm
  }
}
