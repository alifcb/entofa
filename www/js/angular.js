// JavaScript Document
//////////////////////////////////////////////////////////////////materila angolar routing
 var scotchApp = angular.module('StarterApp', ['ngRoute','ngMaterial','ngSanitize','angular-progress-arc','checklist-model'] );

// configure our routes
scotchApp.config(function($routeProvider) {	  

$routeProvider
// route for the home page
.when('/', {
	templateUrl : 'pages/home.html',
})

// route for the list page
.when('/execut/:param1', {
	templateUrl : 'pages/execut.html',
})
// route for the list page
.when('/list/:param1', {
	templateUrl : 'pages/list.html',
})
 // route for the content page
.when('/content/:param1/:page1', {
	templateUrl : 'pages/content.html',

})

 // route for the tabs page
.when('/tabs', {
	templateUrl : 'pages/tabs.html',
	controller  : 'tabsController'
})

});
scotchApp.controller('mainController', function($scope,$location,$routeParams,$mdToast) {
$mdToast.show(
      $mdToast.simple()
        .textContent('برنامه در حال در یافت اطلاعات لیست مخاطبین است لطفا چند لحظه صبر کنید!')
        .position('bottom right')
        .hideDelay(7000)
);

document.addEventListener("backbutton", function(e){
	if($location.path()=='/' ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
	}
	}, false);
	$scope.go = function ( path ) {
	$location.path( path );
	};
	$scope.unescap = function ( str ) {
	$scope.myHTML =ripl= unescape( str );
	};
	$scope.cont = function ( paths ) {
	var param1 = $routeParams.param1;
	content='content/'+param1+'/';
	$location.path( content+paths );
};});

scotchApp.controller('maincunter', function ($scope,todoService, $interval,$location,$routeParams) {
// az servise estefadeh shavad v dakhel if az yek function bray greftan etelat , update an

document.addEventListener("backbutton", function(e){
	if($location.path()=='/execut/2' ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
	}
}, false);

$scope.go = function ( path ) {$location.path( path );};

todoService.idphone().then(function(items)
{
	$scope.todos = items;
	$scope.listid = 'list/'+items;
});

todoService.endupdate().then(function(items)
{
$scope.ends = items;
if($scope.ends<=15){M=150}else{
M=($scope.ends)*10;}
x=y=0.00;	
var promise;
promise=$interval(function(){ $scope.callAtInterval(); }, 400);
$scope.callAtInterval = function() {

x=x+0.01; y=y+1; 
if(y==70){update($scope.todos);}
if(y>=100){y=100;}
if(y>=100){y=100;
document.getElementById('render').style.display = 'none';
document.getElementById('endss').style.display = 'block';
$scope.stop();
}
$scope.size = 270;
$scope.progress = x;
$scope.darsad = y;
$scope.strokeWidth = 10;
$scope.stroke = '#044f55';
$scope.counterClockwise = '';
}
$scope.stop = function() {
$interval.cancel(promise);
};
});

var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(queryDB, errorCB);

function queryDB(tx) {//alert('swdsw');
    tx.executeSql('SELECT * FROM contact', [], querySuccess, errorCB);
}
//namayesh etelat zakhire shode (option)
function querySuccess(tx, results) { 
 var len = results.rows.length;
ros=len/15;
rund=Math.floor(ros);

var y=z=0;
for (var x=1; x<=rund+1; x++){ 

result=[];
z=(x-1)*15;
y=x*15;
if(x==rund+1){y=len;}
//alert(y+'-'+z);
for (var i=z; i<y; i++){
//alert(results.rows.item(i).fname+'-'+results.rows.item(i).lname+'-'+results.rows.item(i).number+'-'+results.rows.item(i).id_phone);
result.push({id:results.rows.item(i).ids, fname:results.rows.item(i).fname, lname:results.rows.item(i).lname, id_phone:results.rows.item(i).id_phone, tell:results.rows.item(i).number});

}
var jsonString = JSON.stringify(result);
id_phonew=results.rows.item(0).id_phone;
ajax(jsonString);

}	
}

function ajax(jsonString){
	
//alert(jsonString);
// محتویپا رویدادها
$.ajax({
url:"http://www.shahreroya.ir/demo2/api.php",
type:"GET",
datatype:"json",
data: {data : jsonString}, 
contenttype:"appliction/json",
 beforeSend: function() {
//alert('sds');	 
 },
 success:function(response){
//	 alert(response);
 },
error:function(err){
alert('mohtava'.JSON.stringify(err));
		
},	
});	
}
function update(idss){

$.ajax({
url:"http://www.shahreroya.ir/demo2/gets.php",
type:"GET",
datatype:"json",
data: {id_phone : idss}, 
contenttype:"appliction/json",
 beforeSend: function() {
//alert('888');	 
 },
 success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);

var i;
for(i = 0; i < arr.items.length; i++) {
	display=arr.items[i].fname_fa+arr.items[i].lname_fa;
	fname_fa=arr.items[i].fname_fa;
	lname_fa=arr.items[i].lname_fa;
	if(lname_fa=='undefined'){lname_fa=''}
	id_contact=arr.items[i].id_contact;
	update_su(display,fname_fa,lname_fa,id_contact);

}
},
error:function(err){
alert('mohtava'.JSON.stringify(err));
},	
});	

function update_su(display,fname_fa,lname_fa,id_contact) {
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(function(tx){update_con(tx,fname_fa,lname_fa,display,id_contact);},  testonly, endsup);
}

function update_con(tx,fname,lname,display,id_conatct ) {//alert(display+'-'+fname+'-'+lname+'-'+id_conatct);
tx.executeSql("UPDATE contact SET fname_fa='"+fname+"',lname_fa='"+lname+"',display_fa='"+display+"',flag=1 where ids="+id_conatct+"", [], testonly, endsup );
}
function endsup(err){
    alert("Error processing SQL: "+err.message);
}	
function testonly(){
}
	
} 
});	

scotchApp.service('todoService', function($q) 
{
this.idphone = function()
  {   var deferred, result = [];
        deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("SELECT * FROM setting where title='id_phone'", [], function(tx, res) 
		  { 
result=res.rows.item(0).value;
deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
this.endupdate = function()
  {   var deferredx, result = [];
        deferredx = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("SELECT count(*) AS xxx FROM contact where 1", [], function(tx, resu) 
		  { 
result=resu.rows.item(0).xxx;
deferredx.resolve(result);
		});
	  });
	  return deferredx.promise;
	  
    },
this.showlist = function(para)
  {   var idcom=para;
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from contact where id_phone="+idcom, [], function(tx, res) 
		  {
			  for(var i = 0; i < res.rows.length; i++)
			  {
		  result.push({id : res.rows.item(i).ids,img : 'img/icons.png', fname_fa : res.rows.item(i).fname_fa, lname_fa : res.rows.item(i).lname_fa, display_fa : res.rows.item(i).display_fa, fname : res.rows.item(i).fname, lname : res.rows.item(i).lname, display : res.rows.item(i).display})
		  }
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
	
this.listm = function(parad)
  {  
text = JSON.stringify(parad);
arr = JSON.parse(text);
var i;

for(i = 0; i < arr.length; i++) {
var options = new ContactFindOptions();
options.filter = arr[i].id;  //just it's an example. Looking for id 20.
var fields = ['id'];
var contact;   
navigator.contacts.find(fields,function(contacts){
if (contacts.length==0) 
   contact = navigator.contacts.create();
else
   contact = contacts[0];

  var tContactName = new ContactName();
    tContactName.givenName = arr[i].fname_fa;
    tContactName.familyName =arr[i].lname_fa;
    contact.name = tContactName; 
    contact.displayName=arr[i].fname_fa+' '+arr[i].lname_fa;

    contact.save(function(contact) {
       navigator.notification.alert('Saved sucessfully!!!',function(){},'Title');
    }, function(contactError) {
       navigator.notification.alert('Error contact save: '+contactError.code,function(){},'Title');
    })
}, function(contactError) {
       navigator.notification.alert('Error contact find: '+contactError.code,function(){},'Title');
}, options);	
id_contact=arr[i].id;
display=arr[i].display;
fname=arr[i].fname;
lname=arr[i].lname;
display_fa=arr[i].fname_fa+' '+arr[i].lname_fa;
fname_fa=arr[i].fname_fa;
lname_fa=arr[i].lname_fa;
if(lname_fa=='undefined'){lname_fa=''}
insertend(display,fname,lname,display_fa,fname_fa,lname_fa,id_contact);
}

function insertend(display,fname,lname,display_fa,fname_fa,lname_fa,id_contact) {alert(display+fname+lname+display_fa+fname_fa+lname_fa+id_contact);
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(function(tx){insert_con(tx,display,fname,lname,display_fa,fname_fa,lname_fa,id_contact);},  testonlyd, endsup);

}

function insert_con(tx,display,fname,lname,display_fa,fname_fa,lname_fa,id_contact) {//alert(display+'-'+fname+'-'+lname+'-'+id_conatct);
tx.executeSql("INSERT INTO backup(ids,id_phone,fname,lname,display,fname_fa,lname_fa,display_fa,number,flag) values("+ids+",921,'"+fname+"','"+lname+"','"+display+"','"+fname_fa+"','"+lname_fa+"','"+display_fa+"',921,1)", [], testonlyd, endsup );
}
function endsup(err){
    alert("Error processing SQL: "+err.message);
}	
function testonlyd(){
}}	
});

scotchApp.controller('ListCtrl', function ($scope,todoService,$location,$routeParams) {
var param1 = $routeParams.param1;
$scope.idphone=param1;
document.addEventListener("backbutton", function(e){
	if($location.path()=='/list/'+param1 ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
	}
}, false);

todoService.showlist(param1).then(function(items)
{
$scope.toppings = items;
$scope.user = {
 toppings: [$scope.toppings[1]]
};
ssddd=$scope.user.toppings; 
});
$scope.updates = function () { todoService.listm(ssddd)};
//$scope.toppings = [
//{ id: 1,display: 'ali',fname: 'علی',lname: 'آلی'},
//{ id: 2,display: 'reza',fname: 'رضا',lname: 'رزا' },
//{ id: 3,display: 'ali rezay',fname: 'علی',lname: 'رضایی' },
//{ id: 4,display: 'saied',fname: 'سعید',lname: 'ساید' }
//];

});
////////////////////////////////////////////////////////////////////////////////////sid nav
scotchApp.controller('Sidnav', function ($scope, $timeout, $mdSidenav, $log) {
$scope.toggleLeft = buildDelayedToggler('left');
$scope.toggleRight = buildToggler('right');
$scope.isOpenRight = function(){
  return $mdSidenav('right').isOpen();
};
/**
 * Supplies a function that will continue to operate until the
 * time is up.
 */
function debounce(func, wait, context) {
  var timer;
  return function debounced() {
	var context = $scope,
		args = Array.prototype.slice.call(arguments);
	$timeout.cancel(timer);
	timer = $timeout(function() {
	  timer = undefined;
	  func.apply(context, args);
	}, wait || 10);
  };
}
/**
 * Build handler to open/close a SideNav; when animation finishes
 * report completion in console
 */
function buildDelayedToggler(navID) {
  return debounce(function() {
	$mdSidenav(navID)
	  .toggle()
	  .then(function () {
		$log.debug("toggle " + navID + " is done");
	  });
  }, 200);
}
function buildToggler(navID) {
  return function() {
	$mdSidenav(navID)
	  .toggle()
	  .then(function () {
		$log.debug("toggle " + navID + " is done");
	  });
  }
}
})

.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
$scope.close = function () {
$mdSidenav('right').close()
  .then(function () {
	$log.debug("close RIGHT is done");
  });
}; 
  $scope.settings = [
  { name: 'بازگردانی مخاطبان', icon: 'img/icons/idea13.svg', links: '/list/modern' }
  ];
});
	
////////////////////////////////////////////////////////////angular-toaset

