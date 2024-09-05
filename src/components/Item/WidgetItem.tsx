import { MaterialItem, renderMaterialItem } from '../Materials/materials'
import Item, { ItemProps } from './Item'

interface WidgetItemProps {
  material: MaterialItem
  dragging: boolean
}

const WidgetItem = ({ material, dragging }: WidgetItemProps) => {
  const renderItem = async (widget: MaterialItem, props: ItemProps) => {
    const Component = await renderMaterialItem(widget.widgetType)
    return <Component {...props} />
  }

  return (
    <Item
      value={material.defaultValue}
      dragging={dragging}
      renderItem={(props) => renderItem(material, props)}
    />
  )
}

export default WidgetItem
