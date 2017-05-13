'use strict';

export default function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state({
      name: 'home',
      url: '/home',
      component: 'home'
    })
    .state({
      name: 'users',
      url: '/users',
      authenticate: true,
      component: 'users'
    });

  $urlRouterProvider.otherwise('/home');
}