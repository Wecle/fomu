export interface MaterialItem {
  codeId: string
  name: string
  icon: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  widgetType: string
}

export interface Material {
  category: string
  items: MaterialItem[]
}

export const materialNameMap = {
  text: '单行文本',
  textarea: '多行文本',
  radio: '单选框组'
}

export const widgetTypeMap = {
  TEXT_WIDGET: 'textWidget',
  TEXTAREA_WIDGET: 'textareaWidget',
  RADIO_WIDGET: 'radioWidget'
}

export const materialConfig: Material[] = [
  {
    category: '基础字段',
    items: [
      {
        codeId: '',
        name: materialNameMap.text,
        icon: 'text',
        type: 'text',
        widgetType: widgetTypeMap['TEXT_WIDGET']
      },
      {
        codeId: '',
        name: materialNameMap.textarea,
        icon: 'textarea',
        type: 'textarea',
        widgetType: widgetTypeMap['TEXTAREA_WIDGET']
      },
      {
        codeId: '',
        name: materialNameMap.radio,
        icon: 'radio',
        type: 'radio',
        widgetType: widgetTypeMap['RADIO_WIDGET']
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
  [widgetTypeMap['TEXT_WIDGET']]: 'FmText',
  [widgetTypeMap['TEXTAREA_WIDGET']]: 'FmTextarea',
  [widgetTypeMap['RADIO_WIDGET']]: 'FmRadio'
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
