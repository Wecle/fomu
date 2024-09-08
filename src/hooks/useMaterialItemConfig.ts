import { useMemo } from 'react'
import { MaterialItem } from '@/components/Materials/materials'

const useMaterialItemConfig = ({ __config__ }: MaterialItem) => {
  const wrapperStyle = useMemo(() => {
    return __config__?.wrapperStyle || {}
  }, [__config__])

  return {
    wrapperStyle
  }
}

export default useMaterialItemConfig
