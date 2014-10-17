var targetPath = 'http://192.168.0.143:3000/';

function loginCtrl($scope, $http, $location) {
	console.log("welcome Weibo");
	getMyStyle('default');
	$scope.submit = function() {
		// body...
		var id = $scope.username;

		$http.get(targetPath+'users/'+id).
		success(function(data) {

		  $scope.users = data;

		  if($scope.username != $scope.users.id) {
			alert("用户名不正确:"+users.name);
		}

		if($scope.password != $scope.users.password) {
			alert("密码不正确:"+users.password);
		}

		if($scope.username == $scope.users.id && $scope.password == $scope.users.password) {
			$location.path("circul");
		}
		//id store in rootscope
		window.localStorage.id = $scope.users.id;
		// 2 way delete
		// delete window.localStorage.id;
		// window.localStorage.id = undefined;
		}).
		error(function(){
	      console.log("!!!login failed.",id);
	    });
	}
}

function personalCtrl($scope, $http, $location) {

	$scope.id = window.localStorage.id;
	$scope.imgUrl = window.localStorage.imgUrl;
	$scope.gender = window.localStorage.gender;
	$scope.address = window.localStorage.address;
	$scope.telephone = window.localStorage.telephone;
	$scope.habit = window.localStorage.habit;
	$scope.layout = window.localStorage.myStyle;

	console.log("me getInfo success.",$scope.id);

	$scope.saveMe = function() {
		//packge data
		var me = {
			id : $scope.id,
			imgUrl : $scope.imgUrl,
			gender : $scope.gender,
			address : $scope.address,
			telephone : $scope.telephone,
			habit : $scope.habit,
			myStyle: $scope.layout
		}
		console.log("my layout:",$scope.layout);
		console.log("me form data:",me);
	  $http.post(targetPath+'saveme/',me).
	  success(function(data) {
	  	console.log("response message:",data);
	  	$location.path("circul");		
	  });
    };
    // change Layout
  $scope.changeLayout = function() {
  	getMyStyle($scope.layout);
  };
}

function getMyStyle(style) {

	$("link[title='"+style+"']").removeAttr("disabled"); 
    $("link[title!='"+style+"']").attr("disabled","disabled"); 
    console.log("My Style:",style);
}

function circulCtrl($scope, $http, $location) {
	var id = window.localStorage.id;
//query me
	$http.get(targetPath+'me/'+id).
	  success(function(data) {

		$scope.me = data;
		console.log("me data:",$scope.me);
		//storage personal Info
		window.localStorage.imgUrl = $scope.me.imgUrl;
		console.log("window.localStorage.imgUrl:",window.localStorage.imgUrl);
		window.localStorage.gender = $scope.me.gender;
		console.log("window.localStorage.gender:",window.localStorage.gender);
		window.localStorage.habit = $scope.me.habit;
		console.log("window.localStorage.habit:",window.localStorage.habit);
		window.localStorage.address = $scope.me.address;
		console.log("window.localStorage.address:",window.localStorage.address);
		window.localStorage.telephone = $scope.me.telephone;
		console.log("window.localStorage.telephone:",window.localStorage.telephone);
		window.localStorage.myStyle = $scope.me.myStyle;
		console.log("window.localStorage.telephone:",window.localStorage.myStyle);

		console.log("me query success.",id);

		getMyStyle($scope.me.myStyle);
	  }).
	  error(function() {
	  	console.log("!!!query me failed.",id);
	  });
//query cicurl
	$http.get(targetPath+'circul/'+id).
	success(function(data) {
		$scope.circul = data;
		console.log("circul query success.",id);
	});
// process form
	$scope.processForm  = function(user) {
	  $scope.user.id = id;
      console.log("say form data:",user);
	  $http.post(targetPath+'insert/',user)
	    .success( function(data) {
      		console.log("response message:",data);
      		console.log("process form success.",id);
      		//query cicurl
	        $http.get(targetPath+'circul/'+id).
	          success(function(data) {
	        	$scope.circul = data;
	        	console.log("circul query success.",id);
	          });
      	});
	};
}

function followCtrl($scope, $http) {
	var id = $scope.id = window.localStorage.id;
	$scope.imgUrl = window.localStorage.imgUrl;
	
	$http.get(targetPath+'follow/'+id).
	success(function(data) {
		$scope.follows = data;
		$scope.orderProp = 'id';
		console.log("follow query success.",id);
	});
	/* recommend friend */
	 // $scope.recommend = function() {
	 	
	 // 	$http.get(targetPath+'follow/'+id+"&recommend").
	 //      success(function(data) {
	 //      	$scope.recommend = false;
		//     $scope.follows = data;
		//     console.log("follow query success.",id);
	 //    });
	 // };
}

function checkCtrl($scope, $http, $location) {
	console.log("follow.flag:",$scope.follow.flag);
		if ($scope.follow.flag == 1) {
			$scope.follow.flag = true;
			console.log("follow.flag:",$scope.follow.flag);
		}
		else {
			$scope.follow.flag = false;
			console.log("else follow.flag:",$scope.follow.flag);
		}
		//add friend
		$scope.addFriend = function(friendId){

			if($scope.follow.flag == true) {
				alert("Are u sure delete "+friendId+" to ur friend Circul？");
				// package data
			    var data = {
				  id : $scope.id,
				  friend : friendId,
				  flag : 0
			    }
			    console.log("add friend data:",data);
			}
			else {
				alert("Are u sure add "+friendId+" to ur friend Circul？");
				var data = {
					id : $scope.id,
					friend : friendId,
					flag : 1
				}
				console.log("delete friend data:",data);
			}
			$http.post(targetPath+'followupdate/',data).
			success(function(data){
				console.log("friend update success.",$scope.id);
				// $location.path("circul");
			});
		};
}
