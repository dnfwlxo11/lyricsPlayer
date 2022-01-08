import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Music from '../views/music/music.vue'
import Musician from '../views/musician/musician.vue'
import Search from '../views/search/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/search',
    name: 'Search',
    component: Search
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
