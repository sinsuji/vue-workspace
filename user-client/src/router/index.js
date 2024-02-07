import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import UserInsertView from '../views/UserInsertView.vue'
import UserUpdateView from '../views/UserUpdateView.vue'
import UserFormView from '../views/UserFormView.vue'

const routes = [
  {
    path: '/',
    name : 'userList',
    component: UserListView
  },
  {
    path: '/userInfo',
    name : 'userInfo',
    component: UserInfoView
  },
  {
    path: '/userInsert',
    name : 'userInsert',
    component: UserInsertView // UserFormView로 변경해도 상관없음
  },
  {
    path: '/userUpdate',
    name : 'userUpdate',
    component: UserUpdateView // UserFormView로 변경해도 상관없음
  },
  {
    path: '/userForm',
    name : 'userForm',
    component: UserFormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
