import { Box, VStack } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnyMaterialItem } from '../Materials/materials'
import SortableAdvancedItem from '../Item/SortableAdvancedItem'
import WidgetItem from '../Item/WidgetItem'
import WidgetItemWrapper from '../Item/WidgetItemWrapper'
import { useFormContext, useMaterialItemConfig } from '@/hooks'
import { PlatformType } from './FormHeader'

interface FormContainerProps {
  platform: PlatformType
  materials: AnyMaterialItem[]
  useWidgetDragOverlay: boolean
  activeMaterial: AnyMaterialItem | null
}

const FormContainer = ({
  platform,
  materials,
  useWidgetDragOverlay,
  activeMaterial
}: FormContainerProps) => {
  const { activeWidget, changeActiveWidget } = useFormContext()

  return (
    <Box
      position="relative"
      h="100%"
      margin="auto"
      p="2"
      bg="white"
      borderRadius="md"
      transition="width 0.3s ease-in-out"
      w={
        platform === 'desktop'
          ? '100%'
          : platform === 'tablet'
            ? '820px'
            : '430px'
      }
    >
      <SortableContext
        items={materials.map((m) => m.codeId)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing="4px" align="stretch">
          {materials.map((material) => (
            <SortableAdvancedItem<AnyMaterialItem>
              key={material.codeId}
              idx={material.codeId}
              item={material}
              handle={true}
              dragOverlay={useWidgetDragOverlay}
              dragging={material.codeId === activeMaterial?.codeId}
              useHook={useMaterialItemConfig}
              renderItem={({ isDragging }) => (
                <WidgetItemWrapper
                  material={material}
                  isActive={activeWidget?.codeId === material.codeId}
                  useDragOverlayStyle={
                    material.codeId === activeMaterial?.codeId &&
                    useWidgetDragOverlay
                  }
                  onClick={() => changeActiveWidget(material)}
                >
                  <WidgetItem
                    material={material}
                    dragging={
                      isDragging || material.codeId === activeMaterial?.codeId
                    }
                  ></WidgetItem>
                </WidgetItemWrapper>
              )}
            ></SortableAdvancedItem>
          ))}
        </VStack>
      </SortableContext>
    </Box>
  )
}

export default FormContainer
