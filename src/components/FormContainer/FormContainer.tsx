import { Box, Slide, VStack } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MaterialItem } from '../Materials/materials'
import SortableAdvancedItem from '../Item/SortableAdvancedItem'
import WidgetItem from '../Item/WidgetItem'
import useMaterialItemConfig from '@/hooks/useMaterialItemConfig'
import DeleteFooter from './DeleteFooter'

interface FormContainerProps {
  materials: MaterialItem[]
  useWidgetDragOverlay: boolean
  activeMaterial: MaterialItem | null
}

const FormContainer = ({
  materials,
  useWidgetDragOverlay,
  activeMaterial
}: FormContainerProps) => {
  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      margin="auto"
      p="2"
      bg="white"
      borderRadius="md"
    >
      <SortableContext
        items={materials.map((m) => m.codeId)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing="4px" align="stretch">
          {materials.map((material) => (
            <SortableAdvancedItem<MaterialItem>
              key={material.codeId}
              idx={material.codeId}
              item={material}
              handle={false}
              dragOverlay={useWidgetDragOverlay}
              dragging={material.codeId === activeMaterial?.codeId}
              useHook={useMaterialItemConfig}
              wrapperClassName={{
                border: '1px',
                borderStyle:
                  material.codeId === activeMaterial?.codeId &&
                  useWidgetDragOverlay
                    ? 'dashed'
                    : 'solid',
                borderColor:
                  material.codeId === activeMaterial?.codeId &&
                  useWidgetDragOverlay
                    ? 'purple.500'
                    : 'gray.300'
              }}
              renderItem={({ isDragging }) => (
                <WidgetItem
                  material={material}
                  dragging={
                    isDragging || material.codeId === activeMaterial?.codeId
                  }
                ></WidgetItem>
              )}
            ></SortableAdvancedItem>
          ))}
        </VStack>
      </SortableContext>
      <Slide direction="bottom" in={!!activeMaterial} style={{ zIndex: 10 }}>
        <DeleteFooter />
      </Slide>
    </Box>
  )
}

export default FormContainer
