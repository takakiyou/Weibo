angular.module('luna',['ngRoute', 'friendAnimations', 'weiBoFilters']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/login', {templateUrl: 'html/login.html', controller:loginCtrl}).
      when('/personal', {templateUrl: 'html/personal.html', controller:personalCtrl}).
      when('/circul', {templateUrl: 'html/circul.html', controller:circulCtrl}).
      when('/follow', {templateUrl: 'html/follow.html', controller:followCtrl}).
      otherwise({redirectTo: '/login'});
}]);