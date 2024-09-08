import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid
} from '@chakra-ui/react'
import {
  materialConfig,
  MaterialItem,
  materialNameMap
} from '../Materials/materials'
import DragableItem from '../Item/DragableItem'
import Item from '../Item/Item'
import DeleteFooter from '../FormContainer/DeleteFooter'

interface MaterialBarProps {
  activeMaterial: MaterialItem | null
  dragging: boolean
  addMaterialItem: (item: MaterialItem) => void
}

const MaterialBar = ({
  activeMaterial,
  dragging,
  addMaterialItem
}: MaterialBarProps) => {
  return (
    <Box
      position="relative"
      width="300px"
      bg="slate.100"
      flexShrink={0}
      p="4"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.600',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'gray'
        }
      }}
    >
      <Accordion
        allowMultiple
        defaultIndex={materialConfig.map((_, index) => index)}
      >
        {materialConfig.map((category, index) => (
          <AccordionItem key={index} borderTop="none">
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {category.category}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={2} spacing={2}>
                {category.items.map((item) => (
                  <DragableItem<MaterialItem>
                    key={item.type}
                    type={item.type}
                    item={item}
                    onClick={addMaterialItem}
                  >
                    <Item
                      value={
                        materialNameMap[
                          item.type as keyof typeof materialNameMap
                        ]
                      }
                    />
                  </DragableItem>
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <DeleteFooter in={dragging && !!activeMaterial} />
    </Box>
  )
}

export default MaterialBar
