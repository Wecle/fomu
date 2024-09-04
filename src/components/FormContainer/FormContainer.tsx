import { Box, VStack } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  MaterialItem,
  materialNameMap,
  renderMaterialItem
} from '../Materials/materials'
import SortableItem from '../Item/SortableItem'
import Item, { ItemProps } from '../Item/Item'

interface FormContainerProps {
  widgets: MaterialItem[]
  activeWidget: MaterialItem | null
}

const FormContainer = ({ widgets, activeWidget }: FormContainerProps) => {
  const renderItem = async (widget: MaterialItem, props: ItemProps) => {
    const Component = await renderMaterialItem(widget.widgetType)
    return <Component {...props} />
  }

  return (
    <Box w="100%" h="100%" margin="auto" p="2" bg="white" borderRadius="md">
      <SortableContext
        items={widgets.map((w) => w.codeId)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing="4px" align="stretch">
          {widgets.map((widget) => (
            <SortableItem<MaterialItem>
              key={widget.codeId}
              idx={widget.codeId}
              item={widget}
              handle={true}
              dragging={widget.codeId === activeWidget?.codeId}
            >
              {({ isDragging }) => (
                <Item
                  value={
                    materialNameMap[widget.type as keyof typeof materialNameMap]
                  }
                  dragging={
                    isDragging || widget.codeId === activeWidget?.codeId
                  }
                  renderItem={(props) => renderItem(widget, props)}
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
