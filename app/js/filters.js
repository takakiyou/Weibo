'use strict';

/* Filters */
var app = angular.module('weiBoFilters', []);


app.filter('followCheck', function() {
  return function(input) {
    return input == 1? true : false;
  };
});

app.filter('genderCheck', function() {
  return function(input) {
    return input == 1? 'Male' : 'Female';
  };
});
