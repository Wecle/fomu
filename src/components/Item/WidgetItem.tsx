import { HTMLChakraProps } from '@chakra-ui/react'
import { MaterialItem, renderMaterialItem } from '../Materials/materials'
import Item, { ItemProps } from './Item'

interface WidgetItemProps {
  material: MaterialItem
  dragging: boolean
  wrapperClassName?: HTMLChakraProps<'div'>
}

const WidgetItem = ({
  material,
  dragging,
  wrapperClassName
}: WidgetItemProps) => {
  const renderItem = async (props: ItemProps) => {
    const Component = await renderMaterialItem(material.widgetType)
    return <Component {...props} />
  }

  return (
    <Item
      value={material.defaultValue}
      dragging={dragging}
      wrapperClassName={wrapperClassName}
      renderItem={renderItem}
    />
  )
}

export default WidgetItem
