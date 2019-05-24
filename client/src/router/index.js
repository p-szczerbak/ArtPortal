import Vue from 'vue'
import Router from 'vue-router'
import Posts from '/Users/pzszcz/PWr/ISM/ArtPortal/client/src/components/Posts'
import LogIn from '/Users/pzszcz/PWr/ISM/ArtPortal/client/src/components/LogIn'
import WorkOfArtList from '/Users/pzszcz/PWr/ISM/ArtPortal/client/src/components/WorkOfArtList'
import AddWorkOfArt from '/Users/pzszcz/PWr/ISM/ArtPortal/client/src/components/AddWorkOfArt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/login',
      name: 'LogInFull',
      component: LogIn
    },
    {
      path: '/workOfArtList',
      name: 'WorkOfArtList',
      component: WorkOfArtList
    },
    {
      path: '/addWorkOfArt',
      name: 'AddWorkOfArt',
      component: AddWorkOfArt
    }
  ]
})
