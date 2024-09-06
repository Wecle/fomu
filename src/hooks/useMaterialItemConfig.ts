import { MaterialItem } from '@/components/Materials/materials'

const useMaterialItemConfig = ({ __config__ }: MaterialItem) => {
  console.log('material', __config__)
  return {
    wrapperStyle: __config__?.wrapperStyle || {}
  }
}

export default useMaterialItemConfig
