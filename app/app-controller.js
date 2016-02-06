myApp.controller("ShellController", function ($rootScope, $state, auth) {
    $rootScope.$on('unauthorized', function() {
        auth.logout();
        $state.go('login');
    });
});

myApp.config(['$stateProvider', '$urlRouterProvider', configureApp]);

function configureApp($stateProvider, $urlRouterProvider){
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "home/home.html",
        controller: "ShellController",
        authenticate: false
      })
      .state("login", {
        url: "/login",
        templateUrl: "login/login.html",
        controller: "LoginController as vm",
        authenticate: false
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "signup/signup.html",
        controller: "SignupController",
        authenticate: false
      })
      // route to show our basic form (/form)
      .state('postad', {
          url: '/postad',
          templateUrl: 'ad/post/form.html',
          controller: 'PostAdController'
      })
      // nested states 
      // each of these sections will have their own view
      // url will be nested (/form/profile)
      .state('postad.category', {
          url: '/category',
          templateUrl: 'ad/post/form-category.html'
      })
      .state('postad.location', {
          url: '/location',
          templateUrl: 'ad/post/form-location.html'
      })
      .state('postad.description', {
          url: '/description',
          templateUrl: 'ad/post/form-description.html'
      })
      .state('postad.price', {
          url: '/price',
          templateUrl: 'ad/post/form-price.html'
      })
      .state('postad.images', {
          url: '/images',
          templateUrl: 'ad/post/form-images.html'
      })
      .state('postad.submit', {
          url: '/submit',
          templateUrl: 'ad/post/form-submit.html'
      });
    // Send to login if the URL was not found
    $urlRouterProvider.otherwise("/home");
}

