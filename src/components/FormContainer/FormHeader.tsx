import { OperationType } from '@/hooks/useFomuDnd'
import { FormContext } from '@/pages/Home'
import { CloseIcon } from '@chakra-ui/icons'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { useCallback, useContext, useMemo } from 'react'
import { AnyMaterialItem } from '../Materials/materials'

interface FormHeaderProps {
  onChange: (operation: OperationType, widgetItem?: AnyMaterialItem) => void
}

const FormHeader = ({ onChange }: FormHeaderProps) => {
  const { activeWidget, changeActiveWidget } = useContext(FormContext)

  const handleDelete = useCallback(() => {
    if (activeWidget) {
      onChange('delete', activeWidget)
      changeActiveWidget(null)
    }
  }, [activeWidget, changeActiveWidget, onChange])

  const rightButtons = useMemo(() => {
    return [
      {
        key: 'delete',
        icon: CloseIcon,
        text: '删除',
        color: 'red.400',
        disabled: !activeWidget,
        onClick: handleDelete
      }
    ]
  }, [activeWidget, handleDelete])

  return (
    <Flex h="10" justify="space-between">
      <Flex px="4"></Flex>
      <Flex fontSize="sm" fontWeight="bold" px="4">
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
