import { Box } from '@chakra-ui/react'
import { AnyMaterialItem } from '../Materials/materials'

interface WidgetItemWrapperProps {
  material: AnyMaterialItem
  isActive: boolean
  useDragOverlayStyle: boolean
  onClick: () => void
}

const WidgetItemWrapper = ({
  useDragOverlayStyle,
  isActive,
  children,
  onClick
}: WidgetItemWrapperProps & {
  children: React.ReactNode
}) => {
  return (
    <Box
      className={`
        relative
        ${
          useDragOverlayStyle
            ? 'border-2 border-dashed border-purple-500'
            : isActive
              ? 'border-2 border-solid border-purple-500'
              : 'border border-solid border-gray-300'
        }`}
      borderRadius="md"
      onClick={onClick}
    >
      {children}
    </Box>
  )
}

export default WidgetItemWrapper
