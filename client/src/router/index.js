import Vue from 'vue'
import Router from 'vue-router'
import Hello from '/Users/pzszcz/PWr/ISM/art-portal3/client/src/components/HelloWorld'
import Posts from '/Users/pzszcz/PWr/ISM/art-portal3/client/src/components/Posts'
import LogIn from '/Users/pzszcz/PWr/ISM/art-portal3/client/src/components/LogIn'
import WorkOfArtList from '/Users/pzszcz/PWr/ISM/art-portal3/client/src/components/WorkOfArtList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/workOfArtList',
      name: 'WorkOfArtList',
      component: WorkOfArtList
    }
  ]
})
