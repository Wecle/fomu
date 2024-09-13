import { useCallback, useContext, useMemo } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { InlineIcon } from '@iconify/react'
import { FormContext } from '@/pages/Home'
import { AnyMaterialItem } from '../Materials/materials'

interface FormHeaderProps {
  onChange: (operation: OperationType, widgetItem?: AnyMaterialItem) => void
}

interface ButtonItem {
  key: string
  icon: string
  text?: string
  color?: string
  iconSize?: number
  disabled?: boolean
  onClick?: () => void
}

export type PlatformType = 'desktop' | 'tablet' | 'mobile'

export type OperationType =
  | 'copy'
  | 'delete'
  | 'reset'
  | 'desktop'
  | 'tablet'
  | 'mobile'

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
        case 'desktop':
        case 'tablet':
        case 'mobile':
          onChange(operation)
          break
        default:
          if (activeWidget) {
            onChange(operation, activeWidget)
          }
      }
    },
    [activeWidget, changeActiveWidget, onChange]
  )

  const createButtons = useCallback((buttons: ButtonItem[]): ButtonItem[] => {
    return buttons.map((button) => ({
      text: '',
      color: 'purple.300',
      iconSize: 1,
      disabled: false,
      onClick: () => {},
      ...button
    }))
  }, [])

  const leftButtons = useMemo(
    () =>
      createButtons([
        {
          key: 'desktop',
          icon: 'mdi:desktop-mac',
          iconSize: 1.25,
          onClick: () => handleButtonClick('desktop')
        },
        {
          key: 'tablet',
          icon: 'mdi:tablet',
          iconSize: 1.25,
          onClick: () => handleButtonClick('tablet')
        },
        {
          key: 'mobile',
          icon: 'mdi:cellphone-android',
          iconSize: 1.25,
          onClick: () => handleButtonClick('mobile')
        }
      ]),
    [createButtons, handleButtonClick]
  )

  const rightButtons = useMemo(
    () =>
      createButtons([
        {
          key: 'copy',
          icon: 'mdi:content-copy',
          text: '复制',
          disabled: !activeWidget,
          onClick: () => handleButtonClick('copy')
        },
        {
          key: 'delete',
          icon: 'mdi:delete-forever-outline',
          text: '删除',
          iconSize: 1.25,
          disabled: !activeWidget,
          onClick: () => handleButtonClick('delete')
        },
        {
          key: 'reset',
          icon: 'mdi:broom',
          text: '清空',
          iconSize: 1.25,
          onClick: () => handleButtonClick('reset')
        }
      ]),
    [activeWidget, handleButtonClick, createButtons]
  )

  const renderButtons = (buttons: ButtonItem[]) => (
    <Flex px="4" gap="4">
      {buttons.map(
        ({ key, color, icon, text, iconSize, disabled, onClick }) => (
          <Flex
            key={key}
            color={color}
            align="center"
            gap="1"
            cursor="pointer"
            onClick={onClick}
            opacity={disabled ? 0.4 : 1}
            _hover={{ opacity: disabled ? 0.4 : 0.7 }}
          >
            <InlineIcon
              icon={icon}
              height={`${iconSize}rem`}
              width={`${iconSize}rem`}
            />
            {text && <Text>{text}</Text>}
          </Flex>
        )
      )}
    </Flex>
  )

  return (
    <Flex h="10" justify="space-between">
      {renderButtons(leftButtons)}
      <Flex fontSize="sm" fontWeight="bold">
        {renderButtons(rightButtons)}
      </Flex>
    </Flex>
  )
}

export default FormHeader
