var myApp = angular.module('myApp',['ngMessages','ngResource']);

//ngResource permite agarrar dados 
//ngMessages permite validar formularios
//controller,$scope funciona como session entre
//HTML e o AngularJS
/*myApp.controller('mainController', function($scope,$log,$filter,$resource) { 
    
    //console.log($resource); 
    
});*/

//minify-dentro do array os primeiros sao parametros para a funcao
myApp.controller('mainController',['$scope','$log',function(a,b) { 
     
    b.info(a); 
    
}]);

//def de array com funçoes dentro
/*var things = ['1','2',function() {
    
    alert('hello');
}];*/

//chamar a função dentro do array
//things[2]();

//console.log(things);
//console.log(things);


 