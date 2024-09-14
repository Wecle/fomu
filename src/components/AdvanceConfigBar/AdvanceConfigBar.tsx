import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  Text
} from '@chakra-ui/react'
import { AnyMaterialItem } from '@/components/Materials/materials'
import { useMaterialItemConfig } from '@/hooks'
import { useMemo } from 'react'

interface AdvanceConfigBarProps {
  activeWidget: AnyMaterialItem
}

const AdvanceConfigBar = ({ activeWidget }: AdvanceConfigBarProps) => {
  const { basicConfig } = useMaterialItemConfig(activeWidget)

  const getComponent = (type: string, props: Record<string, unknown>) => {
    switch (type) {
      case 'input':
        return <Input {...props} />
      default:
        return null
    }
  }

  const configs = useMemo(() => {
    const allConfig = []
    if (basicConfig) {
      allConfig.push({
        name: '基础设置',
        fields: [
          {
            key: 'title',
            label: '标题',
            component: getComponent('input', {
              value: basicConfig.title || activeWidget.name,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value)
              }
            })
          },
          {
            key: 'defaultValue',
            label: '默认值',
            component: getComponent('input', {
              value: basicConfig.defaultValue,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value)
              }
            })
          }
        ]
      })
    }
    return allConfig
  }, [activeWidget.name, basicConfig])

  return (
    <Box width="300px" bg="slate.100" flexShrink={0} p="4">
      <Accordion allowMultiple defaultIndex={[0]}>
        {configs.map((config, index) => (
          <AccordionItem key={index} borderTop="none">
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text>{config.name}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex direction="column" gap="4">
                {config.fields.map((field) => (
                  <Box key={field.key} fontSize="sm">
                    <Text mb="2">{field.label}</Text>
                    {field.component}
                  </Box>
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default AdvanceConfigBar
