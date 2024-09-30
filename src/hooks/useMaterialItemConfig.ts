import { useMemo } from 'react'
import { AnyMaterialItem } from '@/components/Materials/materials'

const useMaterialItemConfig = (materialItem: AnyMaterialItem | null) => {
  const wrapperStyle = useMemo(() => {
    return materialItem?.__config__?.wrapperStyle || {}
  }, [materialItem?.__config__?.wrapperStyle])

  const basicConfig = useMemo(() => {
    return materialItem?.__config__?.basicConfig
  }, [materialItem?.__config__?.basicConfig])

  return {
    wrapperStyle,
    basicConfig
  }
}

export default useMaterialItemConfig
