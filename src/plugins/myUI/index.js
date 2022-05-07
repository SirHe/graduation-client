import MyMenu from './components/menu/MyMenu.vue'
import MyMenuItem from './components/menu/MyMenuItem.vue'
import MySubMenu from './components/menu/MySubMenu.vue'
import MyList from './components/list/MyList.vue'
import MyListItem from './components/list/MyListItem.vue'

const MyUI = {
  install(app, options) {
    // menu
    app.component('my-menu', MyMenu)
    app.component('my-menu-item', MyMenuItem)
    app.component('my-sub-menu', MySubMenu)
    // list
    app.component('my-list', MyList)
    app.component('my-list-item', MyListItem)
  }
}

export default (app) => {
  app.use(MyUI)

  // 创建一个my-popper-container
  const dom = document.createElement('div')
  dom.setAttribute('id', 'my-popper-container')
  document.body.appendChild(dom)
}
