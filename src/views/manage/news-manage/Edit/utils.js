// 封装统一的创建方法
const createMarkdown = async (selector) => {
  const { Editor } = await import('@toast-ui/editor')
  await import('@toast-ui/editor/dist/toastui-editor.css')
  await import('@toast-ui/editor/dist/i18n/zh-cn')
  let editor = new Editor({
    el: document.querySelector(selector),
    height: '500px',
    previewStyle: 'vertical',
    language: 'zh-CN'
    // language: $store.getters.language === 'ch' ? 'zh-CN' : 'en'
  })
  editor.getMarkdown()
  return editor
}

const createRichtext = async (selector) => {
  // 动态导入的模块没有自动解构（所以需要手动从default中取）
  const { default: Editor } = await import('wangeditor')
  let editor = new Editor(document.querySelector(selector))
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  editor.create()
  return editor
}

const strategies = {
  markdown: createMarkdown,
  richtext: createRichtext
}

// 由于markdown与富文本编辑器的初始化差异有些大，所以使用策略模式（好处：方便新增其他的文本编辑工具）
export function createEditor(fun, selector) {
  return strategies[fun](selector)
}
