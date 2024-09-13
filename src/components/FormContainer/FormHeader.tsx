import { OperationType } from '@/hooks/useFomuDnd'
import { FormContext } from '@/pages/Home'
import { CloseIcon, CopyIcon, RepeatIcon } from '@chakra-ui/icons'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { useCallback, useContext, useMemo } from 'react'
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
        icon: CopyIcon,
        text: '复制',
        color: 'purple.300',
        disabled: !activeWidget,
        onClick: () => handleButtonClick('copy')
      },
      {
        key: 'delete',
        icon: CloseIcon,
        text: '删除',
        color: 'purple.300',
        disabled: !activeWidget,
        onClick: () => handleButtonClick('delete')
      },
      {
        key: 'reset',
        icon: RepeatIcon,
        text: '重置',
        color: 'purple.300',
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
            <Icon as={item.icon} w="2.5" h="2.5" />
            <Text>{item.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default FormHeader
