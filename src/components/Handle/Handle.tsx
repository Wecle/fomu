import { forwardRef } from 'react'
import { IconButton } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'

const Handle = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <IconButton
      ref={ref}
      icon={<DragHandleIcon />}
      aria-label="拖拽"
      size="sm"
      bg="none"
      cursor="grab"
      _hover={{ bg: 'purple.200' }}
      {...props}
    />
  )
})

Handle.displayName = 'Handle'

export default Handle
