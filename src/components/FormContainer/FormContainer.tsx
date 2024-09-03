import { Box, Text } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MaterialItem, materialNameMap } from '../Materials/materials'
import SortableItem from './SortableItem'

interface FormContainerProps {
  widgets: MaterialItem[]
  activeWidget: MaterialItem | null
}

const FormContainer = ({ widgets, activeWidget }: FormContainerProps) => {
  return (
    <Box w="100%" h="100%" margin="auto" bg="white">
      <SortableContext
        items={widgets.map((w) => w.codeId)}
        strategy={verticalListSortingStrategy}
      >
        {widgets.map((widget) => (
          <SortableItem
            key={widget.codeId}
            idx={widget.codeId}
            item={widget}
            dragging={widget.codeId === activeWidget?.codeId}
          >
            <Box p="1">
              <Box borderWidth="1px" p="2">
                <Text>
                  {materialNameMap[widget.type as keyof typeof materialNameMap]}
                </Text>
              </Box>
            </Box>
          </SortableItem>
        ))}
      </SortableContext>
    </Box>
  )
}

export default FormContainer
