const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/pages/home/home.vue')
      },
      {
        path: 'req',
        component: () => import('../views/pages/req/req.vue')
      }
    ]
  }
]
export default routes