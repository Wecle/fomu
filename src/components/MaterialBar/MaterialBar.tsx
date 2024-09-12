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
  AnyMaterialItem,
  MaterialNameMap
} from '../Materials/materials'
import DragableItem from '../Item/DragableItem'
import Item from '../Item/Item'
import DeleteFooter from './DeleteFooter'

interface MaterialBarProps {
  activeMaterial: AnyMaterialItem | null
  dragging: boolean
  addMaterialItem: (item: AnyMaterialItem) => void
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
                  <DragableItem<AnyMaterialItem>
                    key={item.type}
                    type={item.type}
                    item={item}
                    onClick={addMaterialItem}
                  >
                    <Item
                      value={
                        MaterialNameMap[
                          item.type as keyof typeof MaterialNameMap
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
