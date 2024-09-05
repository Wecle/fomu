import { Box, VStack } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MaterialItem, renderMaterialItem } from '../Materials/materials'
import SortableItem from '../Item/SortableItem'
import Item, { ItemProps } from '../Item/Item'

interface FormContainerProps {
  materials: MaterialItem[]
  activeMaterial: MaterialItem | null
}

const FormContainer = ({ materials, activeMaterial }: FormContainerProps) => {
  const renderItem = async (widget: MaterialItem, props: ItemProps) => {
    const Component = await renderMaterialItem(widget.widgetType)
    return <Component {...props} />
  }

  return (
    <Box w="100%" h="100%" margin="auto" p="2" bg="white" borderRadius="md">
      <SortableContext
        items={materials.map((m) => m.codeId)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing="4px" align="stretch">
          {materials.map((material) => (
            <SortableItem<MaterialItem>
              key={material.codeId}
              idx={material.codeId}
              item={material}
              handle={true}
              dragging={material.codeId === activeMaterial?.codeId}
            >
              {({ isDragging }) => (
                <Item
                  value={material.defaultValue}
                  dragging={
                    isDragging || material.codeId === activeMaterial?.codeId
                  }
                  renderItem={(props) => renderItem(material, props)}
                ></Item>
              )}
            </SortableItem>
          ))}
        </VStack>
      </SortableContext>
    </Box>
  )
}

export default FormContainer
