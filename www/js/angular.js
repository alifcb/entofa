//////////////////////////////////////////////////////////////////materila angolar routing
 var scotchApp = angular.module('StarterApp', ['ngRoute','ngMaterial','ngSanitize','angular-progress-arc','checklist-model'] );

// configure our routes
scotchApp.config(function($routeProvider) {	  

$routeProvider
// route for the home page
.when('/', {
	templateUrl : 'pages/home.html',
})
.when('/start/:param1', {
	templateUrl : 'pages/start.html',
})
// route for the list page
.when('/execut/:param1', {
	templateUrl : 'pages/execut.html',
})
// route for the list page
.when('/list/:param1', {
	templateUrl : 'pages/list.html',
})
// route for the list page
.when('/backup/:param1', {
	templateUrl : 'pages/backup.html',
})
.when('/online', {
	templateUrl : 'pages/online.html',
})
});

////////////////////////////////////////////////////////onlineCtrl
scotchApp.controller('onlineCtrl',  function($scope,$location,$routeParams)
{
document.addEventListener("online", onOnline, false);
function onOnline() {
$location.path('/');
}
});
//////////////////////////////////////////
scotchApp.controller('startController', function($scope,todoService,$location,$routeParams) {
$scope.go = function ( path ) {$location.path( path );};

document.addEventListener("backbutton", function(e){
	if($location.path()=='/' ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
	}
}, false);

todoService.idphone().then(function(items)
{//alert(items);
	if(items){$scope.execuu=true}else{$scope.execuu=false}
	$scope.listids = 'list/'+items;
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////main
scotchApp.controller('mainController', function($scope,todoService,$location,$routeParams,$mdToast) {
document.addEventListener("offline", onOffline, false);
function onOffline() {
$location.path('/online');
}	
$mdToast.show(
      $mdToast.simple()
        .textContent('برنامه در حال در یافتن اطلاعات لیست مخاطبین است لطفا چند لحظه صبر کنید!')
        .position('bottom right')
        .hideDelay(7000)
);

$scope.go = function ( path ) {$location.path( path );};
var param1 = $routeParams.param1;
param1='all';
todoService.start(param1);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////execut
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
if($scope.ends<=10){M=120}else
if($scope.ends>10 && $scope.ends<=50){M=($scope.ends)*11;}else
if($scope.ends>50 && $scope.ends<=100){M=600}else{M=700;}
x=y=0.00;	
var promise;
promise=$interval(function(){ $scope.callAtInterval(); }, M);

$scope.callAtInterval = function() {

x=x+0.01; y=y+1; 
if(y==65){update($scope.todos);}
if(y>=100){y=100;
todoService.flagup().then(function(items)
{
	var intor = items;
if(intor==0){
document.getElementById('render').style.display = 'none';
document.getElementById('endss').style.display = 'block';
$scope.stop();
}
});

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
//success db
function errorCB(err) {
    alert("Error processing SQL: "+err.message);
}
//namayesh etelat zakhire shode (option)
function querySuccess(tx, results) { 
 var len = results.rows.length;
 //alert(len);
ros=len/2;
rund=Math.floor(ros);

var y=z=0;
for (var x=1; x<=rund+1; x++){ 

result=[];
z=(x-1)*2;
y=x*2;
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
//alert(idss);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////todoService
scotchApp.service('todoService', function($q) 
{
///////////////////////////////////////////////////////////////////////////////////////////start
this.start = function(param)
{  
var id_phone = {}; // Globally scoped object
id_phone.parid=param;
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(tablel, errorCB, successCp);


function tablel(tx){
tx.executeSql('DROP TABLE IF EXISTS contact');
tx.executeSql('CREATE TABLE IF NOT EXISTS contact(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER,id_phone INTEGER, fname text,lname text,display text,fname_fa text,lname_fa text,display_fa text,number text,flag INTEGER) ');
}

function successCp() {
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(flag_one, one_start);
}


function flag_one(tx) {
tx.executeSql('SELECT * FROM setting where title="id_phone"', [], find_id, one_start);
}
function find_id(tx, results) { // be dast avardan id_phone in id bayad dar ghesmat insert gharar begirad
 id_phone.id = results.rows.item(0).value;
	//pyda kardan contacts ha 

var fields = ['displayName','name','id','phoneNumbers'];
navigator.contacts.find(fields, onSuccess, onError);
}

function one_start(tx) { 
//pyda kardan contacts ha 
var fields = ['displayName','name','id','phoneNumbers'];
navigator.contacts.find(fields, onSuccess, onError);

var dbs = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
dbs.transaction (function(tx){codphone(tx);},errorCB);

function codphone(tx){  
 id_phone.id = Math.floor((Math.random() * 10000000) + 1);	
tx.executeSql('INSERT INTO setting(title,value) values("id_phone",'+id_phone.id+')');
//alert(id_phone.id);
}
}
//success db
function errorCB(err) {
    alert("Error processing SQL: "+err.message);
}
// onSuccess contacts
function onSuccess(contacts) {
var y=0;
var arr = Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','t','s','y','w','v','x','z','u','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','T','V','Q','R','S','Y','W','X','Z','U');

for (var i=0; i<contacts.length; i++) {
var x=long=0;res=display='';

if(contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined ) {
var number =contacts[i].phoneNumbers[0].value;
} else {
var number =0918;
}
var lname ='';
var fname ='';
if(id_phone.parid=='all'){

var id = contacts[i].id;
var display = contacts[i].displayName;

if(display==null){ }else{
var lname =contacts[i].name.familyName;	
var fname =contacts[i].name.givenName;	
var res=display.split("",1);
if(arr.contains(res[0])) { var x=1;}
}

if(x==1){
var y=y+1;
insert(id,display,fname,lname,number);
}

}else if(number !=0918 && id_phone.parid=='number'){
var id = contacts[i].id;
var display = contacts[i].displayName;

if(display==null){ }else{
var lname =contacts[i].name.familyName;	
var fname =contacts[i].name.givenName;	
var res=display.split("",1);
if(arr.contains(res[0])) { var x=1;}
}

if(x==1){
var y=y+1;
insert(id,display,fname,lname,number);
}	
}
document.getElementById('loader').style.display = 'none';
document.getElementById('demo').style.display = 'block';
document.getElementById('starter').style.display = 'block';
document.getElementById("demo").innerHTML = y;

}//for
}//end

function insert(id,display,fname,lname,number){//alert(display+'-'+fname+'-'+lname+'-'+id+'-'+number);
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(function(tx){insertco(tx,id,display,fname,lname,number);}, errorCB);
}

function insertco(tx,id,display,fname,lname,number){//alert(display+'-'+fname+'-'+lname+'-'+id+'-'+number);
tx.executeSql('INSERT INTO contact(ids,id_phone,fname,lname,display,fname_fa,lname_fa,display_fa,number,flag) values('+id+','+id_phone.id+', "'+fname+'", "'+lname+'", "'+display+'","1","1","1","'+number+'",0)');
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function onError(contactError) {
  alert('onError!');
}

// jahat baresi vjod loghat english
Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}		
},	
////////////////////////////////////////////////////////////////////////	
this.flagup = function()
  {// alert('ss');
    var deferred, result = [];
        deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("SELECT count(*) as cunt FROM contact where fname_fa='1'", [], function(tx, res) 
		  { 
result=res.rows.item(0).cunt;
deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
////////////////////////////////////////////////////////////////////////	
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
////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////	
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
this.showbackup = function()
  {  
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from backup where 1", [], function(tx, res) 
		  {//alert(res.rows.length);
			  for(var i = 0; i < res.rows.length; i++)
			  {
				  if(res.rows.item(i).lname=='undefined'){lnames=''}else{lnames=res.rows.item(i).lname}
		  result.push({id : res.rows.item(i).ids,img : 'img/icons.png', fname_fa : res.rows.item(i).fname_fa, lname_fa : res.rows.item(i).lname_fa, display_fa : res.rows.item(i).display_fa, fname : res.rows.item(i).fname, lname : lnames, display : res.rows.item(i).display})
		  }
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
///////////////////////////////////////////////////////////////////////////////////////update backupes
this.listbac = function(parad)
  {  
text = JSON.stringify(parad);
arr = JSON.parse(text);
var i;
var vc=0;
for(i = 0; i < arr.length; i++) {
var options = new ContactFindOptions();
options.filter = arr[i].id;  //just it's an example. Looking for id 20.
var fields = ['id'];
var contact;   
var idat=arr[i].id;
var count=arr.length;
var fname=arr[i].fname;
var lname=arr[i].lname;
var display=arr[i].fname+' '+arr[i].lname;
navigator.contacts.find(fields,function(contacts){
if (contacts.length==0) 
   contact = navigator.contacts.create();
else
   contact = contacts[0];
   
 
var tContactName = new ContactName();
  tContactName.givenName =fname;
  tContactName.familyName =lname;
  contact.name = tContactName; 
  contact.displayName=display;

contact.save(function(contact) {
  vc=vc+1;
// navigator.notification.alert('Saved sucessfully!!!'+vc,function(){},'Title');
  document.getElementById('number').innerHTML = vc;
  }, function(contactError) {
		  vc=vc+1;
	 document.getElementById('number').innerHTML = vc;
//	 navigator.notification.alert('Error contact save: '+vc+contactError.code,function(){},'Title');
  })
}, function(contactError) {
	// navigator.notification.alert('Error contact find: '+contactError.code,function(){},'Title');
}, options);	

}
},
///////////////////////////////////////////////////////////////////////////////////////update contacts
this.listm = function(parad)
  {  
text = JSON.stringify(parad);
arr = JSON.parse(text);
var i;
var vc=0;
for(i = 0; i < arr.length; i++) {
var options = new ContactFindOptions();
options.filter = arr[i].id;  //just it's an example. Looking for id 20.
var fields = ['id'];
var contact;   
var idat=arr[i].id;
var count=arr.length;
var fname_fa=arr[i].fname_fa;
var lname_fa=arr[i].lname_fa;
var display_fa=arr[i].fname_fa+' '+arr[i].lname_fa;
navigator.contacts.find(fields,function(contacts){
if (contacts.length==0) 
   contact = navigator.contacts.create();
else
   contact = contacts[0];
   
 
var tContactName = new ContactName();
  tContactName.givenName =fname_fa;
  tContactName.familyName =lname_fa;
  contact.name = tContactName; 
  contact.displayName=display_fa;

contact.save(function(contact) {
  vc=vc+1;
// navigator.notification.alert('Saved sucessfully!!!'+vc,function(){},'Title');
  document.getElementById('number').innerHTML = vc;
  }, function(contactError) {
		  vc=vc+1;
	 document.getElementById('number').innerHTML = vc;
//	 navigator.notification.alert('Error contact save: '+vc+contactError.code,function(){},'Title');
  })
}, function(contactError) {
	// navigator.notification.alert('Error contact find: '+contactError.code,function(){},'Title');
}, options);	

id_contact=arr[i].id;
display=arr[i].display;
fname=arr[i].fname;
lname=arr[i].lname;
display_fa=arr[i].fname_fa+' '+arr[i].lname_fa;
fname_fa=arr[i].fname_fa;
lname_fa=arr[i].lname_fa;

insertend(display,fname,lname,display_fa,fname_fa,lname_fa,id_contact);
}

function insertend(display,fname,lname,display_fa,fname_fa,lname_fa,id_contact) {
document.getElementById('number').innerHTML = '0';
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(function(tx){insert_con(tx,display,fname,lname,display_fa,fname_fa,lname_fa,id_contact);},  testonlyd, endsup);
}

function insert_con(tx,display,fname,lname,display_fa,fname_fa,lname_fa,id_contact) {//alert(display+'-'+fname+'-'+lname+'-'+id_conatct);
tx.executeSql("INSERT INTO backup(ids,id_phone,fname,lname,display,fname_fa,lname_fa,display_fa,number,flag) values("+id_contact+",921,'"+fname+"','"+lname+"','"+display+"','"+fname_fa+"','"+lname_fa+"','"+display_fa+"',921,1)", [], testonlyd, endsup );
tx.executeSql("DELETE from contact where ids="+id_contact+"", [], testonlyd, endsup );
}
function endsup(err){
    alert("Error processing SQL: "+err.message);
}	
function testonlyd(){

}
}


});
//////////////////////////////////////////////////////////////////////////list list

scotchApp.controller('ListCtrl', function ($scope,todoService,$interval,$location,$routeParams,$mdToast) {
$scope.mylist =true;
$scope.loadlist=true;
var param1 = $routeParams.param1;
$scope.idphone=param1;
$scope.go = function ( path ) {$location.path( path );};
document.addEventListener("backbutton", function(e){
	if($location.path()=='/list/'+param1 ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
	}
}, false);

//$scope.toppings = [
//{ id: 1,display: 'ali',fname: 'علی',lname: 'آلی'},
//{ id: 2,display: 'reza',fname: 'رضا',lname: 'رزا' },
//{ id: 3,display: 'ali rezay',fname: 'علی',lname: 'رضایی' },
//{ id: 4,display: 'saied',fname: 'سعید',lname: 'ساید' }
//];

todoService.showlist(param1).then(function(items)
{//alert(items);
$scope.mySwitch =false;
$scope.myexe =true;
$scope.myback =false;
$scope.mylist =false;	
$scope.loadlist=false;
$scope.toppings = items;
$scope.user = {
 toppings: [$scope.toppings[0]]
};
ssddd=$scope.user.toppings; 
});



$scope.updates = function () { 
$scope.mySwitch =true;
$scope.mylist =true;
$scope.myexe =false;

todoService.listm(ssddd);
text = JSON.stringify(ssddd);
arr = JSON.parse(text);
tedad=arr.length;
//alert(tedad);

promise=$interval(function(){ $scope.callAtInterval(); }, 500);
$scope.callAtInterval = function() {
intr=document.getElementById('number').innerHTML;

if(intr==tedad){
$scope.mySwitch =false;
$scope.myback =true;
$mdToast.show(
$mdToast.simple()
  .textContent('بروزرسانی ها به اتمام رسید!')
  .position('top')
  .hideDelay(2000)
);

$scope.stop();
}

}
$scope.stop = function() {
$interval.cancel(promise);
};


$scope.user = {
 toppings: []
};
$mdToast.show(
$mdToast.simple()
  .textContent('برنامه در حال اجرا می باشد تا اتمام بروز رسانی منتظر بمانید!')
  .position('top')
  .hideDelay(8000)
);

};
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
scotchApp.controller('backup', function ($scope,todoService,$interval,$location,$routeParams,$mdToast) {
$scope.mylist =true;
$scope.loadlist=true;
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

todoService.showbackup().then(function(items)
{//alert(items);
$scope.mySwitch =false;
$scope.mylist =false;	
$scope.loadlist=false;
$scope.toppings = items;
$scope.user = {
 toppings: [$scope.toppings[0]]
};
ssddd=$scope.user.toppings; 
});

$scope.updates = function () { 
//alert(ssddd);
$scope.mySwitch =true;
$scope.mylist =true;
todoService.listbac(ssddd);
text = JSON.stringify(ssddd);
arr = JSON.parse(text);
tedad=arr.length;
//alert(tedad);

promise=$interval(function(){ $scope.callAtInterval(); }, 500);
$scope.callAtInterval = function() {
intr=document.getElementById('number').innerHTML;

if(intr==tedad){
$scope.mySwitch =false;
$mdToast.show(
  $mdToast.simple()
	.textContent('بروزرسانی ها به اتمام رسید!')
	.position('top')
	.hideDelay(2000)
);

$scope.stop();
}

}
$scope.stop = function() {
$interval.cancel(promise);
};


$scope.user = {
 toppings: []
};
$mdToast.show(
$mdToast.simple()
  .textContent('برنامه در حال اجرا می باشد تا اتمام بروز رسانی منتظر بمانید!')
  .position('top')
  .hideDelay(8000)
);

};
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
		//$log.debug("toggle " + navID + " is done");
	  });
  }, 200);
}
function buildToggler(navID) {
  return function() {
	$mdSidenav(navID)
	  .toggle()
	  .then(function () {
		//$log.debug("toggle " + navID + " is done");
	  });
  }
}
})

.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
$scope.close = function () {
$mdSidenav('right').close()
  .then(function () {
	//$log.debug("close RIGHT is done");
  });
}; 
$scope.settings = [
  { name: 'بازگردانی مخاطبان', icon: 'img/icons/idea13.svg', links: '/backup/2' }
  ];
});
////////////////////////////////////////////////////////////angular-toaset