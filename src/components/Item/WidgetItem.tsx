import { MaterialItem, renderMaterialItem } from '../Materials/materials'
import Item, { ItemProps } from './Item'

interface WidgetItemProps {
  material: MaterialItem
  dragging: boolean
}

const WidgetItem = ({ material, dragging }: WidgetItemProps) => {
  const renderItem = async (props: ItemProps) => {
    const Component = await renderMaterialItem(material.widgetType)
    return <Component {...props} />
  }

  return (
    <Item
      value={material.defaultValue}
      dragging={dragging}
      renderItem={renderItem}
    />
  )
}

export default WidgetItem
