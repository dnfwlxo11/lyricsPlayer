import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Music from '../views/music/music.vue'
import Musician from '../views/musician/musician.vue'
import Album from '../views/album/album.vue'
import Search from '../views/search/search.vue'
import Authenticate from '../components/Authenticate.vue'
import Login from '../views/user/login.vue'
import store from '@/store'

const authenticate = (to, from, next) => {
  const userInfo = store.state.user;
  const token = window.$cookies.get('x_auth');

  if (!token) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else if (!userInfo) {
    next({ path: '/authenticate', query: { redirect: to.fullPath }});
  } else {
    next();
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/music/:musician/:musicName',
    name: 'Music',
    component: Music
  },
  {
    path: '/musician/:musicianId',
    name: 'Musician',
    component: Musician
  },
  {
    path: '/album/:albumId',
    name: 'Album',
    component: Album
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    beforeEnter: authenticate,
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
