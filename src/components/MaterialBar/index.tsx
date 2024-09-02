import React from 'react'
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid
} from '@chakra-ui/react'
import { materialConfig } from '../Materials/materials'

interface MaterialBarProps {
  addComponent: (component: React.ReactNode) => void
}

const MaterialBar = ({ addComponent }: MaterialBarProps) => {
  return (
    <Box
      bg="gray.200"
      width="300px"
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
          <AccordionItem key={index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {category.category}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={2} spacing={2}>
                {category.items.map((item, idx) => (
                  <Box
                    key={idx}
                    p="2"
                    mb="2"
                    bg="white"
                    borderWidth="1px"
                    borderRadius="md"
                    cursor="grab"
                    onClick={() => addComponent(<Text>{item}</Text>)}
                  >
                    {item}
                  </Box>
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default MaterialBar
