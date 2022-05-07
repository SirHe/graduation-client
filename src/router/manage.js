export default [
  // 个人中心
  {
    path: 'user-center/me',
    name: 'UserCenterMe',
    component: () => import('../views/manage/user-center/Me'),
    meta: {
      icon: '',
      title: '个人资料'
    }
  },
  {
    path: 'user-center/settings',
    name: 'UserCenterSettings',
    component: () => import('../views/manage/user-center/Settings'),
    meta: {
      icon: '',
      title: '修改密码'
    }
  },
  // 用户管理
  {
    path: 'user-manage/list',
    name: 'UserManageList',
    component: () => import('../views/manage/user-manage/List')
  },
  // 权限管理
  {
    path: 'right-manage/role',
    name: 'RightManageRole',
    component: () => import('../views/manage/right-manage/Role.vue')
  },
  {
    path: 'right-manage/right',
    name: 'RightManageRight',
    component: () => import('../views/manage/right-manage/Right.vue')
  },
  // 新闻管理
  {
    path: 'news-manage/draft',
    name: 'newsManageDraft',
    component: () => import('../views/manage/news-manage/Draft.vue')
  },
  {
    path: 'news-manage/edit',
    name: 'newsManageEdit',
    component: () => import('../views/manage/news-manage/Edit')
  },
  // 审核管理
  {
    path: 'audit-manage/audit',
    name: 'auditManageAudit',
    component: () => import('../views/manage/audit-manage/Audit')
  },
  {
    path: 'audit-manage/list',
    name: 'auditManageList',
    component: () => import('../views/manage/audit-manage/List.vue')
  },
  // 发布管理
  {
    path: 'publish-manage/offline',
    name: 'publishManageOffline',
    component: () => import('../views/manage/publish-manage/Offline.vue')
  },
  {
    path: 'publish-manage/published',
    name: 'publishManagePublished',
    component: () => import('../views/manage/publish-manage/Published.vue')
  },
  {
    path: 'publish-manage/unpublished',
    name: 'publishManageUnpublished',
    component: () => import('../views/manage/publish-manage/Unpublished.vue')
  }
]
