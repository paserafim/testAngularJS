var myApp = angular.module('myApp',['ngRoute']);

/*
//$scope é a cola entre a view(html) e o angular
myApp.controller('mainController',['$scope','$timeout',function($scope,$timeout) { 
     
  $scope.name = 'Tony';
    
  $timeout(function() {
      
      $scope.name = 'Everybody';
      
  },3000);
}]);
 
//Drectives and two way Data Binding- change something in the DOM
var myApp = angular.module('myApp',[]);


//$scope é a cola entre a view(html) e o angular
myApp.controller('mainController',['$scope','$filter',function($scope,$filter) { 
     
  $scope.handle = '';

  $scope.lowercasehandle = function(){
    return $filter('lowercase')($scope.handle);  
  };
  
}]);

//Directives and two way Data Binding- change something in the DOM
var tb = document.getElementById("name");

tb.addEventListener("keypress",
    function(event) {
        console.log("pressed");
});

myApp.controller('mainController',['$scope','$filter','$timeout',function($scope,$filter,$timeout) { 
     
  $scope.handle = '';

  $scope.lowercasehandle = function(){
    return $filter('lowercase')($scope.handle);  
  };
  
  $scope.$watch('handle',function(newvalue, oldvalue) {
      
     console.log('changed!');
     console.log('old:' + oldvalue);
     console.log('new:' + newvalue);
  });
    
  $timeout(function() {
      
     //apply-permite chamar o Digest Cycle para atualizar o DOM
     $scope.$apply(function() {
        $scope.handle = 'newtwitterhandle';
        console.log('Scope changed!');
     });  
  },3000);
    
}]);

myApp.controller('mainController',['$scope','$filter','$timeout',function($scope,$filter) { 
     
  $scope.handle = '';

  $scope.lowercasehandle = function(){
    return $filter('lowercase')($scope.handle);  
  };
  
  $scope.characters = 5;
  
  $scope.rules = [
      
      { rulename: "Must be 5 characters!" },
      { rulename: "Must not be used elsewhere" },
      { rulename: "Must be cool" }
  ];
    
    console.log($scope.rules); 
    
}]);

myApp.controller('mainController',['$scope',function($scope) { 
     
  $scope.alertClick = function() {
      
      alert("click");
  } 
    
  $scope.name = 'jon dow';
  
}]);
myApp.controller('mainController',['$scope','$filter',function($scope,$filter) { 
     
  $scope.handle = '';

  $scope.lowercasehandle = function(){
    return $filter('lowercase')($scope.handle);  
  };
  
  $scope.characters = 5;
  
//podemos usar wrapper Angular para tornar mais simples a sua chamada
  var rulesrequest = new XMLHttpRequest();
  rulesrequest.onreadystatechange = function() {
      $scope.$apply(function() {
          
        if(rulesrequest.readyState==4 && rulesrequest.status == 200){
          $scope.rules = JSON.parse(rules.responseText);
        }   
  });
      
  }
  
  rulesrequest.open("GET","http://localhost:54765/api",true);
  rulesrequest.send();
    
    
}]);
myApp.controller('mainController',['$scope','$filter','$http',function($scope,$filter,$http) { 

  $scope.handle = '';

  $scope.lowercasehandle = function(){
    return $filter('lowercase')($scope.handle);  
  };
  
  $scope.characters = 5;

  //substituir api pelo endereço pq é mvc -- ler da Base Dados
  $http.get('/api')
        .success(function(results) {
            $scope.rules = results;
        })
        .error(function(data,status) {
            console.log(data);
        });
}]);

//controller 1
myApp.controller('mainController',['$scope',function($scope) { 
     
    $scope.name = 'paulo';
    
}]);
//controller 2
myApp.controller('secondController',['$scope',function($scope) { 
     
    $scope.name = 'Serafim';
  
}]);
*/
//SINGLE PAGES APPLICATION (Saber ROUTING, TEMPLATES, CONTROLLERS)
/*window.addEventListener('hashchange',function() {
    
    if(window.location.hash === '#/bookmark/1'){
        console.log('Page 1 is cool');
    }
    if(window.location.hash === '#/bookmark/2'){
        console.log('Let me go to Page 2');
    }
    if(window.location.hash === '#/bookmark/3'){
        console.log('Page 3 is here');
    }
});*/

//configurar o ngRoute
myApp.config(function($routeProvider) {
    
    $routeProvider
    
        .when('/', {
            templateUrl: '/main.html',
            controller: 'mainController'
        })
    
        .when('/second/', {
            templateUrl: '/second.html',
            controller: 'secondController'
        })
    
        .when('/second/:num', {
            templateUrl: '/second.html',
            controller: 'secondController'
        })
    
});
//Criar um SINGLETON Service (todos são, exceto $scope) para injetá-lo nos controllers
myApp.service('nameService', function() {

    //para podermos aceder ao this do service
    var self = this;
    
    this.name = 'Paulo';
    
    this.namelength = function() {
        
        return self.name.length;
    }
    
});

myApp.controller('mainController',['$scope','$location','$log','nameService',function($scope,$location,$log,nameService) { 

    /*$scope.name = nameService.name;
    
    //Permite partilhar dados entre páginas porque altera o Singleton
    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });
    
    $log.log(nameService.name);
    $log.log(nameService.namelength());*/
    
    $scope.person = {
        name:'Paulo Serafim',
        address: 'rua de cima,323',
        city:'New York',
        state:'NY',
        zip:'11111'
    }
    
    $scope.formattedAddress = function(person) {
        
        return person.address + ' ' + person.city
        + ' ' + person.state + ' ' + person.zip;
        
    }

  
}]);
/*
myApp.controller('secondController',['$scope','$location','$log','$routeParams','nameService',function($scope,$location,$log,$routeParams,nameService) { 
    
    $scope.num = $routeParams.num || 1; 
    
    $scope.name = nameService.name;
    
    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });
}]);
*/
//Criar custom directives
//o nome tem de estar de acordo com a normalizaçao Angular
myApp.directive("searchResult", function() {
    
    return {
//restingir o uso da diretiva a elementos,atributos,classes,comentarios A,E,C,M.
//Por defeito esta AE
        restrict:'AECM',
        template:'directives/searchresult.html',
        replace:true, // nao envolve com a tag do angular
        scope: {
//dar o nome identico ao posto no html normalizado
            //personName:"@", //@-signif. texto
            //personAddress: "@"
//isolar o modelo do contexto do controller. E aceder ao scope do controller? usar atributos
//Passar o objeto
            personObject: "=", //indica que é um two way binding 
            formattedAddressFunction:"&" //função
        }
                
    }
    
});













