export interface MaterialItem {
  codeId: string
  name: string
  icon: string
  type: string
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

export const materialConfig: Material[] = [
  {
    category: '基础字段',
    items: [
      {
        codeId: '',
        name: materialNameMap.text,
        icon: 'text',
        type: 'text',
        widgetType: 'textWidget'
      },
      {
        codeId: '',
        name: materialNameMap.textarea,
        icon: 'textarea',
        type: 'textarea',
        widgetType: 'textareaWidget'
      },
      {
        codeId: '',
        name: materialNameMap.radio,
        icon: 'radio',
        type: 'radio',
        widgetType: 'radioWidget'
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