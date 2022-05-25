import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../layouts/Home'
import { setItem } from '../utils/storage'
// import ManageChildren from './manage'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeLayout,
    children: [
      {
        path: 'law',
        name: 'Law',
        component: () => import('../views/home/Law')
      },
      {
        path: 'agriculture/:id',
        name: 'Agriculture',
        component: () => import('../views/home/Agriculture')
      },
      {
        path: 'bulletin',
        name: 'Bulletin',
        component: () => import('../views/home/Bulletin')
      },
      {
        path: 'produce',
        name: 'Produce',
        component: () => import('../views/home/Produce')
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('../views/home/Detail')
      },
      {
        path: '',
        redirect: '/home/law'
      }
    ]
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../layouts/Manage')
    // children: ManageChildren
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user/Register')
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export const addRouters = (name, menus) => {
  const routers = menus.reduce(
    (pre, router) => [...pre, ...router.children],
    []
  )
  routers.forEach(({ path, component, name: childName }) => {
    router.addRoute(name, {
      path,
      name: childName,
      component: () => import('../views' + component)
    })
  })
  setItem('routerNum', router.getRoutes().length)
}

export default router
