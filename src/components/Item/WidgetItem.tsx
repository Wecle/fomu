import { useEffect, useMemo } from 'react'
import { HTMLChakraProps } from '@chakra-ui/react'
import { AnyMaterialItem, renderMaterialItem } from '../Materials/materials'
import Item, { ItemProps } from './Item'
import { useFormContext } from '@/hooks'

interface WidgetItemProps {
  material: AnyMaterialItem
  dragging: boolean
  wrapperClassName?: HTMLChakraProps<'div'>
}

const WidgetItem = ({
  material,
  dragging,
  wrapperClassName
}: WidgetItemProps) => {
  const { updateConfig } = useFormContext()

  useEffect(() => {
    const { codeId, defaultValue } = material
    updateConfig(codeId, 'basicConfig', {
      defaultValue
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const defaultValue = useMemo(() => {
    return material.__config__?.basicConfig?.defaultValue || ''
  }, [material.__config__?.basicConfig?.defaultValue])

  const renderItem = async (props: ItemProps) => {
    const Component = await renderMaterialItem(material.widgetType)
    return <Component {...props} codeId={material.codeId} />
  }

  return (
    <Item
      value={defaultValue}
      dragging={dragging}
      wrapperClassName={wrapperClassName}
      renderItem={renderItem}
    />
  )
}

export default WidgetItem
