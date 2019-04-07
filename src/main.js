import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import VueRouter from 'vue-router';

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';

import TrendingAll from './views/TrendingAll';
import PopularSeries from './views/PopularSeries';
import TopSeries from './views/TopSeries';
import TopMovies from './views/TopMovies';
import TrendingMovies from './views/TrendingMovies';
import ResultPage from './views/ResultPage';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
  {
    name: 'signin',
    path: '/',
    component: SignIn
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    name: 'cadastro',
    path: '/cadastro',
    component: Cadastro
  },
  {
    name: 'trendingAll',
    path: '/trendingAll',
    component: TrendingAll
  },
  {
    name: 'popularSeries',
    path: '/popularSeries',
    component: PopularSeries
  },
  {
    name: 'topMovies',
    path: '/topMovies',
    component: TopMovies
  },
  {
    name: 'topSeries',
    path: '/topSeries',
    component: TopSeries
  },
  {
    name: 'trendingMovies',
    path: '/trendingMovies',
    component: TrendingMovies
  },
  {
    name: 'resultPage',
    path: '/resultPage/:content',
    component: ResultPage
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
