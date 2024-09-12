export enum MaterialNameMap {
  text = '单行文本',
  textarea = '多行文本',
  radio = '单选框组'
}

export enum WidgetTypeMap {
  TEXT_WIDGET = 'textWidget',
  TEXTAREA_WIDGET = 'textareaWidget',
  RADIO_WIDGET = 'radioWidget'
}

export interface MaterialItemConfig {
  wrapperStyle?: React.CSSProperties
}

interface MaterialItemConfigMap {
  [WidgetTypeMap.TEXT_WIDGET]: MaterialItemConfig & Partial<{ value: string }>
  [WidgetTypeMap.TEXTAREA_WIDGET]: MaterialItemConfig &
    Partial<{ value: string }>
  [WidgetTypeMap.RADIO_WIDGET]: MaterialItemConfig &
    Partial<{
      value: string
      options: {
        label: string
        value: string
      }[]
    }>
}

export interface MaterialItem<
  T extends keyof MaterialItemConfigMap = keyof MaterialItemConfigMap
> {
  codeId: string
  name: string
  icon: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  widgetType: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderComponent?: React.FC<any>
  __config__?: MaterialItemConfigMap[T] // 动态根据 widgetType 匹配类型
}

export type AnyMaterialItem =
  | MaterialItem<WidgetTypeMap.TEXT_WIDGET>
  | MaterialItem<WidgetTypeMap.TEXTAREA_WIDGET>
  | MaterialItem<WidgetTypeMap.RADIO_WIDGET>

export interface Material {
  category: string
  items: AnyMaterialItem[]
}

export const materialConfig: Material[] = [
  {
    category: '基础字段',
    items: [
      {
        codeId: '',
        name: MaterialNameMap.text,
        icon: 'text',
        type: 'text',
        defaultValue: '',
        widgetType: WidgetTypeMap.TEXT_WIDGET,
        __config__: {
          wrapperStyle: {}
        }
      },
      {
        codeId: '',
        name: MaterialNameMap.textarea,
        icon: 'textarea',
        type: 'textarea',
        defaultValue: '',
        widgetType: WidgetTypeMap.TEXTAREA_WIDGET,
        __config__: {
          wrapperStyle: {}
        }
      },
      {
        codeId: '',
        name: MaterialNameMap.radio,
        icon: 'radio',
        type: 'radio',
        defaultValue: '',
        widgetType: WidgetTypeMap.RADIO_WIDGET,
        __config__: {
          wrapperStyle: {}
        }
      }
    ]
  }
  // {
  //   category: '布局字段',
  //   items: [
  //     '栅格布局',
  //     '表格布局',
  //     '标签页',
  //     '折叠面板',
  //     '行内布局',
  //     '卡片',
  //     '分割线',
  //     '提示'
  //   ]
  // },
  // {
  //   category: '容器字段',
  //   items: ['子表单', '子表单+', '对话框', '分组']
  // },
  // {
  //   category: '基础字段',
  //   items: [
  //     '单行文本',
  //     '多行文本',
  //     '计数器',
  //     '单选框组',
  //     '多选框组',
  //     '下拉选择框',
  //     '时间选择器',
  //     '日期选择器',
  //     '评分',
  //     '颜色选择器',
  //     '开关',
  //     '滑块',
  //     '文字',
  //     'HTML',
  //     '按钮',
  //     '文字链接',
  //     '级联选择器',
  //     '树选择',
  //     '步骤条',
  //     '穿梭框',
  //     '分页'
  //   ]
  // }
  // {
  //   category: '高级字段',
  //   items: [
  //     '自定义区域',
  //     '自定义组件',
  //     '文件上传',
  //     '图片上传',
  //     '编辑器',
  //     '数据表格'
  //   ]
  // }
]

const materialMap = {
  [WidgetTypeMap.TEXT_WIDGET]: 'FmText',
  [WidgetTypeMap.TEXTAREA_WIDGET]: 'FmTextarea',
  [WidgetTypeMap.RADIO_WIDGET]: 'FmRadio'
}

export const renderMaterialItem = async (
  widgetType: MaterialItem['widgetType']
) => {
  const componentName = materialMap[widgetType]
  if (!componentName) {
    throw new Error(`未找到对应的组件：${widgetType}`)
  }

  try {
    const module = await import('./index')
    if (componentName in module) {
      return module[componentName as keyof typeof module]
    } else {
      throw new Error(`组件 ${componentName} 未在 index.ts 中导出`)
    }
  } catch (error) {
    console.error(`加载组件失败：${componentName}`, error)
    throw error
  }
}
