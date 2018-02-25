import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import recommend from '@/components/recommend/recommend'
import rank from '@/components/rank/rank'
import search from '@/components/search/search'
import songs from '@/components/songs/songs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
    	path: '/recommend',
    	name: 'recommond',
    	component: recommend
    },
    {
    	path: '/rank',
    	name: 'rank',
    	component: rank
      // children: [
      //   {
      //     path: '/:tag',
      //     component: songs
      //   }
      // ]
    }
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: search
    // }
  ]
})
