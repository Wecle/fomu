import { useCallback, useContext, useMemo } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { InlineIcon } from '@iconify/react'
import { OperationType } from '@/hooks/useFomuDnd'
import { FormContext } from '@/pages/Home'
import { AnyMaterialItem } from '../Materials/materials'

interface FormHeaderProps {
  onChange: (operation: OperationType, widgetItem?: AnyMaterialItem) => void
}

const FormHeader = ({ onChange }: FormHeaderProps) => {
  const { activeWidget, changeActiveWidget } = useContext(FormContext)

  const handleButtonClick = useCallback(
    (operation: OperationType) => {
      switch (operation) {
        case 'reset':
          onChange(operation)
          changeActiveWidget(null)
          break
        case 'delete':
          if (activeWidget) {
            onChange(operation, activeWidget)
            changeActiveWidget(null)
          }
          break
        default:
          if (activeWidget) {
            onChange(operation, activeWidget)
          }
      }
    },
    [activeWidget, changeActiveWidget, onChange]
  )

  const rightButtons = useMemo(() => {
    return [
      {
        key: 'copy',
        icon: 'mdi:content-copy',
        text: '复制',
        color: 'purple.300',
        iconSize: 1,
        disabled: !activeWidget,
        onClick: () => handleButtonClick('copy')
      },
      {
        key: 'delete',
        icon: 'mdi:delete-forever-outline',
        text: '删除',
        color: 'purple.300',
        iconSize: 1.25,
        disabled: !activeWidget,
        onClick: () => handleButtonClick('delete')
      },
      {
        key: 'reset',
        icon: 'mdi:broom',
        text: '清空',
        color: 'purple.300',
        iconSize: 1.25,
        disabled: false,
        onClick: () => handleButtonClick('reset')
      }
    ]
  }, [activeWidget, handleButtonClick])

  return (
    <Flex h="10" justify="space-between">
      <Flex px="4"></Flex>
      <Flex fontSize="sm" fontWeight="bold" px="4" gap="4">
        {rightButtons.map((item) => (
          <Flex
            key={item.key}
            color={item.color}
            align="center"
            gap="1"
            cursor="pointer"
            onClick={item.onClick}
            opacity={item.disabled ? 0.4 : 1}
            _hover={{
              opacity: item.disabled ? 0.4 : 0.7
            }}
          >
            <InlineIcon
              icon={item.icon}
              height={`${item.iconSize || 1}rem`}
              width={`${item.iconSize || 1}rem`}
            />
            <Text>{item.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default FormHeader
