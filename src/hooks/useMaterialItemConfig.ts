import { useMemo } from 'react'
import { AnyMaterialItem } from '@/components/Materials/materials'

const useMaterialItemConfig = ({ __config__ }: AnyMaterialItem) => {
  const wrapperStyle = useMemo(() => {
    return __config__?.wrapperStyle || {}
  }, [__config__])

  return {
    wrapperStyle
  }
}

export default useMaterialItemConfig
