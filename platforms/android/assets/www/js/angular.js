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
document.addEventListener("backbutton", function(e){
$location.path('execut/2');
}, false);

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
scotchApp.controller('mainController', function($scope,todoService,$location,$routeParams,$mdToast,$mdDialog) {
	
  $scope.goexe = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('انتخاب دسته مخاطبان')
          .textContent('لطفا یکی از گزینه های زیر را انتخاب نمایید')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('تبدیل تمام مخاطبان')
          .cancel('تبدیل مخاطبان دارای شماره');
    $mdDialog.show(confirm).then(function() {
		$location.path('execut/000');
    }, function() {
		$location.path('execut/0918');
    });
  };
  
online=document.getElementById('online').value;
if(online==0){
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
scotchApp.controller('maincunter', function ($scope,todoService, $interval,$location,$route,$routeParams) {
// az servise estefadeh shavad v dakhel if az yek function bray greftan etelat , update an
var param1 = $routeParams.param1;
if(param1=='0918'){
	todoService.deleten();
}
todoService.idphone().then(function(items)
{
	$scope.todos = items;
	$scope.listid = 'list/'+items;
});

$scope.go = function ( path ) { 
$location.path( path );};

$scope.alertm='لطفا صبر کنید... ';
 
x=y=0.00;	
var promise;
promise=$interval(function(){ $scope.callAtInterval(); }, 120);

$scope.callAtInterval = function() {

x=x+0.01; y=y+1;  

if(y>=100){y=100;x=1;
 
 
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////execut
scotchApp.controller('maincunteronline', function ($scope,todoService, $interval,$location,$route,$routeParams) {
// az servise estefadeh shavad v dakhel if az yek function bray greftan etelat , update an
var param1 = $routeParams.param1;
if(param1=='0918'){
	todoService.deleten();
}
document.getElementById('render').style.display = 'none';
document.getElementById('endss').style.display = 'block';
$scope.go = function ( path ) {$location.path( path );};

$scope.reloadin = function () {$route.reload();};
online=document.getElementById('online').value;

if(online==0){
$location.path('/online');
}	
$scope.alertm='لطفا صبر کنید... ';
document.addEventListener("backbutton", function(e){
if($location.path()=='/execut/2' ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
}
}, false);

todoService.idphone().then(function(items)
{
	$scope.todos = items;
	$scope.listid = 'list/'+items;
});

todoService.endupdate().then(function(items)
{

$scope.ends = items;
if($scope.ends<=10){M=100}else
if($scope.ends>10 && $scope.ends<=50){M=($scope.ends)*10;}else
if($scope.ends>50 && $scope.ends<=100){M=600}else{M=700;}
x=y=err=0.00;	
var promise;

promise=$interval(function(){ $scope.callAtInterval(); }, M);

$scope.callAtInterval = function() {

x=x+0.01; y=y+1; err=err+1; 
if(y==20){
online=document.getElementById('online').value;
if(online==0){
$location.path('/online');
}
}
if(y==40){
online=document.getElementById('online').value;
if(online==0){
$location.path('/online');
}}
if(y==97){
online=document.getElementById('online').value;
if(online==0){
$location.path('/online');
}}
if(y==65){
online=document.getElementById('online').value;
if(online==0){
$location.path('/online');
}
update($scope.todos);
}
if(y>=100){y=100;x=1;
$scope.alertm='در حال آماده سازی اطلاعات...';
todoService.flagup().then(function(items)
{
var intor = items;
if(intor==0){
document.getElementById('render').style.display = 'none';
document.getElementById('endss').style.display = 'block';
$scope.stop();
}else if(err<200){
$scope.alertm='در حال آماده سازی اطلاعات...';
}else{
$scope.alertm='یک خطا رخ داده. اینترنت خود را بررسی کنید!! ';
document.getElementById('reload').style.display = 'block';
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
if(lname=='undefined'){lname=''}
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
if(lname=='undefined'){lname=''}
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
// dar in ghesmat tabdil anjam midahim	

if(lname==undefined){lname=''}
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(function(tx){insertco(tx,id,display,fname,lname,number);}, errorCB);

}
String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};
function insertco(tx,id,display,fname,lname,number){//alert(display+'-'+lname+'-'+fname+'-'+id+'-'+number);
switch(fname) {
       case 'Ali Reza':
	   case 'Alireza':
         fname_fa = "علیرضا";
        break;
        case 'Reza':
        fname_fa = "رضا";
        break;
	    case 'Saeid':
        fname_fa = "سعید";
        break;	
		case 'Amir Hosein':
		case 'Amirhosein':
        fname_fa = "امیر حسین";
        break;	
		case 'Mehdi':
        fname_fa = "مهدی";
        break;	
		case 'Mohammad':
		case 'Mohamad':
		case 'Muhamad':
        fname_fa = "محمد";
        break;	
		case 'Ali':
		case 'ali':
        fname_fa = "علی";
        break;	
			case 'Amir Mohammad':
			case 'Amir Mohamad':
        fname_fa = "امیر محمد";
        break;	
			case 'Hosein':
        fname_fa = "حسین";
        break;	
			case 'mohammad Reza':
			case 'mohammadreza':
			case 'mohamad reza':
        fname_fa = "محمد رضا";
        break;	
			case 'mohammadmehdi':
			case 'mohammad Mehdi':
			case 'mohamad mehdi':
        fname_fa = "محمد مهدی";
        break;	
			case 'Reza':
			case 'reza':
        fname_fa = "رضا";
        break;	
			case 'Amir Reza':
        fname_fa = "امیر رضا";
        break;	
			case 'Mohammad Amin':
			case 'Mohamad Amin':
        fname_fa = "محمدامین";
        break;	
			case 'Mohammad Hosein':
			case 'Mohamad Hosein':
        fname_fa = "محمدحسین";
        break;	
			case 'Amir Ali':
        fname_fa = "امیرعلی";
        break;	
			case 'Erfan':
        fname_fa = "عرفان";
        break;	
			case 'Amir Mehdi':
        fname_fa = "امیرمهدی";
        break;	
			case 'Mohammad Javad':
			case 'Mohamad Javad':
        fname_fa = "محمدجواد";
        break;	
			case 'nima':
			case 'Nima':
        fname_fa = "نیما";
        break;	
			case 'Sajad':
			case 'sajad':
        fname_fa = "سجاد";
        break;	
			case 'matin':
			case 'Matin':			
        fname_fa = "متین";
        break;	
			case 'yasin':
			case 'Yasin':			
        fname_fa = "یاسین";
        break;	
			case 'Hamid Reza':
        fname_fa = "حمیدرضا";
        break;	
			case 'ehsan':
			case 'Ehsan':	
        fname_fa = "احسان";
        break;	
			case 'parsa':
			case 'Parsa':
        fname_fa = "پارسا";
        break;	
			case 'abas':
			case 'Abas':
        fname_fa = "عباس";
        break;	
			case 'mobin':
			case 'Mobin':
        fname_fa = "مبین";
        break;	
			case 'Sina':
			case 'sina':
        fname_fa = "سینا";
        break;	
			case 'danial':
            case 'Danial':			
        fname_fa = "دانیال";
        break;	
			case 'Ali Asghar':
			case 'ali asqar':
			 case 'Ali Asqar':
        fname_fa = "علی‌اصغر";
        break;	
			case 'Hasan':
			case 'hasan':
        fname_fa = "حسن";
        break;		
			case 'amir':
			case 'Amir':
        fname_fa = "امیر";
        break;	
		case 'milad':
		case 'Milad':
        fname_fa = "میلاد";
        break;	
		case 'hadi':
		case 'Hadi':
        fname_fa = "هادی";
        break;	
		case 'armin':
		case 'Armin':
        fname_fa = "آرمین";
        break;	
		case 'omid':
		case 'Omid':
        fname_fa = "امید";
        break;	
		case 'Amin':
        case 'amin':
        fname_fa = "امین";
        break;	
		case 'Shayan':
        fname_fa = "شایان";
        break;	
		case 'Amir Abas':
		case 'Amirabas':
        fname_fa = "امیرعباس";
        break;	
		case 'Mohsen':
        fname_fa = "محسن";
        break;	
		case 'Benyamin':
        fname_fa = "بنیامین";
        break;	
		case 'Yousef':
		case 'Yosef':
		case 'Yoosef':
        fname_fa = "یوسف";
        break;	
		case 'Morteza':
        fname_fa = "مرتضی";
        break;	
		case 'Mostafa':
        fname_fa = "مصطفی";
        break;	
		case 'Aryan':
		case 'Arian':		
        fname_fa = "آرین";
        break;	
		case 'Pouria':
		case 'Pooria':
		case 'Poria':		
        fname_fa = "پوریا";
        break;	
		case 'Mahan':
        fname_fa = "ماهان";
        break;	
		case 'fatemeh':
		case 'Fatemeh':		
        fname_fa = "فاطمه";
        break;	
		case 'Zahra':
		case 'zahra':		
        fname_fa = "زهرا";
        break;	
		case 'Mobina':
        fname_fa = "مبینا";
        break;	
		case 'Maryam':
        fname_fa = "مریم";
        break;	
		case 'Zynab':
		case 'Zeynab':
        fname_fa = "زینب";
        break;	
		case 'Narges':
        fname_fa = "نرگس";
        break;	
		case 'Reyhaneh':
		case 'Ryhaneh':		
        fname_fa = "ریحانه";
        break;	
		case 'Mohadeseh':
        fname_fa = "محدثه";
        break;
		case 'Mahdih':
        fname_fa = "مهدیه";
        break;
		case 'Masomeh':
        fname_fa = "معصومه";
        break;
		case 'Setayesh':
        fname_fa = "ستایش";
        break;
		case 'Mahsa':
        fname_fa = "مهسا";
        break;
		case 'sara':
		case 'Sara':		
        fname_fa = "سارا";
        break;
		case 'Hanyeh':
        fname_fa = "هانیه";
        break;
		case 'Kosar':
		case 'kosar':		
        fname_fa = "کوثر";
        break;
		case 'Maedeh':
        fname_fa = "مائده";
        break;
		case 'Roghayeh':
		case 'roghayeh':		
        fname_fa = "رقیه";
        break;
		case 'Melika':
        fname_fa = "ملیکا";
        break;
		case 'Hananeh':
        fname_fa = "حنانه";
        break;
		case 'Ayda':
        fname_fa = "آیدا";
        break;
		case 'Hadis':
        fname_fa = "حدیث";
        break;
		case 'Faezeh':
        fname_fa = "فائزه";
        break;
		case 'Parya':
        fname_fa = "پریا";
        break;
		case 'Nazanin':
        fname_fa = "نازنین";
        break;
		case 'Yeganeh':
        fname_fa = "یگانه";
        break;
		case 'Asal':
		case 'asal':
        fname_fa = "عسل";
        break;
		case 'Negin':
        fname_fa = "نگین";
        break;
		case 'Hasti':
        fname_fa = "هستی";
        break;
		case 'Hadiseh':
        fname_fa = "حدیثه";
        break;
		case 'Elahe':
        fname_fa = "الهه";
        break;
		case 'Negar':
        fname_fa = "نگار";
        break;
		case 'Sahar':
        fname_fa = "سحر";
        break;
		case 'Fatemeh Zahra':
        fname_fa = "فاطمه زهرا";
        break;
		case 'Atena':
        fname_fa = "آتنا";
        break;
		case 'Sarina':
        fname_fa = "سارینا";
        break;
		case 'dina':
		case 'Dina':
		fname_fa = "دینا";
        break;
		case 'Yasaman':
        fname_fa = "یاسمن";
        break;
		case 'Tina':
		fname_fa = "تینا";
        break;
		case 'Aynaz':
        fname_fa = "آیناز";
        break;
		case 'Asma':
		case 'asma':	
		fname_fa = "اسما";
        break;
		case 'Marzyeh':
        fname_fa = "مرضیه";
        break;
		case 'Ghazal':		
		fname_fa = "غزل";
        break;
		case 'Kimia':
        fname_fa = "کیمیا";
        break;
		case 'Mahala':		
		fname_fa = "مهلا";
        break;
		case 'Saba':
        fname_fa = "صبا";
        break;
		case 'fatima':		
		fname_fa = "فاطیما";
        break;
		case 'Helia':
        fname_fa = "هلیا";
        break;
		case 'Elnaz':		
		fname_fa = "الناز";
        break;
		case 'Bahareh':
        fname_fa = "بهاره";
        break;
		case 'Mahshid':		
		fname_fa = "مهشید";
        break;
    case 'Abtin':
        fname_fa = "آبتین";
        break;
    case 'Atrin':
        fname_fa = "آترین";
        break;
    case 'Azarakhsh':
        fname_fa = "آذرخش";
        break;
    case 'Azarmeh':
        fname_fa = "آذرمه";
        break;
    case 'Azin':
        fname_fa = "آذین";
        break;
    case 'Artin':
        fname_fa = "آرتین";
        break;
    case 'Aram':
        fname_fa = "آرام";
        break;
    case 'Araz':
        fname_fa = "آراز";
        break;
    case 'Arad':
        fname_fa = "آراد";
        break;
    case 'Arta':
        fname_fa = "آرتا";
        break;
    case 'Artan':
        fname_fa = "آرتان";
        break;
    case 'Arash':
        fname_fa = "آرش";
        break;
    case 'Arsham':
        fname_fa = "آرشام";
        break;
    case 'Arman':
        fname_fa = "آرمان";
        break;																		
    case 'Armin':
        fname_fa = "آرمین";
        break;		
    case 'Arvin':
        fname_fa = "آروین";
        break;		
    case 'Aria':
        fname_fa = "آریا";
        break;		
    case 'Ariaban':
        fname_fa = "آریابان";
        break;		
    case 'Ariana':
        fname_fa = "آریانا";
        break;		
    case 'Arian':
        fname_fa = "آرین";
        break;		
    case 'Ariobanzan':
        fname_fa = "آریوبرزن";
        break;		
    case 'Azad':
        fname_fa = "آزاد";
        break;		
    case 'Azarmagan':
        fname_fa = "آزرمگان";
        break;		
    case 'Asad':
        fname_fa = "آساد";
        break;			
    case 'Astiag':
        fname_fa = "آستیاگ";
        break;		
    case 'Alan':
        fname_fa = "آلان";
        break;		
    case 'Aveh':
        fname_fa = "آوه";
        break;		
    case 'Avizheh':
        fname_fa = "آویژه";
        break;		
    case 'Ario':
        fname_fa = "آریو";
        break;		
    case 'Ariafar':
        fname_fa = "آریافر";
        break;		
    case 'Ariaman':
        fname_fa = "آریامن";
        break;		
    case 'Aria Manesh':
        fname_fa = "آریامنش";
        break;		
    case 'Aria Mehr':
        fname_fa = "آریامهر";
        break;		
    case 'Arian':
        fname_fa = "آریان";
        break;		
    case 'akhgar':
        fname_fa = "اخگر";
        break;		
    case 'arakhsha':
        fname_fa = "ارخشا";
        break;		
    case 'ardashir':
        fname_fa = "اردشیر";
        break;		
    case 'Ardalan':
        fname_fa = "اردلان";
        break;			
    case 'Arzhang':
        fname_fa = "ارژنگ";
        break;		
    case 'Aras':
        fname_fa = "ارس";
        break;		
    case 'Arsha':	
        fname_fa = "ارشا";
        break;		
    case 'Ershad':
    case 'ershad':
        fname_fa = "ارشاد";
        break;		
    case 'Arsham':
        fname_fa = "ارشام";
        break;		
    case 'Arashk':
        fname_fa = "اَرَشک";
        break;		
    case 'Arshia':
        fname_fa = "ارشیا";
        break;			
    case 'Arvand':
        fname_fa = "اروند";
        break;		
    case 'Azhdar':
        fname_fa = "اژدر";
        break;		
    case 'Ashk':
        fname_fa = "اشک";
        break;		
    case 'Ashkan':
        fname_fa = "اشکان";
        break;		
    case 'Ashkboos':
    case 'Ashkbous':
    case 'Ashkbos':
        fname_fa = "اشکبوس";
        break;		
    case 'Afrasiab':
        fname_fa = "افراسیاب";
        break;		
    case 'Afshar':
        fname_fa = "افشار";
        break;		
    case 'Afshin':
        fname_fa = "افشین";
        break;			
	    case 'Babak':
    case 'Baabak':
        fname_fa = "بابک";
        break;	

    case 'Barbod':
        fname_fa = "باربد";
        break;
	
    case 'Baamdaad':
    case 'Bamdad':
        fname_fa = "بامداد";
        break;	

    case 'Baamin':
    case 'Bamin':
        fname_fa = "بامين";
        break;	

    case 'Bamshad':
    case 'Baamshaad':
        fname_fa = "بامشاد";
        break;	

    case 'Bardia':
        fname_fa = "برديا";
        break;	

    case 'Bozorgmehr':
        fname_fa = "بزرگمهر";
        break;	

    case 'Beh aain':
    case 'Beh ain':
        fname_fa = "به آيين";
        break;	

    case 'Bahbod':
        fname_fa = "بهبد";
        break;	

    case 'Bahraam':
    case 'Bahram':
        fname_fa = "بهرام";
        break;	

    case 'Afshin':
        fname_fa = "افشين";
        break;	

    case 'Bahman':
        fname_fa = "بهمن";
        break;	

    case 'Behmanesh':
        fname_fa = "بهمنش";
        break;	

    case 'Bijan':
        fname_fa = "بيژن";
        break;	

    case 'Behrooz':
    case 'Behrouz':
    case 'Behroz':
        fname_fa = "بهروز";
        break;	

    case 'Behrad':
    case 'Behraad':
        fname_fa = "بهراد";
        break;	

    case 'Behrang':
        fname_fa = "بهرنگ";
        break;	

    case 'Behzad':
    case 'Behzaad':
        fname_fa = "بهزاد";
        break;	

    case 'Behdad':
    case 'Behdaad':
        fname_fa = "بهداد";
        break;	

    case 'Behshaad':
    case 'Behshad':
        fname_fa = "بهشاد";
        break;	

    case 'Behnam':
    case 'Behnaam':
        fname_fa = "بهنام";
        break;	

    case 'Barsaam':
    case 'Barsam':
        fname_fa = "برسام";
        break;	

    case 'Borzoo':
    case 'Borzo':
        fname_fa = "برزو";
        break;	

    case 'Bornaa':
    case 'Borna':
        fname_fa = "برنا";
        break;	

    case 'Barzan':
        fname_fa = "برزن";
        break;	

    case 'Boroomand':
    case 'Boroumand':
        fname_fa = "برومند";
        break;	

    case 'Barzin':
        fname_fa = "برزين";
        break;	

    case 'Tirdaad':
    case 'Tirdad':
        fname_fa = "تيرداد";
        break;	

    case 'Tahmaaseb':
    case 'Tahmaseb':
    case 'Tahmaasb':
    case 'Tahmasb':
        fname_fa = "تهماسب";
        break;	

    case 'Tahamtan':
        fname_fa = "تهمتن";
        break;	

    case 'Tahmoores':
    case 'Tahmoures':
    case 'Tahmores':
        fname_fa = "تهمورث";
        break;	

    case 'Tooraj':
    case 'Taouraj':
    case 'Toraj':
        fname_fa = "تورج";
        break;	

    case 'Taabaan':
    case 'Taban':
        fname_fa = "تابان";
        break;		

    case 'Jamaseb':
    case 'Jaamaaseb':
    case 'Jaamaasb':
    case 'Jamasb':
        fname_fa = "جاماسب";
        break;	

    case 'Jaavid':
    case 'Javid':
        fname_fa = "جاويد";
        break;	

    case 'Jamshid':
        fname_fa = "جمشيد";
        break;	

    case 'Jahaangir':
    case 'Jahangir':
        fname_fa = "جهانگير";
        break;	

    case 'Jahaanbakhsh':
    case 'Jahanbakhsh':
        fname_fa = "جهانبخش";
        break;	

    case 'Jahaanshaah':
    case 'Jahanshah':
        fname_fa = "جهانشاه";
        break;	

    case 'Jahaandaar':
    case 'Jahandar':
        fname_fa = "جهاندار";
        break;	

    case 'Jahaan':
    case 'Jahan':
        fname_fa = "جهان";
        break;	

    case 'Changiz':
        fname_fa = "چنگيز";
        break;	

    case 'Chiaa':
    case 'Chia':
        fname_fa = "چيا";
        break;	

    case 'Chiaako':
    case 'Chiako':
        fname_fa = "چياکو";
        break;	

    case 'Chomaan':
    case 'Choman':
        fname_fa = "چومان";
        break;	

    case 'khodaadaad':
    case 'khodadad':
        fname_fa = "خداداد";
        break;
	
    case 'khodaabakhsh':
    case 'khodabakhsh':
        fname_fa = "خدابخش";
        break;	

    case 'khodaayaar':
    case 'khodayar':
        fname_fa = "خدايار";
        break;	

    case 'Khosro':
        fname_fa = "خسرو";
        break;	

    case 'Khashayar':
    case 'Khashaayaar':
        fname_fa = "خشايار";
        break;	

    case 'Khoobyaar':
    case 'Khoubyaar':
    case 'Khobyaar':
    case 'Khoobyar':
    case 'Khoubyar':
    case 'Khobyar':
        fname_fa = "خوبيار";
        break;	

    case 'Khorshid':
        fname_fa = "خورشيد";
        break;	

    case 'Daaraa':
    case 'Dara':
        fname_fa = "دارا";
        break;	

    case 'Daadmehr':
    case 'Dadmehr':
        fname_fa = "دادمهر";
        break;	

    case 'Daamoon':
    case 'Daamoun':
    case 'Daamon':
    case 'Damoon':
    case 'Damoun':
    case 'Damon':
        fname_fa = "دامون";
        break;	

    case 'Daanoosh':
    case 'Daanoush':
    case 'Daanosh':
    case 'Danoosh':
    case 'Danoush':
    case 'Danosh':
        fname_fa = "دانوش";
        break;	

    case 'Daanoo':
    case 'Danoo':
    case 'Daano':
    case 'Dano':
        fname_fa = "دانو";
        break;	

    case 'Daaraab':
    case 'Darab':
        fname_fa = "داراب";
        break;	

    case 'Daarioush':
    case 'Daarioosh':
    case 'Daariosh':
    case 'Darioush':
    case 'Darioosh':
    case 'Dariosh':
        fname_fa = "داريوش";
        break;	

    case 'Diaako':
    case 'Diako':
        fname_fa = "دياکو";
        break;	

    case 'Raadin':
    case 'Radin':
        fname_fa = "رادين";
        break;	

    case 'Raambod':
    case 'Rambod':
        fname_fa = "رامبد";
        break;	

    case 'Raamin':
    case 'Ramin':
        fname_fa = "رامين";
        break;	

    case 'Raamtin':
    case 'Ramtin':
        fname_fa = "رامتين";
        break;	

    case 'Rakhshaan':
    case 'Rakhshan':
        fname_fa = "رخشان";
        break;	

    case 'Rastaann':
    case 'Rastan':
        fname_fa = "رستان";
        break;	

    case 'Roozbeh':
    case 'Rouzbeh':
    case 'Rozbeh':
        fname_fa = "روزبه";
        break;	

    case 'Raadmaan':
    case 'Radman':
        fname_fa = "رادمان";
        break;	

    case 'Raamaan':
    case 'Raman':
        fname_fa = "رامان";
        break;	

    case 'Rahaa':
    case 'Raha':
        fname_fa = "رها";
        break;	

    case 'Lila':
        fname_fa = "رهام";
        break;	

    case 'Raad':
    case 'Rad':
        fname_fa = "راد";
        break;	

    case 'Rostam':
        fname_fa = "رستم";
        break;		

    case 'Zaal':
    case 'Zal':
        fname_fa = "زال";
        break;	

    case 'Zaamyaad':
    case 'Zamyad':
    case 'Zaamiad':
    case 'Zamiad':
        fname_fa = "زامياد";
        break;		

    case 'Zartosht':
        fname_fa = "زرتشت";
        break;	

    case 'Zardosht':
        fname_fa = "زردشت";
        break;	

    case 'Zarmehr':
        fname_fa = "زرمهر";
        break;	

    case 'Zand':
        fname_fa = "زند";
        break;	

    case 'Zoobin':
    case 'Zoubin':
    case 'Zobin':
        fname_fa = "زوبين";
        break;	

    case 'Joobin':
    case 'Joubin':
    case 'Jobin':
    case 'Zhoobin':
    case 'Zhoubin':
    case 'Zhobin':
        fname_fa = "ژوبين";
        break;	

    case 'Saalaar':
    case 'Salar':
        fname_fa = "سالار";
        break;	

    case 'Saasaan':
    case 'Sasan':
        fname_fa = "ساسان";
        break;	

    case 'Saamaan':
    case 'Saman':
        fname_fa = "سامان";
        break;	

    case 'Saam':
    case 'Sam':
        fname_fa = "سام";
        break;	


    case 'Soroosh':
    case 'Soroush':
    case 'Sorosh':
        fname_fa = "سروش";
        break;	

    case 'Sepehr':
        fname_fa = "سپهر";
        break;	

    case 'Sepanta':
        fname_fa = "سپنتا";
        break;	

    case 'Soren':
        fname_fa = "سورن";
        break;	

    case 'Sorena':
        fname_fa = "سورنا";
        break;	

    case 'Soshyant':
    case 'Soshiant':
    case 'Soshiyant':
    case 'Soshyanet':
    case 'Soshianet':
    case 'Soshiyanet':
        fname_fa = "سوشيانت";
        break;	

    case 'Soshyans':
    case 'Soshians':
    case 'Soshiyans':
        fname_fa = "سوشيانس";
        break;	

    case 'Sohraab':
    case 'Sohrab':
        fname_fa = "سهراب";
        break;	

    case 'Sahand':
        fname_fa = "سهند";
        break;	

    case 'Siamak':
    case 'Siyamak':
        fname_fa = "سيامک";
        break;	

    case 'Lila':
        fname_fa = "سياوش";
        break;	

    case 'Siroos':
    case 'Sirous':
    case 'Siros':
        fname_fa = "سيروس";
        break;	

    case 'Sinaa':
    case 'Sina':
        fname_fa = "سينا";
        break;	

    case 'Shadmehr':
    case 'Shaadmehr':
        fname_fa = "شادمهر";
        break;	

    case 'Shervin':
        fname_fa = "شروين";
        break;	

    case 'Shaapoor':
    case 'Shapoor':
    case 'Shaapour':
    case 'Shapour':
    case 'Shaapor':
    case 'Shapor':
        fname_fa = "شاپور";
        break;	

    case 'Shaayaa':
    case 'Shaya':
        fname_fa = "شايا";
        break;	

    case 'Shaayaan':
    case 'Shayan':
        fname_fa = "شايان";
        break;	

    case 'Shaahrokh':
    case 'Shahrokh':
        fname_fa = "شاهرخ";
        break;	

    case 'Shaahin':
    case 'Shahin':
        fname_fa = "شاهين";
        break;	

    case 'Shabaahang':
    case 'Shabahang':
        fname_fa = "شباهنگ";
        break;	

    case 'Shahraam':
    case 'Shahram':
        fname_fa = "شهرام";
        break;	

    case 'Shahkam':
    case 'Shaahkaam':
        fname_fa = "شاهکام";
        break;	

    case 'Shahraad':
    case 'Shahrad':
        fname_fa = "شهراد";
        break;	

    case 'Shahaab':
    case 'Shahab':
        fname_fa = "شهاب";
        break;	

    case 'Shahrdaad':
    case 'Shahrdad':
        fname_fa = "شهرداد";
        break;	

    case 'Shahriar':
    case 'Shahriyar':
    case 'Shahryar':
    case 'Shahriaar':
    case 'Shahriyaar':
    case 'Shahryaar':
        fname_fa = "شهريار";
        break;	

    case 'Shahrooz':
    case 'Shahrouz':
    case 'Shahroz':
        fname_fa = "شهروز";
        break;	

    case 'Shirzaad':
    case 'Shirzad':
        fname_fa = "شيرزاد";
        break;	

    case 'Shirang':
        fname_fa = "شيرنگ";
        break;	

    case 'Shahyar':
    case 'Shahiar':
        fname_fa = "شهيار";
        break;	

    case 'Shahbod':
        fname_fa = "شهبد";
        break;	

    case 'Shahnam':
        fname_fa = "شهنام";
        break;	

    case 'Shir Yazdan':
    case 'Shir yazdan':
    case 'ShirYazdan':
    case 'Shiryazdan':
        fname_fa = "شيريزدان";
        break;	

    case 'Shaho':
        fname_fa = "شاهو";
        break;	

    case 'Shirvan':
        fname_fa = "شيروان";
        break;	

    case 'Shirko':
        fname_fa = "شيرکو";
        break;	

    case 'shoresh':
    case 'shooresh':
    case 'shouresh':
        fname_fa = "شورش";
        break;	

    case 'Farzan':
        fname_fa = "فرزان";
        break;	

    case 'Farsa':
        fname_fa = "فرسا";
        break;	

    case 'Faramarz':
        fname_fa = "فرامرز";
        break;	

    case 'Farzad':
        fname_fa = "فرزاد";
        break;	

    case 'Farzam':
        fname_fa = "فرزام";
        break;	

    case 'Farzin':
        fname_fa = "فرزين";
        break;	

    case 'Fardin':
        fname_fa = "فردين";
        break;	

    case 'Fardad':
        fname_fa = "فرداد";
        break;	

    case 'Forod':
    case 'Forood':
    case 'Foroud':
        fname_fa = "فرود";
        break;	

    case 'Farman':
        fname_fa = "فرمان";
        break;	

    case 'Farhang':
        fname_fa = "فرهنگ";
        break;	

    case 'Fariborz':
        fname_fa = "فريبرز";
        break;	

    case 'Farnad':
        fname_fa = "فرناد";
        break;	

    case 'Farhad':
        fname_fa = "فرهاد";
        break;	

    case 'Farnam':
        fname_fa = "فرنام";
        break;	

    case 'Farham':
        fname_fa = "فرهام";
        break;	

    case 'Farhod':
    case 'Farhood':
    case 'Farhoud':
        fname_fa = "فرهود";
        break;	

    case 'Forohar':
    case 'Foroohar':
    case 'Forouhar':
        fname_fa = "فروهر";
        break;	

    case 'Firoz':
    case 'Firooz':
    case 'Firouz':
        fname_fa = "فيروز";
        break;	

    case 'Farshad':
        fname_fa = "فرشاد";
        break;	

    case 'Farshid':
        fname_fa = "فرشيد";
        break;	

    case 'Farrokh':
    case 'Farokh':
        fname_fa = "فرخ";
        break;	

    case 'Farrokhzad':
    case 'Farokhzad':
        fname_fa = "فرخزاد";
        break;	

    case 'Farbod':
        fname_fa = "فربد";
        break;	

    case 'Faham':
        fname_fa = "فهام";
        break;	

    case 'Feria':
    case 'Feriya':
    case 'Ferya':
        fname_fa = "فريا";
        break;	

    case 'Korosh':
        fname_fa = "کوروش";
        break;	

    case 'Karen':
        fname_fa = "کارن";
        break;	

    case 'Kambiz':
        fname_fa = "کامبيز";
        break;	

    case 'Kamran':
        fname_fa = "کامران";
        break;	

    case 'Kamshad':
        fname_fa = "کامشاد";
        break;	

    case 'Kamiar':
    case 'Kamyar':
    case 'Kamiyar':
        fname_fa = "کاميار";
        break;	

    case 'Kaveh':
    case 'Kave':
        fname_fa = "کاوه";
        break;	

    case 'Kavos':
    case 'Kavoos':
    case 'Kavou s':
        fname_fa = "کاووس";
        break;	

    case 'Kores':
    case 'Koores':
    case 'Koures':
        fname_fa = "کورس";
        break;	

    case 'Kianosh':
    case 'Kianoosh':
    case 'Kianoush':
    case 'Kiyanosh':
    case 'Kiyanoosh':
    case 'Kiyanoush':
    case 'Kyanosh':
    case 'Kyanoosh':
    case 'Kyanoush':
        fname_fa = "کيانوش";
        break;	

    case 'Kiyarash':
    case 'Kiyarash':
    case 'Kiyarash':
    case 'Kiarash':
    case 'Kiarash':
    case 'Kiarash':
    case 'Kyarash':
    case 'Kyarash':
    case 'Kyarash':
        fname_fa = "کيارش";
        break;	

    case 'Kiyavash':
    case 'Kiyavash':
    case 'Kiyavash':
    case 'Kiavash':
    case 'Kiavash':
    case 'Kiavash':
    case 'Kyavash':
    case 'Kyavash':
    case 'Kyavash':
        fname_fa = "کياوش";
        break;	

    case 'Kia':
    case 'Kiya':
        fname_fa = "کيا";
        break;	

    case 'Kian':
    case 'Kiyan':
        fname_fa = "کيان";
        break;	

    case 'Koosha':
    case 'Kousha':
    case 'Kosha':
        fname_fa = "کوشا";
        break;	

    case 'Keykhosro':
    case 'Keikhosro':
        fname_fa = "کيخسرو";
        break;
	
    case 'Keyghobad':
    case 'Keighobad':
        fname_fa = "کيقباد";
        break;	

    case 'Keykavoos':
    case 'Keikavoos':
    case 'Keykavous':
    case 'Keikavous':
    case 'Keykavos':
    case 'Keikavos':
        fname_fa = "کيکاووس";
        break;	

    case 'Keyvan':
    case 'Keivan':
    case 'Keywan':
    case 'Keiwan':
        fname_fa = "کيوان";
        break;	

    case 'Kiomars':
    case 'Kiumars':
    case 'Kumars':
        fname_fa = "کيومرث";
        break;	

    case 'Kardo':
        fname_fa = "کاردو";
        break;	

    case 'Karvan':
    case 'Karwan':
        fname_fa = "کاروان";
        break;	

    case 'Kaziveh':
    case 'Kazive':
        fname_fa = "کازيوه";
        break;	

    case 'Karzan':
        fname_fa = "کارزان";
        break;	

    case 'Komas':
        fname_fa = "کوماس";
        break;	

    case 'Gorgin':
        fname_fa = "گرگين";
        break;	

    case 'Goodarz':
    case 'Goudarz':
    case 'Godarz':
        fname_fa = "گودرز";
        break;	

    case 'Garsivaz':
    case 'Garsiwaz':
        fname_fa = "گرسيوز";
        break;	

    case 'Garshasb':
    case 'Garshaseb':
        fname_fa = "گرشاسب";
        break;	

    case 'Goshtasb':
    case 'Goshtaseb':
        fname_fa = "گشتاسب";
        break;	

    case 'Golinoosh':
    case 'Golinoush':
    case 'Golinosh':
    case 'Galinoosh':
    case 'Galinoush':
    case 'Galinosh':
        fname_fa = "گلينوش";
        break;	

    case 'Goran':
    case 'Gooran':
    case 'Gouran':
        fname_fa = "گوران";
        break;	

    case 'Lohrasb':
        fname_fa = "لهراسب";
        break;	

    case 'Lizan':
        fname_fa = "ليزان";
        break;	

    case 'Mahdiar':
    case 'Mahdiyar':
    case 'Mahdyar':
        fname_fa = "مهديار";
        break;	

    case 'Maziyar':
    case 'Mazyar':
    case 'Maziar':
        fname_fa = "مازيار";
        break;	

    case 'Makan':
        fname_fa = "ماکان";
        break;	

    case 'Manesht':
        fname_fa = "مانشت";
        break;	

    case 'Mani':
        fname_fa = "ماني";
        break;	

    case 'Mahan':
        fname_fa = "ماهان";
        break;	

    case 'Mardas':
    case 'Mordas':
        fname_fa = "مرداس";
        break;	

    case 'Mehregan':
        fname_fa = "مهرگان";
        break;	

    case 'Mardavig':
    case 'Mardavij':
    case 'Mardawig':
    case 'Mardawij':
        fname_fa = "مرداويج";
        break;	

    case 'Mazdak':
        fname_fa = "مزدک";
        break;	

    case 'Manochehr':
    case 'Manoochehr':
    case 'Manouchehr':
        fname_fa = "منوچهر";
        break;	

    case 'Mahbod':
        fname_fa = "مهبد";
        break;	

    case 'Mahdad':
    case 'Mehdad':
        fname_fa = "مهداد";
        break;	

    case 'Mehrdad':
        fname_fa = "مهرداد";
        break;	

    case 'Mehrzad':
        fname_fa = "مهرزاد";
        break;	

    case 'Mehrshad':
        fname_fa = "مهرشاد";
        break;	

    case 'Mehran':
        fname_fa = "مهران";
        break;	

    case 'Mahzad':
    case 'Mehzad':
        fname_fa = "مهزاد";
        break;	

    case 'Mehrab':
        fname_fa = "مهراب";
        break;	

    case 'Mahziar':
    case 'Mahziyar':
    case 'Mahzyar':
    case 'Mehziar':
    case 'Mehziyar':
    case 'Mehzyar':
        fname_fa = "مهزيار";
        break;	

    case 'Mahyar':
    case 'Mahiar':
        fname_fa = "مهيار";
        break;	

    case 'Mehrang':
        fname_fa = "مهرنگ";
        break;	

    case 'Milad':
        fname_fa = "ميلاد";
        break;	

    case 'Milan':
        fname_fa = "ميلان";
        break;	

    case 'Miran':
        fname_fa = "ميران";
        break;	

    case 'Narin':
        fname_fa = "نرين";
        break;

   case 'Narin':
        fname_fa = "نارين";
        break;	

    case 'Nariman':
        fname_fa = "نريمان";
        break;	

    case 'Nakisa':
        fname_fa = "نکيسا";
        break;	

    case 'Navid':
    case 'Nawid':
        fname_fa = "نويد";
        break;	

    case 'Nima':
        fname_fa = "نيما";
        break;	

    case 'Niosha':
    case 'Niyosha':
    case 'Nyosha':
    case 'Nusha':
    case 'Niusha':
        fname_fa = "نيوشا";
        break;	

    case 'Nozhan':
    case 'Nojan':
        fname_fa = "نوژن";
        break;	

    case 'Nozar':
        fname_fa = "نوذر";
        break;	

    case 'Niasa':
    case 'Niyasa':
    case 'Nyasa':
        fname_fa = "نياسا";
        break;	

    case 'Naasiko':
        fname_fa = "ناسيکو";
        break;	

    case 'Nesko':
        fname_fa = "نسکو";
        break;	

    case 'Noruz':
    case 'Norooz':
    case 'Norouz':
        fname_fa = "نوروز";
        break;	

    case 'Vandad':
    case 'Wandad':
        fname_fa = "ونداد";
        break;	

    case 'Voria':
    case 'Voriya':
    case 'Vorya':
    case 'Woria':
    case 'Woriya':
    case 'Worya':
        fname_fa = "وريا";
        break;	

    case 'Vahoman':
        fname_fa = "وهومن";
        break;	

    case 'Hamoon':
    case 'Hamon':
    case 'Hamoun':
        fname_fa = "هامون";
        break;	

    case 'Hormoz':
        fname_fa = "هرمز";
        break;	

    case 'Hoormazd':
    case 'Hourmazd':
    case 'Hormazd':
    case 'Hoormozd':
    case 'Hourmozd':
    case 'Hormozd':
        fname_fa = "هورمزد";
        break;	

    case 'Hoormond':
    case 'Hourmond':
    case 'Hormond':
        fname_fa = "هورموند";
        break;	

    case 'Hooman':
    case 'Houman':
    case 'Homan':
        fname_fa = "هومن";
        break;	

    case 'Hooshang':
    case 'Houshang':
    case 'Hoshang':
        fname_fa = "هوشنگ";
        break;	

    case 'Hootan':
    case 'Houtan':
    case 'Hotan':
        fname_fa = "هوتن";
        break;	

    case 'Hooman':
    case 'Houman':
    case 'Homan':
        fname_fa = "هومان";
        break;	

    case 'Hoshyar':
    case 'Hoshiar':
    case 'Hoshiyar':
        fname_fa = "هوشيار";
        break;	

    case 'Hoordad':
    case 'Hourdad':
    case 'Hordad':
        fname_fa = "هورداد";
        break;	

    case 'Yavar':
        fname_fa = "ياور";
        break;	

    case 'Yazdgerd':
        fname_fa = "يزدگرد";
        break;	

    case 'Yazdan':
        fname_fa = "يزدان";
        break;	

    case 'Yadegar':
        fname_fa = "يادگار";
        break;	

    case 'Abgineh':
    case 'Abgine':
        fname_fa = "آبگينه";
        break;	

    case 'Atena':
        fname_fa = "آتنا";
        break;	

    case 'Atoosa':
    case 'Atousa':
    case 'Atosa':
        fname_fa = "آتوسا";
        break;	

    case 'Akhtar':
        fname_fa = "اختر";
        break;	

    case 'Azar':
        fname_fa = "آذر";
        break;	

    case 'Azarafrooz':
        fname_fa = "آذرافروز";
        break;	

    case 'Azargoon':
    case 'Azargoun':
    case 'Azargon':
        fname_fa = "آذرگون";
        break;	

    case 'Azarnoosh':
    case 'Azarnoush':
    case 'Azarnosh':
        fname_fa = "آذرنوش";
        break;	

    case 'Azin':
        fname_fa = "آذين";
        break;	

    case 'Ara':
        fname_fa = "آرا";
        break;	

    case 'Artemis':
        fname_fa = "آرتميس";
        break;	

    case 'Arezoo':
    case 'Arezou':
    case 'Arezo':
    case 'Arezu':
        fname_fa = "آرزو";
        break;	

    case 'Armina':
        fname_fa = "آرمينا";
        break;	

    case 'Armineh':
    case 'Armine':
        fname_fa = "آرمينه";
        break;	

    case 'Armita':
        fname_fa = "آرميتا";
        break;	

    case 'Armita':
        fname_fa = "آريانا";
        break;	

    case 'Arina':
        fname_fa = "آرينا";
        break;	

    case 'Azadeh':
    case 'Azade':
        fname_fa = "آزاده";
        break;	

    case 'Asa':
        fname_fa = "آسا";
        break;	

    case 'Aftab':
        fname_fa = "آفتاب";
        break;	

    case 'Afarin':
        fname_fa = "آفرين";
        break;	

    case 'Agrin':
        fname_fa = "آگرين";
        break;	

    case 'Ala':
        fname_fa = "آلا";
        break;	

    case 'Alaleh':
    case 'Alale':
        fname_fa = "آلاله";
        break;	

    case 'Anahita':
        fname_fa = "آناهيتا";
        break;	

    case 'Anderia':
    case 'Anderiya':
    case 'Anderya':
        fname_fa = "آندريا";
        break;	

    case 'Anoosha':
    case 'Anosha':
    case 'Anousha':
        fname_fa = "آنوشا";
        break;	

    case 'Ava':
        fname_fa = "آوا";
        break;	

    case 'Avid':
        fname_fa = "آويد";
        break;	

    case 'Avideh':
    case 'Avide':
        fname_fa = "آويده";
        break;	

    case 'Avizeh':
    case 'Avize':
        fname_fa = "آويزه";
        break;	

    case 'Avisa':
        fname_fa = "آويسا";
        break;	

    case 'Avin':
        fname_fa = "آوين";
        break;	

    case 'Avineh':
    case 'Avine':
        fname_fa = "آوينه";
        break;	

    case 'Ahoo':
    case 'Aho':
    case 'Ahou':
    case 'Ahu':
        fname_fa = "آهو";
        break;	

    case 'Abrisham':
        fname_fa = "ابريشم";
        break;	

    case 'Akhtar':
        fname_fa = "اختر";
        break;	

    case 'Arghavan':
        fname_fa = "ارغوان";
        break;	

    case 'Aroosha':
    case 'Arousha':
    case 'Arosha':
    case 'Arusha':
        fname_fa = "اروشا";
        break;	

    case 'Afrooz':
    case 'Afrouz':
    case 'Afroz':
    case 'Afruz':
        fname_fa = "افروز";
        break;	

    case 'Afsaneh':
    case 'Afsane':
        fname_fa = "افسانه";
        break;	

    case 'Afsar':
        fname_fa = "افسر";
        break;	

    case 'Afsoon':
    case 'Afsoun':
    case 'Afson':
    case 'Afsun':
        fname_fa = "افسون";
        break;	

    case 'Afshan':
        fname_fa = "افشان";
        break;	

    case 'Afshar':
        fname_fa = "افشار";
        break;	

    case 'Anahid':
        fname_fa = "آناهيد";
        break;	

    case 'Andisheh':
    case 'Andishe':
        fname_fa = "انديشه";
        break;	

    case 'Anosheh':
    case 'Anoshe':
        fname_fa = "انوشه";
        break;	

    case 'Iran':
        fname_fa = "ايران";
        break;	

    case 'Irandokht':
        fname_fa = "ايراندخت";
        break;	

    case 'Banoo':
    case 'Bano':
        fname_fa = "بانو";
        break;	

    case 'Banafsheh':
    case 'Banafshe':
        fname_fa = "بنفشه";
        break;	

    case 'Bahar':
        fname_fa = "بهار";
        break;	

    case 'Bahareh':
    case 'Bahare':
        fname_fa = "بهاره";
        break;	

    case 'Baharak':
        fname_fa = "بهارک";
        break;	

    case 'Bahdis':
    case 'Behdis':
        fname_fa = "بهديس";
        break;	

    case 'Behdokht':
        fname_fa = "بهدخت";
        break;	

    case 'Behrokh':
        fname_fa = "بهرخ";
        break;	

    case 'Behshid':
        fname_fa = "بهشيد";
        break;	

    case 'Behnaz':
        fname_fa = "بهناز";
        break;	

    case 'Behnoosh':
    case 'Behnosh':
    case 'Behnoush':
    case 'Behnush':
        fname_fa = "بهنوش";
        break;	

    case 'Bita':
        fname_fa = "بيتا";
        break;	

    case 'Baran':
        fname_fa = "باران";
        break;	

    case 'Paniz':
        fname_fa = "پانيذ";
        break;	

    case 'Parmis':
        fname_fa = "پارميس";
        break;	

    case 'Padideh':
    case 'Padide':
        fname_fa = "پديده";
        break;	

    case 'Parto':
        fname_fa = "پرتو";
        break;	

    case 'Pardis':
        fname_fa = "پرديس";
        break;	

    case 'Parastoo':
    case 'Parasto':
        fname_fa = "پرستو";
        break;	

    case 'Parand':
        fname_fa = "پرند";
        break;	

    case 'Parnia':
    case 'Parniya':
    case 'Parnya':
        fname_fa = "پرنيا";
        break;	

    case 'Parnian':
    case 'Parniyan':
    case 'Parnyan':
        fname_fa = "پرنيان";
        break;	

    case 'Parvaneh':
    case 'Parvane':
        fname_fa = "پروانه";
        break;	

    case 'Parvin':
        fname_fa = "پروين";
        break;	

    case 'Pari':
        fname_fa = "پري";
        break;	

    case 'Paria':
    case 'Pariya':
    case 'Parya':
        fname_fa = "پريا";
        break;	

    case 'Parichehr':
        fname_fa = "پريچهر";
        break;	

    case 'Paridokht':
    case 'Parydokht':
        fname_fa = "پريدخت";
        break;	

    case 'Pariroo':
    case 'Pariro':
        fname_fa = "پريرو";
        break;	

    case 'Parizad':
        fname_fa = "پريزاد";
        break;	

    case 'Parisa':
        fname_fa = "پريسا";
        break;	

    case 'Parishad':
        fname_fa = "پريشاد";
        break;	

    case 'Parinaz':
        fname_fa = "پريناز";
        break;	

    case 'Parivash':
    case 'Pariwash':
        fname_fa = "پريوش";
        break;	

    case 'Pegah':
    case 'Pega':
        fname_fa = "پگاه";
        break;	

    case 'Poopak':
    case 'Poupak':
    case 'Popak':
    case 'Pupak':
        fname_fa = "پوپک";
        break;	

    case 'Pooran':
    case 'Poran':
        fname_fa = "پوران";
        break;	

    case 'Poorandokht':
    case 'Porandokht':
        fname_fa = "پوراندخت";
        break;	

    case 'Poori':
    case 'Pori':
        fname_fa = "پوري";
        break;	

    case 'Pooneh':
    case 'Poneh':
    case 'Poone':
    case 'Pone':
        fname_fa = "پونه";
        break;	

    case 'Pajhan':
    case 'Pazhhan':
        fname_fa = "پژهان";
        break;	

    case 'Peiman':
    case 'Peyman':
    case 'Paiman':
    case 'Pyman':
        fname_fa = "پيمان";
        break;	

    case 'Parmida':
        fname_fa = "پارميدا";
        break;	

    case 'Padina':
        fname_fa = "پادينا";
        break;	

    case 'Pania':
        fname_fa = "پانيا";
        break;	

    case 'Tabandeh':
    case 'Tabande':
    case 'Taabandeh':
    case 'Taabande':
        fname_fa = "تابنده";
        break;	

    case 'Taraneh':
    case 'Tarane':
        fname_fa = "ترانه";
        break;	

    case 'Tarsa':
        fname_fa = "ترسا";
        break;	

    case 'Termeh':
    case 'Terme':
        fname_fa = "ترمه";
        break;	

    case 'Tahmineh':
    case 'Tahmine':
        fname_fa = "تهمينه";
        break;	

    case 'Torang':
        fname_fa = "ترنگ";
        break;	

    case 'Toorandokht':
    case 'Torandokht':
        fname_fa = "توراندخت";
        break;	

    case 'Tina':
        fname_fa = "تينا";
        break;	

    case 'Tania':
    case 'Taniya':
    case 'Tanya':
        fname_fa = "تانيا";
        break;	

    case 'Terifeh':
    case 'Terife':
        fname_fa = "تريفه";
        break;	

    case 'Tiroj':
    case 'Tirozh':
        fname_fa = "تيروژ";
        break;	

    case 'Javan':
        fname_fa = "جوان";
        break;	

    case 'Javaneh':
    case 'Javane':
        fname_fa = "جوانه";
        break;	

    case 'Chakameh':
    case 'Chakame':
        fname_fa = "چکامه";
        break;	

    case 'Khojasteh':
    case 'Khojaste':
    case 'Khogasteh':
    case 'Khogaste':
        fname_fa = "خجسته";
        break;	

    case 'Khorshid':
        fname_fa = "خورشيد";
        break;	

    case 'Darya':
    case 'Dariya':
    case 'Daria':
        fname_fa = "دريا";
        break;	

    case 'Delaram':
        fname_fa = "دلارام";
        break;	

    case 'Delbar':
        fname_fa = "دلبر";
        break;	

    case 'Delkash':
        fname_fa = "دلکش";
        break;	

    case 'Doka':
        fname_fa = "دوکا";
        break;	

    case 'Dina':
        fname_fa = "دينا";
        break;	

    case 'Ramesh':
        fname_fa = "رامش";
        break;	

    case 'Ramina':
        fname_fa = "رامينا";
        break;	

    case 'Rasa':
        fname_fa = "رسا";
        break;	

    case 'Raha':
        fname_fa = "رها";
        break;	

    case 'Roham':
        fname_fa = "رهام";
        break;	

    case 'Roan':
        fname_fa = "روان";
        break;	

    case 'Roodabeh':
    case 'Roudabeh':
    case 'Rodabeh':
    case 'Roodabe':
    case 'Roudabe':
    case 'Rodabe':
        fname_fa = "رودابه";
        break;	

    case 'Roja':
    case 'Roga':
        fname_fa = "روجا";
        break;	

    case 'Roshanak':
        fname_fa = "روشنک";
        break;	

    case 'Ronak':
        fname_fa = "روناک";
        break;	

    case 'Roya':
        fname_fa = "رويا";
        break;	

    case 'Roksana':
        fname_fa = "رکسانا";
        break;	

    case 'Rojina':
    case 'Rozhina':
    case 'Rogina':
        fname_fa = "روژينا";
        break;	

    case 'Razan':
        fname_fa = "رازان";
        break;	

    case 'Rizan':
        fname_fa = "ريزان";
        break;	

    case 'Zari':
        fname_fa = "زري";
        break;	

    case 'Zarin':
        fname_fa = "زرين";
        break;	

    case 'Zarindokht':
        fname_fa = "زرين دخت";
        break;	

    case 'Zoya':
        fname_fa = "زويا";
        break;	

    case 'Ziba':
        fname_fa = "زيبا";
        break;	

    case 'Zina':
        fname_fa = "زينا";
        break;	

    case 'Zivar':
        fname_fa = "زيور";
        break;	

    case 'Jaleh':
    case 'Zhaleh':
    case 'Galeh':
    case 'Jale':
    case 'Zhale':
    case 'Gale':
        fname_fa = "ژاله";
        break;	

    case 'Jila':
    case 'Gila':
    case 'Zhila':
        fname_fa = "ژيلا";
        break;	

    case 'Jinar':
    case 'Ginar':
    case 'Zhinar':
        fname_fa = "ژينار";
        break;	

    case 'Jina':
    case 'Gina':
    case 'Zhina':
        fname_fa = "ژينا";
        break;	

    case 'Jino':
    case 'Gino':
    case 'Zhino':
        fname_fa = "ژينو";
        break;	

    case 'Joan':
    case 'Goan':
    case 'Zhoan':
        fname_fa = "ژوان";
        break;	

    case 'Sarina':
        fname_fa = "سارينا";
        break;	

    case 'Saghar':
        fname_fa = "ساغر";
        break;	

    case 'Sanaz':
        fname_fa = "ساناز";
        break;	

    case 'Sayeh':
    case 'Saye':
        fname_fa = "سايه";
        break;	

    case 'Sepideh':
    case 'Sepide':
        fname_fa = "سپيده";
        break;	

    case 'Setareh':
    case 'Setare':
        fname_fa = "ستاره";
        break;	

    case 'Sotodeh':
    case 'Sotode':
        fname_fa = "ستوده";
        break;	

    case 'Sargol':
        fname_fa = "سرگل";
        break;	

    case 'Sarvenaz':
    case 'Sarvnaz':
        fname_fa = "سروناز";
        break;	

    case 'Samaneh':
    case 'Samane':
        fname_fa = "سمانه";
        break;	

    case 'Soodabeh':
    case 'Sodabeh':
    case 'Soudabeh':
    case 'Soodabe':
    case 'Sodabe':
    case 'Soudabe':
    case 'Sudabeh':
    case 'Sudabe':
        fname_fa = "سودابه";
        break;	

    case 'Soori':
    case 'Souri':
    case 'Sori':
    case 'Suri':
        fname_fa = "سوري";
        break;	

    case 'Sozan':
    case 'Suzan':
        fname_fa = "سوزان";
        break;	

    case 'Soosan':
    case 'Susan':
    case 'Sosan':
        fname_fa = "سوسن";
        break;	

    case 'Sogol':
        fname_fa = "سوگل";
        break;	

    case 'Sogand':
        fname_fa = "سوگند";
        break;	

    case 'Sima':
        fname_fa = "سيما";
        break;	

    case 'Simin':
        fname_fa = "سيمين";
        break;	

    case 'Samaneh':
    case 'Samane':
        fname_fa = "سمانه";
        break;	

    case 'Sara':
        fname_fa = "سارا";
        break;	

    case 'Sahar':
        fname_fa = "سحر";
        break;	

    case 'Sareh':
    case 'Sare':
        fname_fa = "ساره";
        break;	

    case 'Servin':
    case 'Serwin':
        fname_fa = "سروين";
        break;	

    case 'Sahel':
        fname_fa = "ساحل";
        break;	

    case 'Shaparak':
        fname_fa = "شاپرک";
        break;	

    case 'Shapari':
        fname_fa = "شاپري";
        break;	

    case 'Shadan':
        fname_fa = "شادان";
        break;	

    case 'Shadi':
        fname_fa = "شادي";
        break;	

    case 'Shanar':
        fname_fa = "شانار";
        break;	

    case 'Shayesteh':
    case 'Shaieste':
    case 'Shayesteh':
    case 'Shaieste':
        fname_fa = "شايسته";
        break;	

    case 'Shabnam':
        fname_fa = "شبنم";
        break;	

    case 'Shahpar':
        fname_fa = "شهپر";
        break;	

    case 'Shima':
        fname_fa = "شيما";
        break;	

    case 'Shahrbanoo':
    case 'Shahrbano':
        fname_fa = "شهربانو";
        break;	

    case 'Shahrokh':
        fname_fa = "شهرخ";
        break;	

    case 'Shahrokh':
        fname_fa = "شاهرخ";
        break;

    case 'Shahrzad':
        fname_fa = "شهرزاد";
        break;	

    case 'Shahrnaz':
        fname_fa = "شهرناز";
        break;	

    case 'Shahnaz':
        fname_fa = "شهناز";
        break;	

    case 'Shahin':
        fname_fa = "شهين";
        break;	

    case 'Shahin':
        fname_fa = "شاهين";
        break;

    case 'Shakiba':
        fname_fa = "شکيبا";
        break;	

    case 'Shoka':
        fname_fa = "شوکا";
        break;	

    case 'Shokoufeh':
    case 'Shokoofeh':
    case 'Shokofeh':
    case 'Shokoufe':
    case 'Shokoofe':
    case 'Shokofe':
        fname_fa = "شکوفه";
        break;	

    case 'Shokouh':
    case 'Shokoh':
    case 'Shokooh':
    case 'Shoko':
    case 'Shokoo':
        fname_fa = "شکوه";
        break;	

    case 'Shida':
    case 'Sheyda':
    case 'Sheida':
    case 'Shyda':
        fname_fa = "شيدا";
        break;	

    case 'Shideh':
    case 'Shide':
        fname_fa = "شيده";
        break;	

    case 'Shirin':
        fname_fa = "شيرين";
        break;	

    case 'Shirinbanoo':
    case 'Shirinbano':
        fname_fa = "شيرين بانو";
        break;	

    case 'Shifteh':
    case 'Shifte':
        fname_fa = "شيفته";
        break;	

    case 'Shiva':
        fname_fa = "شيوا";
        break;	

    case 'Shida':
        fname_fa = "شيدا";
        break;	

    case 'Shorangiz':
    case 'Shourangiz':
    case 'Shoorangiz':
        fname_fa = "شورانگيز";
        break;	

    case 'Shamim':
        fname_fa = "شميم";
        break;	

    case 'Ghoncheh':
    case 'Ghonche':
    case 'Qoncheh':
    case 'Qonche':
        fname_fa = "غنچه";
        break;	

    case 'Ghamze':
    case 'Ghamzeh':
    case 'Qamze':
    case 'Qamzeh':
        fname_fa = "غمزه";
        break;	

    case 'Faranak':
        fname_fa = "فرانک";
        break;	

    case 'Fereshteh':
    case 'Fereshte':
        fname_fa = "فرشته";
        break;	

    case 'Foroozandeh':
    case 'Forouzandeh':
    case 'Forozandeh':
    case 'Foroozande':
    case 'Forozande':
    case 'Forouzande':
        fname_fa = "فروزنده";
        break;	

    case 'Forough':
    case 'Foroogh':
    case 'Forogh':
        fname_fa = "فروغ";
        break;	

    case 'Farnia':
    case 'Farniya':
    case 'Farnya':
        fname_fa = "فرنيا";
        break;	

    case 'Fariba':
        fname_fa = "فريبا";
        break;	

    case 'Farima':
        fname_fa = "فريما";
        break;	

    case 'Farin':
        fname_fa = "فرين";
        break;	

    case 'Farinaz':
        fname_fa = "فريناز";
        break;	

    case 'Fojan':
    case 'Fogan':
    case 'Fozhan':
        fname_fa = "فوژان";
        break;	

    case 'Firozeh':
    case 'Firoozeh':
    case 'Firouzeh':
    case 'Firoze':
    case 'Firooze':
    case 'Firouze':
        fname_fa = "فيروزه";
        break;	

    case 'Farimah':
        fname_fa = "فريماه";
        break;	

    case 'Farnosh':
    case 'Farnoosh':
    case 'Farnoush':
        fname_fa = "فرنوش";
        break;	

    case 'Foziyeh':
    case 'Fozieh':
    case 'Fozyeh':
    case 'Foziye':
    case 'Fozie':
    case 'Fozye':
        fname_fa = "فوزيه";
        break;	

    case 'Ghashang':
    case 'Qashang':
        fname_fa = "قشنگ";
        break;	

    case 'Katayon':
    case 'Katayoon':
    case 'Katayoun':
        fname_fa = "کتايون";
        break;	

    case 'Kamand':
        fname_fa = "کمند";
        break;	

    case 'Keshvar':
        fname_fa = "کشور";
        break;	

    case 'Kian':
    case 'Kiyan':
    case 'Kyan':
        fname_fa = "کيان";
        break;	

    case 'Keihan':
    case 'Keyhan':
    case 'Kyhan':
    case 'Kihan':
        fname_fa = "کيهان";
        break;	

    case 'Karim':
        fname_fa = "کريم";
        break;	

    case 'Kasra':
        fname_fa = "کسري";
        break;	

    case 'Kiana':
    case 'Kiyana':
    case 'Kyana':
        fname_fa = "کيانا";
        break;	

    case 'Ladan':
        fname_fa = "لادن";
        break;	

    case 'Laleh':
    case 'Lale':
        fname_fa = "لاله";
        break;	

    case 'Lida':
    case 'Lyda':
    case 'Leda':
        fname_fa = "ليدا";
        break;	

    case 'Leila':
    case 'Leyla':
    case 'Lyla':
        fname_fa = "ليلا";
        break;	

    case 'Layali':
        fname_fa = "ليالي";
        break;	

    case 'Lili':
    case 'Leili':
    case 'Leyli':
    case 'Lyly':
    case 'Lyli':
        fname_fa = "ليلي";
        break;	

    case 'Gordafarid':
        fname_fa = "گردآفريد";
        break;	

    case 'Gelareh':
    case 'Gelare':
        fname_fa = "گلاره";
        break;	

    case 'Galavij':
    case 'Galavizh':
        fname_fa = "گلاويژ";
        break;	

    case 'Golafrooz':
    case 'Golafroz':
    case 'Golafruz':
    case 'Golafrouz':
        fname_fa = "گل افروز";
        break;	

    case 'Golandam':
        fname_fa = "گل اندام";
        break;	

    case 'Golbanoo':
    case 'Golbano':
        fname_fa = "گلبانو";
        break;	

    case 'Golbahar':
        fname_fa = "گلبهار";
        break;	

    case 'Golabatoon':
    case 'Golabetoon':
        fname_fa = "گلابتون";
        break;	

    case 'Golbiz':
        fname_fa = "گلبيز";
        break;	

    case 'Golpa':
        fname_fa = "گلپا";
        break;	

    case 'Golpari':
        fname_fa = "گلپري";
        break;	

    case 'Golpooneh':
    case 'Golponeh':
    case 'Golpouneh':
    case 'Golpoone':
    case 'Golpone':
    case 'Golpoune':
        fname_fa = "گلپونه";
        break;	

    case 'Goltag':
    case 'Goltaj':
        fname_fa = "گلتاج";
        break;	

    case 'Goltan':
        fname_fa = "گلتن";
        break;	

    case 'Golrokh':
        fname_fa = "گلرخ";
        break;	

    case 'Golroo':
    case 'Golro':
        fname_fa = "گلرو";
        break;	

    case 'Golshan':
        fname_fa = "گلشن";
        break;	

    case 'Golshid':
        fname_fa = "گلشيد";
        break;	

    case 'Golshifteh':
    case 'Golshifte':
        fname_fa = "گلشيفته";
        break;	

    case 'Golnar':
        fname_fa = "گلنار";
        break;	

    case 'Golnaz':
        fname_fa = "گلناز";
        break;	

    case 'Golnoosh':
    case 'Golnoush':
    case 'Golnosh':
        fname_fa = "گلنوش";
        break;	

    case 'Goli':
        fname_fa = "گلي";
        break;	

    case 'Gohar':
        fname_fa = "گوهر";
        break;	

    case 'Goharshad':
        fname_fa = "گوهرشاد";
        break;	

    case 'Gita':
        fname_fa = "گيتا";
        break;	

    case 'Giti':
        fname_fa = "گيتي";
        break;	

    case 'Gisoo':
    case 'Giso':
    case 'Gisou':
        fname_fa = "گيسو";
        break;	

    case 'Gila':
        fname_fa = "گيلا";
        break;	

    case 'Gilan':
        fname_fa = "گيلان";
        break;	

    case 'Mana':
        fname_fa = "مانا";
        break;	

    case 'Mandana':
        fname_fa = "ماندانا";
        break;	

    case 'Maneli':
        fname_fa = "مانلي";
        break;	

    case 'Mahpari':
        fname_fa = "ماه پري";
        break;	

    case 'Mahchehreh':
    case 'Mahchehre':
        fname_fa = "ماه چهره";
        break;	

    case 'Mahdokht':
        fname_fa = "ماهدخت";
        break;	

    case 'Mahdokht':
        fname_fa = "مهدخت";
        break;	

    case 'Mahnoosh':
    case 'Mahnoush':
    case 'Mahnosh':
        fname_fa = "ماهنوش";
        break;	

    case 'Mahnoosh':
    case 'Mahnoush':
    case 'Mahnosh':
        fname_fa = "مهنوش";
        break;			

    case 'Mahak':
        fname_fa = "ماهک";
        break;	

    case 'Marjan':
    case 'Margan':
        fname_fa = "مرجان";
        break;	

    case 'Marjane':
    case 'Marjaneh':
        fname_fa = "مرجانه";
        break;	

    case 'Morvarid':
        fname_fa = "مرواريد";
        break;	

    case 'Mojdeh':
    case 'Mozhdeh':
    case 'Mojde':
    case 'Mozhde':
        fname_fa = "مژده";
        break;	

    case 'Mojgan':
    case 'Mozhgan':
        fname_fa = "مژگان";
        break;	

    case 'Mastaneh':
    case 'Mastane':
        fname_fa = "مستانه";
        break;	

    case 'Mona':
        fname_fa = "مونا";
        break;	

    case 'Manijeh':
    case 'Manizheh':
    case 'Manije':
    case 'Manizhe':
        fname_fa = "منيژه";
        break;	

    case 'Mahta':
        fname_fa = "مهتا";
        break;	

    case 'Mahtab':
        fname_fa = "مهتاب";
        break;	

    case 'Mahdokht':
        fname_fa = "مهدخت";
        break;	

    case 'Mahdis':
        fname_fa = "مهديس";
        break;	

    case 'Mehrazar':
        fname_fa = "مهرآذر";
        break;	

    case 'Mehrad':
        fname_fa = "مهراد";
        break;	

    case 'Mehri':
        fname_fa = "مهري";
        break;	

    case 'Mehrab':
        fname_fa = "مهراب";
        break;	

    case 'Mehrangiz':
        fname_fa = "مهرانگيز";
        break;	

    case 'Mehran':
        fname_fa = "مهران";
        break;	

    case 'Mehraneh':
    case 'Mehrane':
        fname_fa = "مهرانه";
        break;	

    case 'Mehraban':
    case 'Mehrban':
        fname_fa = "مهربان";
        break;	

    case 'Mahrokh':
        fname_fa = "مهرخ";
        break;	

    case 'Mehrsa':
        fname_fa = "مهرسا";
        break;	

    case 'Moora':
    case 'Moura':
    case 'Mora':
        fname_fa = "مورا";
        break;	

    case 'Mahzad':
    case 'Mehzad':
        fname_fa = "مهزاد";
        break;	

    case 'Mahroo':
    case 'Mahro':
        fname_fa = "مهرو";
        break;	

    case 'Mahsa':
        fname_fa = "مهسا";
        break;	

    case 'Mahasti':
        fname_fa = "مهستي";
        break;	

    case 'Mahshid':
        fname_fa = "مهشيد";
        break;	

    case 'Mahkameh':
    case 'Mahkame':
        fname_fa = "مهکامه";
        break;	

    case 'Mahin':
        fname_fa = "مهين";
        break;	

    case 'Mitra':
        fname_fa = "ميترا";
        break;		

    case 'Mina':
        fname_fa = "مينا";
        break;	

    case 'Minoo':
    case 'Mino':
        fname_fa = "مينو";
        break;	

    case 'Maryam':
        fname_fa = "مريم";
        break;	

    case 'Mahan':
        fname_fa = "ماهان";
        break;	

    case 'Morad':
        fname_fa = "مراد";
        break;	

    case 'Nazafarin':
        fname_fa = "نازآفرين";
        break;	

    case 'Nazgol':
        fname_fa = "نازگل";
        break;	

    case 'Nazanin':
        fname_fa = "نازنين";
        break;	

    case 'Nazila':
        fname_fa = "نازيلا";
        break;	

    case 'Nahid':
        fname_fa = "ناهيد";
        break;	

    case 'Narges':
        fname_fa = "نرگس";
        break;	

    case 'Nastaran':
        fname_fa = "نسترن";
        break;	

    case 'Nasrin':
        fname_fa = "نسرين";
        break;	

    case 'Negar':
        fname_fa = "نگار";
        break;	

    case 'Negin':
        fname_fa = "نگين";
        break;	

    case 'Nahal':
        fname_fa = "نهال";
        break;	

    case 'Nava':
        fname_fa = "نوا";
        break;	

    case 'Nooshafarin':
    case 'Noushafarin':
    case 'Noshafarin':
    case 'Nushafarin':
        fname_fa = "نوش آفرين";
        break;	

    case 'Vida':
        fname_fa = "ويدا";
        break;	

    case 'Vahid':
        fname_fa = "وحيد";
        break;	

    case 'Vahideh':
    case 'Vahide':
        fname_fa = "وحيده";
        break;	

    case 'Veis':
    case 'Veys':
        fname_fa = "ويس";
        break;	

    case 'Vadoud':
    case 'Vadood':
    case 'Vadod':
    case 'Vadud':
        fname_fa = "ودود";
        break;	

    case 'Nooshin':
    case 'Noushin':
    case 'Noshin':
    case 'Nushin':
        fname_fa = "نوشين";
        break;	

    case 'Niloufar':
    case 'Niloofar':
    case 'Nilofar':
        fname_fa = "نيلوفر";
        break;	

    case 'Nikoo':
    case 'Niku':
    case 'Niko':
        fname_fa = "نيکو";
        break;	

    case 'Niki':
        fname_fa = "نيکي";
        break;		

    case 'Nisha':
        fname_fa = "نيشا";
        break;	

    case 'Hasti':
        fname_fa = "هستي";
        break;	

    case 'Homa':
        fname_fa = "هما";
        break;	

    case 'Hengame':
    case 'Hengameh':
        fname_fa = "هنگامه";
        break;	

    case 'Yara':
        fname_fa = "يارا";
        break;	

    case 'Yas':
        fname_fa = "ياس";
        break;	

    case 'Yasaman':
        fname_fa = "ياسمن";
        break;	

    case 'Yasamin':
        fname_fa = "ياسمين";
        break;	

    case 'Yeganeh':
    case 'Yegane':
        fname_fa = "يگانه";
        break;	

    case 'Yekta':
        fname_fa = "يکتا";
        break;	

    case 'Yasna':
        fname_fa = "يسنا";
        break;	

    case 'Yokabed':
        fname_fa = "يوکابد";
        break;																																																																															
    default:
	fname_fa =fname.allReplace({
	'vand': 'وند', 'pour': 'پور','poor': 'پور','vali': 'ولی','far': 'فر','mand': 'مند','rad': 'راد','manesh': 'منش','Az': 'آز','az': 'آز','zadeh': 'زاده','moghadam': 'مقدم','Moein': 'معین','moein': 'معین',
	'madari': 'مداری', 'ban': 'بان','Moradi': 'مرادی','Adineh': 'آدینه','Ashtiani': 'آشتیانی','Azhand': 'آژند','Ashna': 'آشنا','Arian': 'آریان','Ashoori': 'آشوری','Ashouri': 'آشوری',
	'Ahangar': 'آهنگر', 'Ahi': 'آهی','Ayati': 'آیتی','Mehr': 'مهر','Vaseghi': 'واثقی','Avesta': 'اوستا','Vazzadh': 'واعظ زاده','Vazi': 'واعظ','Abuzar': 'ابوذر','Aboozar': 'ابوذز',
	'Abouzar': 'ابوذر', 'Ebtekar': 'ابتکار','Abrishami': 'ابریشمی','Abtahi': 'ابطحی','Adyani': 'ادیانی','Arasbanan': 'ارسباران','Ostadi': 'استادی','Ashtari': 'اشتری','Eshkavari': 'اشکوری','Isfahanian': 'اصفهانی',
	'Aslan': 'اصلان', 'Aslani': 'اصلانی','Etemad': 'اعتماد','Alam': 'اعلم','Afkhamzadeh': 'افخم زاده','Afkhami': 'افخمی','vakili': 'وکیلی','Allahyari': 'الهیاری','Elham': 'الهام','Amanat': 'امانت',
	'Amani': 'امانی', 'Amiri': 'امیری','Aminzadeh': 'امین زاده','Anvari': 'انوری','Anousheh': 'انوشه','Entezami': 'انتظامی','Imani': 'ایمانی','Ahmadi': 'احمدی','Bastan': 'باستان','Baten': 'باطن',
	'Baqcheh': 'باغچه‌', 'Bahonar': 'باهنر','Bahrain': 'بحرین','Bakhtiar': 'بختیار','Badakhsh': 'بدخش','Borzoo': 'برزویی','Bozorg': 'بزرگ‌','Bzrg': 'بزرگ‌','Behbahan': 'بهبهان','Behesht': 'بهشت','Bayg': 'بیگ','Beyg': 'بیگ',
	'nazeri': 'ناظری', 'Nazeri': 'ناظری','panah': 'پناه','Panah': 'پناه','peyvand': 'پیوند','Peyvand': 'پیوند','Hayat': 'حیات','hayat': 'حیات','Tavasol': 'توسل','tavasol': 'توسل','Tofigh': 'توفیق','tofigh': 'توفیق',
	'tvakol': 'توکل', 'Tvakol': 'توکل','Tabriz': 'تبریز','Tabriz': 'تبریز','Turk': 'ترک','turk': 'ترک','sabet': 'ثابت','Sabet': 'ثابت','Jafar': 'جعفر','jafar': 'جعفر','Jamad': 'جماد','Jamadi': 'جنتی','jamadi': 'جنتی','Jahan': 'جهان','jahan': 'جهان',
	'Chavosh': 'چاوش', 'Chegen': 'چگن','Changiz': 'چنگیز','Haer': 'حائر','Habib': 'حبیب','Hojat': 'حجت','Haqqani': 'حقانی','Haqani': 'حقانی','Hesab': 'حساب','Haqiqi': 'حقیقی','Haghighi': 'حقیقی','Hekmat': 'حکمت','hekmat': 'حکمت',
	'Hakim': 'حکیم', 'hakim': 'حکیم','hayat': 'حیات','Hayat': 'حیات','Khoini': 'خوئینی','Khatami': 'خاتمی','Khoda': 'خدا','panahi': 'پناهی','Khoram': 'خرم','Khamse': 'خمسه','Abadi': 'آبادی',
	'Davoud': 'داوود','Davood': 'داوود', 'Davar': 'داور','fard': 'فرد','dehghan': 'دهقان','Dehghan': 'دهقان','Dargah': 'درگاه','Dstghyb': 'دستغیب','dargah': 'درگاه','Zaker': 'ذاکر','Rasouli': 'رسولی','Rasooli': 'رسولی','Rahmani': 'رحمانی',
	'hemat': 'حمت', 'Nazar': 'نظر','Jamshid': 'جمشید','Nour': 'نور','Noor': 'نور','Nor': 'نور','Akbari': 'اکبری','Sohyl': 'سهیل','Soheil': 'سهیل','meisam': 'میثم','mysam': 'میثم',
	'ali': 'علی','reza': 'رضا','Sh': 'ش', 'gh': 'ق','Gh': 'ق','aa': 'ا',
	'Ramezan':'رمضان','Ahmad':'احمد','Peyman':'پیمان','Abbas':'عباس','Abdollah':'عبدالله','Reza':'رضا','Zahra':'زهرا','Moaviyye':'معاویه','Azar':'آذر','Mahmud':'محمود','Hasan':'حسن','Fateme':'فاطمه','Bahman':'بهمن','Mirza':'میرزا','Majid':'مجید','Mohammadreza':'محمد‌رضا','Ebrahim':'ابراهیم','Sima':'سیما','Gorbacof':'گورباچف','Daryush':'داریوش','Said':'سعید','Alireza':'علیرضا','Mohsen':'محسن','Esmail':'اسماعیل','Mehdi':'مهدی','Estalin':'استالین','Masud':'مسعود','Mowlana':'مولانا','Osam':'اسام','Qasem':'قاسم','Yazid':'یزید','Mohammadali':'محمد‌علی','Saddam':'صدام','Ardeshir':'اردشیر','Taqi':'تقی','Veladimir':'ولادیمیر','Yeletsin':'یلتسین','Aflatun':'افلاطون','Khosrow':'خسرو','Jafar':'جعفر','Behzad':'بهزاد','Hamidreza':'حمیدرضا','Ebnesina':'ابن‌سینا','Masih':'مسیح','Hormoz':'هرمز','Bahram':'بهرام','Jebreil':'جبرئیل','Mostafa':'مصطفی','Benladen':'بن‌لادن','Qolamreza':'غلامرضا','Shahriyar':'شهریار','Aliakbar':'علیاکبر','Kowsar':'کوثر','Moslem':'مسلم','Ruzvelt':'روزولت','Amiralmomenin':'امیر‌المؤمنین','Amirkabir':'امیرکبیر','Isa':'عیسی','Fereydun':'فریدون','Maryam':'مریم','Viliyam':'ویلیام','Arastu':'ارسطو','Hamid':'حمید','Soleyman':'سلیمان','Ataollah':'عطا‌ءالله','Marvan':'مروان','Masume':'معصومه','Mehrdad':'مهرداد','Bush':'بوش','Eqbal':'اقبال','Babak':'بابک','Bakhtiyar':'بختیار','Qabus':'قابوس','Kurosh':'کورش','Morteza':'مرتضی','Naser':'ناصر','Yaqub':'یعقوب','Mohammadhoseyn':'محمد‌حسین','Amiralmomenin':'امیرالمومنین','Osame':'اسامه','Jorj':'جورج','Kampdeyvid':'کمپ‌‌دیوید','Aslan':'اصلان','Teymur':'تیمور','Khayyam':'خیام','Shahrokh':'شاهرخ','Shahdad':'شهداد','Aliasqar':'علیاصغر','Omar':'عمر','Mokhtar':'مختار','Neron':'نرون','Sakharof':'ساخاروف','Jimz':'جیمز','Ivanof':'ایوانف','Qolamhoseyn':'غلامحسین','Abolfazl':'ابوالفضل','Iraj':'ایرج','Behnam':'بهنام','Zartosht':'زرتشت','Mojtaba':'مجتبی','Manucehr':'منوچهر','Eskandar':'اسکندر','Cercil':'چرچیل','Khashayarsha':'خشایارشا','Rahim':'رحیم','Zak':'ژاک','Seddiqe':'صدیقه','Osman':'عثمان','Kave':'کاوه','Hashem':'هاشم','Jorj':'جرج','Rabert':'رابرت','Abumoslem':'ابومسلم','Mohammadtaqi':'محمد‌تقی','Ricard':'ریچارد','Shapur':'شاپور','Asad':'اسد','Aleksander':'الکساندر','Amirfarshad':'امیرفرشاد','Bayazid':'بایزید','Rafat':'رأفت','Sepanta':'سپنتا','Salman':'سلمان','Tayyebe':'طیبه','Fathali':'فتحعلی','Kazem':'کاظم','Komeyl':'کمیل','Golaqa':'گل‌آقا','Morad':'مراد','Yaser':'یاسر','Yazdan':'یزدان','Abdorrahman':'عبدالرحمن','Mehran':'مهران','Demirel':'دمیرل','Martin':'مارتین','Lenin':'لنین','Mohammadjavad':'محمد‌جواد','Adbolaziz':'عبدالعزیز','Jalaleddin':'جلال‌الدین','Mohammadhasan':'محمد‌حسن','Bizan':'بیژن','Tahmasb':'تهماسب','Jamshid':'جمشید','Heydar':'حیدر','Tahere':'طاهره','Alipur':'علیپور','Alinaqi':'علینقی','Qolamali':'غلامعلی','Karter':'کارتر','Lale':'لاله','Lotfollah':'لطف‌الله','Marziyye':'مرضیه','Manize':'منیژه','Nasrollah':'نصرالله','Navvab':'نواب','Varahram':'ورهرام','Abitaleb':'ابیطالب','Mohammadbaqer':'محمد‌باقر','Maykel':'مایکل','Abdolkarim':'عبدالکریم','Rabin':'رابین','Karrel':'کارل','Aliyof':'علیاف','Faruq':'فاروق','Gote':'گوته','Emamkhomeyni':'امام‌خمینی','Carlz':'چارلز','Shahrzad':'شهرزاد','Abdolazim':'عبدالعظیم','Kobra':'کبری','Hamze':'حمزه','Mishel':'میشل','Baniomayye':'بنیامیه','Artur':'آرتور','Arash':'آرش','Ardavan':'اردوان','Ashraf':'اشرف','Behruz':'بهروز','Tahmine':'تهمینه','Hoseynqoli':'حسینقلی','Khashayar':'خشایار','Rivaldo':'ریوالدو','Sara':'سارا','Sepehr':'سپهر','Soqrat':'سقراط','Samira':'سمیرا','Sohrab':'سهراب','Ezzatollah':'عزت‌الله','Ganjali':'گنجعلی','Leyla':'لیلا','Nasrin':'نسرین','Hushang':'هوشنگ','Edvard':'ادوارد','Abdolmajid':'عبدالمجید','Maskhadof':'ماسخادف','Fidel':'فیدل','Zobayr':'زبیر','Gandi':'گاندی','Abaabdellah':'اباعبدالله','Shamseddin':'شمس‌‌الدین','Mandela':'ماندلا','Mahatir':'ماهاتیر','Malekhoseyn':'ملکحسین','Karlos':'کارلوس','Jamaleddin':'جمال‌الدین','Shahram':'شهرام','Ahmadshah':'احمدشاه','Ruhollah':'روح‌الله','Seyyedossohada':'سید‌‌الشهداء','Abubakr':'ابوبکر','Nikson':'نیکسون','Abuali':'ابوعلی','Ronaldo':'رونالدو','Tareq':'طارق','Hitler':'هیتلر','Davud':'داوود','Ammar':'عمار','Nasereddin':'ناصرالدین','Nasireddin':'نصیرالدین','Anahita':'آناهیتا','Asadollah':'اسدالله','Allahverdikhan':'الله‌و‌‌ردیخان','Amirqoli':'امیرقلی','Ensiyye':'انسیه','Anushiravan':'انوشیروان','Bashu':'باشو','Jahangir':'جهانگیر','Hatam':'حاتم','Hamed':'حامد','Habibollah':'حبیب‌‌الله','Daniyal':'دانیال','Rajab':'رجب','Zeynab':'زینب','Zinat':'زینت','Zozef':'ژوزف','Sattarkhan':'ستارخان','Siyamak':'سیامک','Abdoh':'عبده','Filip':'فیلیپ','Mariya':'ماریا','Nahid':'ناهید','Nasir':'نصیر','Pikaso':'پیکاسو','Abdolhamid':'عبدالحمید','Karpineski':'کارپینسکی','Abutaleb':'ابوطالب','Feranklin':'فرانکلین','Baniesrail':'بنیاسرائیل','Feransis':'فرانسیس','Luis':'لوئیس','Kheyrollah':'خیرالله','Denis':'دنیس','Khoze':'خوزه','Maradona':'مارادونا','Abuhatam':'ابوحاتم','Abusofyan':'ابوسفیان','Antoniyo':'آنتونیو','Talbot':'تالبوت','Rabinson':'رابینسون','Armin':'آرمین','Aleksander':'آلکساندر','Khaldun':'خلدون','Marjan':'مرجان','Mirmohammad':'میرمحمد','Yadollah':'یدالله','Piyaze':'پیاژه','Abdolvahed':'عبدالواحد','Marks':'مارکس','Najmeddin':'نجم‌الدین','Soheyl':'سهیل','Sekspir':'شکسپیر','Lomomba':'لومومبا','Elizabet':'الیزابت','Abdorreza':'عبدالرضا','Kiyumars':'کیومرث','Mani':'مانی','Jozef':'جوزف','Robert':'روبرت','Susan':'سوسن','Abbasali':'عباسعلی','Faramarz':'فرامرز','Mayk':'مایک','Nezamolmolk':'نظام‌الملک','Valid':'ولید','Abureyhan':'ابوریحان','Bokhtonnasr':'بخت‌النصر','Asef':'آسف','Ana':'آنا','Ahmadreza':'احمدرضا','Ommekolsum':'امکلثوم','Amirreza':'امیررضا','Anishtayn':'انیشتین','Babataher':'باباطاهر','Baysonqor':'بایسنقر','Bethoven':'بتهوون','Batul':'بتول','Belqeys':'بلقیس','Buali':'بوعلی','Bibi':'بیبی','Pardis':'پردیس','Tirdad':'تیرداد','Sorayya':'ثریا','Jebrail':'جبرائیل','Hojjat':'حجت','Hojjatollah':'حجت‌الله','Hoseynali':'حسینعلی','Heydarali':'حیدرعلی','Khodabande':'خدابنده','Khalil':'خلیل','Khaju':'خواجو','Daniyel':'دانیل','Zakariyya':'ذکریا','Rahele':'راحله','Rezashah':'رضاشاه','Roksane':'رکسانه','Roberto':'روبرتو','Ruzbeh':'روزبه','Zohre':'زهره','Zeyd':'زید','Sasan':'ساسان','Sajjad':'سجاد','Sorush':'سروش','Somayye':'سمیه','Sirus':'سیروس','Samad':'صمد','Abbasqoli':'عباس‌قلی','Abdollahebnezobayr':'عبدالله‌‌بن‌‌زبیر','Azizollah':'عزیزالله','Faeze':'فائزه','Farahnaz':'فرحناز','Farzad':'فرزاد','Farshid':'فرشید','Keykhosro':'کیخسرو','Ladan':'لادن','Lotfali':'لطفعلی','Loqman':'لقمان','Leyli':'لیلی','Mollasadra':'ملاصدرا','Mehri':'مهری','Mehryar':'مهریار','Mirdamad':'میرداماد','Mina':'مینا','Hegel':'هگل','Homa':'هما','Vahide':'وحیده','Voshmgir':'وشمگیر','Rahmatollah':'رحمت‌الله','Rezakhan':'رضاخان','Napelon':'ناپلئون','Bernard':'برنارد','Ezeddin':'عزالدین','Esfandyar':'اسفندیار','Esmit':'اسمیت','Seyfollah':'سیف‌‌الله','Sahabbas':'شاه‌‌عباس','Abdolmotalleb':'عبدالمطلب','Kopenhag':'کپنهاگ','Keristiyan':'کریستین','Hans':'هانس','Antoni':'آنتونی','Jimi':'جیمی','Dayana':'دایانا','Feredrik':'فردریک','Kant':'کانت','Natasha':'ناتاشا','Viliyamz':'ویلیامز','Sokarno':'سوکارنو','Shaqolam':'شاغلام','Abdorrahim':'عبدالرحیم','Fakhreddin':'فخرالدین','Konstantin':'کنستانتین','Harun':'هارون','Viktoriya':'ویکتوریا','Yunita':'یونیتا','Adamz':'آدامز','Albert':'آلبرت','Alberto':'آلبرتو','Zeynolabedin':'زین‌العابدین','Samuel':'ساموئل','Kamaleddin':'کمال‌‌الدین','Kamalolmolk':'کمال‌‌الملک','Malekeashtar':'مالکاشتر','Nematollah':'نعمت‌الله','Holaku':'هولاکو','Janson':'جانسون','Katrin':'کاترین','Kevin':'کوین','Mohammadkhani':'محمدخانی','Parsonz':'پارسونز','Jakson':'جکسون','Jonz':'جونز','Hekmatyar':'حکمتیار','Reygan':'ریگان','Koilo':'کوئیلو','Nureddin':'نورالدین','Nina':'نینا','Hermes':'هرمس','Borhanoddin':'برهان‌الدین','Jasem':'جاسم','Joqtay':'جغتای','Raol':'رائول','Roqayye':'رقیه','Oday':'عدی','Ferancesko':'فرانچسکو','Komar':'کومار','Nashereddinshah':'ناصرالدین‌شاه','Niyoton':'نیوتن','Ebneabbas':'ابن‌عباس','Amanollah':'امان‌الله','Bahaoddin':'بهاء‌الدین','Tacer':'تاچر','Seykholeslam':'شیخ‌‌الاسلام','Obeydollah':'عبیدالله','Kuyi':'لویی','Mandana':'ماندانا','Mazda':'مزدا','Nelson':'نلسون','Balal':'بلال','Zoliyet':'ژولیت','Shirali':'شیرعلی','Emadeddin':'عمادالدین','Fernando':'فرناندو','Fariborz':'فریبرز','Qarun':'قارون','Keriftofer':'کریستوفر','Kiyanush':'کیانوش','Makiyaveli':'ماکیاولی','Mohammadebrahim':'محمد‌ابراهیم','Mohammadkazem':'محمدکاظم','Mozaffareddin':'مظفرالدین','Nazanin':'نازنین','Arsalan':'ارسلان','Esterling':'استرلینگ','Alhasan':'الحسن','Bozorgmehr':'بزرگمهر','Geshtalt':'گشتالت','Mari':'ماری','Mohammadjafar':'محمد‌جعفر','Marvanebnehakam':'مروان‌بن‌حکم','Hani':'هانی','Yusefali':'یوسفعلی','Aqakhan':'آقاخان','Hajifiruz':'حاجیفیروز','Sadreddin':'صدرالدین','Ziyaoddin':'ضیاءالدین','Adbossalam':'عبدالسلام','Farzan':'فرزان','Qotbeddin':'قطب‌‌الدین','Kit':'کیت','Hanri':'هانری','Herbert':'هربرت','Venus':'ونوس','Atatork':'آتاتورک','Estiv':'استیو','Estiven':'استیون','Jaklandan':'جکلندن','Remi':'رمی','Roze':'روژه','Soniya':'سونیا','Safarali':'صفرعلی','Abdolqader':'عبدالقادر','Abdollahebnejafar':'عبدالله‌‌بن‌‌جعفر','Adnan':'عدنان','Alaeddin':'علاء‌‌الدین','Ferans':'فرانس','Fernandez':'فرناندز','Keristiyan':'کریستیان','Margaret':'مارگارت','Mohammadsadeq':'محمدصادق','Miler':'میلر','Atusa':'آتوسا','Azardokht':'آذردخت','Ariyan':'آرین','Asiye':'آسیه','Ayda':'آیدا','Aydin':'آیدین','Abujahl':'ابوجهل','Edris':'ادریس','Ardalan':'اردلان','Esfahbod':'اسفهبد','Afrasiyab':'افراسیاب','Eqtedarali':'اقتدارعلی','Elyas':'الیاس','Omidreza':'امیدرضا','Omidkalar':'امیدکلار','Amirahmad':'امیراحمد','Amirmohsen':'امیرمحسن','Amirnakhshab':'امیرنخشب','Amirhushang':'امیرهوشنگ','Omayye':'امیه','Ensi':'انسی','Anushe':'انوشه','Ayyub':'ایوب','Barbod':'باربد','Baduk':'بدوک','Baktash':'بکتاش','Bahador':'بهادر','Behjat':'بهجت','Behdad':'بهداد','Behran':'بهران','Behshad':'بهشاد','Behkam':'بهکام','Buda':'بودا','Parastu':'پرستو','Parvin':'پروین','Pariazar':'پریآذر','Parizad':'پریزاد','Parisa':'پریسا','Pegah':'پگاه','Puran':'پوران','Puriya':'پوریا','Piran':'پیران','Pirhasan':'پیرحسن','Tara':'تارا','Turan':'توران','Jam':'جم','Jahansuz':'جهانسوز','Jahanshah':'جهانشاه','Hesam':'حسام','Hasanreza':'حسن‌رضا','Hasanak':'حسنک','Heshmat':'حشمت','Hamdollah':'حمدالله','Hanafiyye':'حنفیه','Huriyye':'حوریه','Heydaroqli':'حیدراغلی','Khodayar':'خدایار','Khezr':'خضر','Khajenasir':'خواجه‌نصیر','Kharazmshah':'خوارزمشاه','Dorrtaj':'درتاج','Raziyye':'رضیه','Rana':'رعنا','Zardosht':'زردشت','Ziyar':'زیار','Zivar':'زیور','Zale':'ژاله','Zila':'ژیلا','Saha':'ساها','Sakine':'سکینه','Samir':'سمیر','Suren':'سورن','Soveyda':'سویدا','Siyavosh':'سیاوش','Shabak':'شاباک','Shadi':'شادی','Shahpur':'شاهپور','Shemr':'شمر','Shahnaz':'شهناز','Shahyad':'شهیاد','Sadra':'صدرا','Sadrolmoteahhelin':'صدرالمتأهلین','Safdar':'صفدر','Abdolmohammad':'عبدالمحمد','Alibaba':'علیبابا','Alimorad':'علیمراد','Emad':'عماد','Feransisko':'فرانسیسکو','Farbod':'فربد','Farnaz':'فرناز','Farimah':'فریماه','Fuziyye':'فوزیه','Kambiz':'کامبیز','Kavus':'کاووس','Kopenhak':'کپنهاک','Ketabali':'کتابعلی','Kertir':'کرتیر','Gelare':'گلاره','Golbad':'گلباد','Leonardo':'لئوناردو','Mamun':'مأمون','Maziyar':'مازیار','Moharram':'محرم','Mahmudreza':'محمودرضا','Marjane':'مرجانه','Mardavij':'مرداویج','Mostasem':'مستعصم','Motazed':'معتضد','Meqdad':'مقداد','Makdonald':'مکدونالد','Malihe':'ملیحه','Mona':'منا','Mahnaz':'مهناز','Mahvash':'مهوش','Mahindokht':'مهیندخت','Mitra':'میترا','Meysam':'میثم','Mirhoseyn':'میرحسین','Mirazizkhan':'میرعزیزخان','Miremad':'میرعماد','Najjashi':'نجاشی','Najme':'نجمه','Naqi':'نقی','Negar':'نگار','Namrud':'نمرود','Nuh':'نوح','Nowzar':'نوذر','Human':'هومن','Vadud':'ودود','Vafaazar':'وفا‌آذر','Vandad':'ونداد','Yunes':'یونس','Esi':'اسی','Batler':'باتلر','Roso':'روسو','Samakeayyar':'سمکعیار','Sharon':'شارون','Shahin':'شهین','Salahaddin':'صلاح‌‌الدین','Abdol':'عبدل','Qiyaseddin':'غیاث‌‌الدین','Faride':'فریده','Moezzeddin':'معزالدین','Haris':'هریس','Hiva':'هیوا','Abolfaraj':'ابوالفرج','Abunasr':'ابونصر','Abiabdellah':'ابیعبدالله','Aljaber':'الجابر','Alqasem':'القاسم','Patris':'پاتریس','Jalinus':'جالینوس','Janatan':'جاناتان','Hasanali':'حسن‌علی','Dorna':'درنا','Qoli':'قلی','Qanbar':'قنبر','Keristi':'کریستی','Konfusiyus':'کنفوسیوس','Keykavus':'کیکاووس','Gustav':'گوستاو','Huraman':'هورامان','Valereshtayn':'والرشتاین','Valentin':'والنتین','Yuhans':'یوهانس','Abuabdollah':'ابو‌عبدالله','Bekenbaer':'بکن‌بائر','Begovic':'بگوویچ','Donald':'دونالد','Diyego':'دیه‌گو','Zabihollah':'ذبیح‌الله','Romeo':'رومئو','Sinderela':'سیندرلا','Shahnaz':'شهنار','Seykhorrais':'شیخ‌‌الرئیس','Abdolrauf':'عبدالرئوف','Abdolmalek':'عبدالملک','Ferantes':'فرانتس','Mohiyeddin':'محیالدین','Moezzoddowle':'معزالدوله','Mehrzad':'مهرزاد','Mahin':'مهین','Nikolas':'نیکولاس','Heraklitos':'هراکلیتوس','Vatson':'واتسون','Ebnearabi':'ابن‌عربی','Abolfazlelabbas':'ابوالفضل‌العباس','Ahmadkhan':'احمدخان','Emanoel':'امانوئل','Iliya':'ایلیا','Indiyana':'ایندیانا','Barmak':'برمک','Baniabbas':'بنیعباس','Petr':'پتر','Tolstoy':'تولستوی','Janhapkinz':'جان‌هاپکینز','Janet':'جانت','Dino':'دینو','Rafael':'رافائل','Saljuq':'سلجوق','Abdolqaffar':'عبدالغفار','Aliyebneabitaleb':'علیبن‌‌ابیطالب','Alishah':'علیشاه','Farazdaq':'فرزدق','Figaro':'فیگارو','Kamyar':'کامیار','Georgi':'گئورگی','Geraham':'گراهام','Manoel':'مانوئل','Malekshah':'ملکشاه','Noman':'نعمان','Nurollah':'نورالله','Nikita':'نیکیتا','Hakan':'هاکان','Yurgan':'یورگن','Atatork':'آتاترک','Amirza':'آمیرزا','Abujafar':'ابو‌جعفر','Abolkheyr':'ابوالخیر','Abutorab':'ابوتراب','Abuhamze':'ابوحمزه','Baqerkhan':'باقرخان','Behnaz':'بهناز','Tamson':'تامسون','Teroman':'ترومن','Juliyus':'جولیوس','Rudgulit':'رودگولیت','Zanpol':'ژان‌پل','Sharafeddin':'شرف‌‌الدین','As':'عاص','Atamalek':'عطاملک','Alikhan':'علیخان','Farzin':'فرزین','Leon':'لئون','Matiyus':'ماتیوس','Majdeddin':'مجدالدین','Mohammadsaid':'محمدسعید','Norman':'نورمن','Hosham':'هشام','Vilhelm':'ویلهلم','Yashar':'یاشار','Aleks':'آلکس','Ebneasir':'ابن‌اثیر','Ebnesad':'ابن‌سعد','Abueshaq':'ابواسحاق','Abualisina':'ابوعلیسینا','Abulahab':'ابولهب','Aljavad':'الجواد','Pedram':'پدرام','Cangizkhan':'چنگیزخان','Khaledeslamboli':'خالد‌اسلامبولی','Zokond':'ژوکوند','Sudabe':'سودابه','Shahrbanu':'شهربانو','Abdolbaset':'عبدالباسط','Abdossamad':'عبدالصمد','Ozra':'عذرا','Qolamabbas':'غلام‌‌عباس','Farajollah':'فرج‌‌الله','Filips':'فیلیپس','Qodratollah':'قدرت‌‌الله','Karnaval':'کارناوال','Katayun':'کتایون','Keristof':'کریستف','Lorens':'لورنس','Mahbube':'محبوبه','Mohammadhadi':'محمدهادی','Nersi':'نرسی','Nastaran':'نسترن','Habil':'هابیل','Hajar':'هاجر','Harunorrashid':'هارون‌الرشید','Hagi':'هاگی','Abuhamed':'ابوحامد','Benali':'بن‌علی','Halime':'حلیمه','Khashayarshah':'خشایارشاه','Roknoddowle':'رکن‌الدوله','Zakariya':'زکریا','Sandbad':'سندباد','Safvan':'صفوان','Safura':'صفورا','Abdorrasul':'عبدالرسول','Emadoddowle':'عماد‌‌الدوله','Amroas':'عمروعاص','Lida':'لیدا','Moinoddin':'معین‌الدین','Muler':'مولر','Nurmohammad':'نورمحمد','Hutan':'هوتن','Valington':'ولینگتون','Vili':'ویلی','Riyamehr':'آریا‌مهر','Ebnebabevey':'ابن‌بابویه','Abujahad':'ابو‌جهاد','Abolvafa':'ابوالوفا','Abuhanife':'ابوحنیفه','Abuqarib':'ابوغریب','Arzang':'ارژنگ','Oziris':'ازیریس','Esparta':'اسپارتا','Espartakus':'اسپارتاکوس','Babaali':'باباعلی','Balzak':'بالزاک','Badri':'بدری','Boqrat':'بقراط','Taqikhan':'تقیخان','Teymurtash':'تیمورتاش','Javanshir':'جوانشیر','Caykofski':'چایکوفسکی','Hanzale':'حنظله','Sankhoze':'سان‌خوزه','Sebastiyan':'سباستین','Sezar':'سزار','Silviya':'سیلویا','Saddamhoseyn':'صدام‌‌حسین','Sorad':'صرد','Ayeshe':'عایشه','Abdollahebneobay':'عبدالله‌‌ابن‌‌ابی','Abdolvahhab':'عبدالوهاب','Aliyebneabitaleb':'علیابن‌‌ابیطالب','Enayatollah':'عنایت‌‌الله','Kohler':'کوهلر','Marta':'مارتا','Nosratollah':'نصرت‌الله','Nikolas':'نیکلاس','Nikolson':'نیکلسون','Nimayushij':'نیمایوشیج','Hayede':'هایده','Harison':'هریسون','Vangog':'ونگوگ','Vilson':'ویلسون','Yasaman':'یاسمن','Yuhanna':'یوحنا','Ebnekhaldun':'ابن‌خلدون','Ebnemoljam':'ابن‌ملجم','Abolfotuh':'ابوالفتوح','Abuhazem':'ابوحازم','Edvardo':'ادواردو','Erikson':'اریکسون','Aleks':'الکس','Alhoda':'الهدی','Ommolbanin':'ام‌البنین','Amirnezam':'امیر‌نظام','Aminozzarb':'امین‌الضرب','Batlamiyus':'بطلمیوس','Benisa':'بن‌عیسی','Patrishiya':'پاتریشیا','Pesyan':'پسیان','Jaberebnehayyan':'جابربن‌حیان','Horr':'حر','Delaram':'دلارام','Dani':'دنی','Donadoni':'دونادونی','Raja':'راجا','Reyhane':'ریحانه','Shabanali':'شعبانعلی','Zahershah':'ظاهرشاه','Zahiroleslam':'ظهیرالاسلام','Abdoljalil':'عبدالجلیل','Abdolhadi':'عبدالهادی','Feredrish':'فردریش','Fisaqures':'فیثاغورث','Kambowziya':'کامبوزیا','Kavazaki':'کاوازاکی','Kati':'کتی','Liza':'لیزا','Matiyas':'ماتیاس','Malkom':'مالکوم','Mazdak':'مزدک','Masiha':'مسیحا','Moshiroddowle':'مشیرالدوله',

	'oo': 'و', 'ja': 'ج','ka': 'کا','da': 'دا','la': 'لا','Ba': 'با','Sa': 'سا','ma': 'ما','ei': 'ی','oo': 'و',
	'eh': 'ه','ed': 'د','en': 'ن','ia': 'یا','Ou': 'و', 'ou': 'و','Gh': 'غ','sh': 'ش', 'Kh': 'خ', 'kh': 'خ', 
	'zh': 'ژ', 'Zh': 'ژ','ch': 'چ', 'Ch': 'چ', 'ph': 'ف', 'Ph': 'ف', 'a': 'ا','A': 'آ', 'b': 'ب', 'B': 'ب',
	 'c': 'س', 'C': 'س','d': 'د', 'D': 'د', 'e': '', 'E': 'ا', 'f': 'ف','F': 'ف', 'g': 'گ', 'G': 'گ', 'h': 'ح',
	  'H': 'ح','i': 'ی', 'I': 'ای', 'j': 'ج', 'J': 'ج', 'K': 'ک','k': 'ک', 'l': 'ل', 'L': 'ل', 'm': 'م', 'M': 'م',
	  'n': 'ن', 'N': 'ن', 'o': '','O': 'ا', 'p': 'پ','P': 'پ', 'q': 'غ','Q': 'ق', 'r': 'ر','R': 'ر', 's': 'س','S': 'س',
	   't': 'ت','T': 'ت','u': 'و','U': 'و' , 'w': 'و','W': 'و', 'v': 'و','V': 'و', 'x': 'ز','X': 'ز', 'y': 'ی','Y': 'ی', 
	   'z': 'ز','Z': 'ز'});
}

if(lname=='undefined'){lname_fa='p'}else{
	lname_fa =lname.allReplace({
	'vand': 'وند', 'pour': 'پور','poor': 'پور','vali': 'ولی','far': 'فر','mand': 'مند','rad': 'راد','manesh': 'منش','Az': 'آز','az': 'آز','zadeh': 'زاده','moghadam': 'مقدم','Moein': 'معین','moein': 'معین',
	'madari': 'مداری', 'ban': 'بان','Moradi': 'مرادی','Adineh': 'آدینه','Ashtiani': 'آشتیانی','Azhand': 'آژند','Ashna': 'آشنا','Arian': 'آریان','Ashoori': 'آشوری','Ashouri': 'آشوری',
	'Ahangar': 'آهنگر', 'Ahi': 'آهی','Ayati': 'آیتی','Mehr': 'مهر','Vaseghi': 'واثقی','Avesta': 'اوستا','Vazzadh': 'واعظ زاده','Vazi': 'واعظ','Abuzar': 'ابوذر','Aboozar': 'ابوذز',
	'Abouzar': 'ابوذر', 'Ebtekar': 'ابتکار','Abrishami': 'ابریشمی','Abtahi': 'ابطحی','Adyani': 'ادیانی','Arasbanan': 'ارسباران','Ostadi': 'استادی','Ashtari': 'اشتری','Eshkavari': 'اشکوری','Isfahanian': 'اصفهانی',
	'Aslan': 'اصلان', 'Aslani': 'اصلانی','Etemad': 'اعتماد','Alam': 'اعلم','Afkhamzadeh': 'افخم زاده','Afkhami': 'افخمی','vakili': 'وکیلی','Allahyari': 'الهیاری','Elham': 'الهام','Amanat': 'امانت',
	'Amani': 'امانی', 'Amiri': 'امیری','Aminzadeh': 'امین زاده','Anvari': 'انوری','Anousheh': 'انوشه','Entezami': 'انتظامی','Imani': 'ایمانی','Ahmadi': 'احمدی','Bastan': 'باستان','Baten': 'باطن',
	'Baqcheh': 'باغچه‌', 'Bahonar': 'باهنر','Bahrain': 'بحرین','Bakhtiar': 'بختیار','Badakhsh': 'بدخش','Borzoo': 'برزویی','Bozorg': 'بزرگ‌','Bzrg': 'بزرگ‌','Behbahan': 'بهبهان','Behesht': 'بهشت','Bayg': 'بیگ','Beyg': 'بیگ',
	'nazeri': 'ناظری', 'Nazeri': 'ناظری','panah': 'پناه','Panah': 'پناه','peyvand': 'پیوند','Peyvand': 'پیوند','Hayat': 'حیات','hayat': 'حیات','Tavasol': 'توسل','tavasol': 'توسل','Tofigh': 'توفیق','tofigh': 'توفیق',
	'tvakol': 'توکل', 'Tvakol': 'توکل','Tabriz': 'تبریز','Tabriz': 'تبریز','Turk': 'ترک','turk': 'ترک','sabet': 'ثابت','Sabet': 'ثابت','Jafar': 'جعفر','jafar': 'جعفر','Jamad': 'جماد','Jamadi': 'جنتی','jamadi': 'جنتی','Jahan': 'جهان','jahan': 'جهان',
	'Chavosh': 'چاوش', 'Chegen': 'چگن','Changiz': 'چنگیز','Haer': 'حائر','Habib': 'حبیب','Hojat': 'حجت','Haqqani': 'حقانی','Haqani': 'حقانی','Hesab': 'حساب','Haqiqi': 'حقیقی','Haghighi': 'حقیقی','Hekmat': 'حکمت','hekmat': 'حکمت',
	'Hakim': 'حکیم', 'hakim': 'حکیم','hayat': 'حیات','Hayat': 'حیات','Khoini': 'خوئینی','Khatami': 'خاتمی','Khoda': 'خدا','panahi': 'پناهی','Khoram': 'خرم','Khamse': 'خمسه','Abadi': 'آبادی',
	'Davoud': 'داوود','Davood': 'داوود', 'Davar': 'داور','fard': 'فرد','dehghan': 'دهقان','Dehghan': 'دهقان','Dargah': 'درگاه','Dstghyb': 'دستغیب','dargah': 'درگاه','Zaker': 'ذاکر','Rasouli': 'رسولی','Rasooli': 'رسولی','Rahmani': 'رحمانی',
	'hemat': 'حمت', 'Nazar': 'نظر','Jamshid': 'جمشید','Nour': 'نور','Noor': 'نور','Nor': 'نور','Akbari': 'اکبری','Sohyl': 'سهیل','Soheil': 'سهیل','meisam': 'میثم','mysam': 'میثم',
'Ramezan':'رمضان','Ahmad':'احمد','Peyman':'پیمان','Abbas':'عباس','Abdollah':'عبدالله','Reza':'رضا','Zahra':'زهرا','Moaviyye':'معاویه','Azar':'آذر','Mahmud':'محمود','Hasan':'حسن','Fateme':'فاطمه','Bahman':'بهمن','Mirza':'میرزا','Majid':'مجید','Mohammadreza':'محمد‌رضا','Ebrahim':'ابراهیم','Sima':'سیما','Gorbacof':'گورباچف','Daryush':'داریوش','Said':'سعید','Alireza':'علیرضا','Mohsen':'محسن','Esmail':'اسماعیل','Mehdi':'مهدی','Estalin':'استالین','Masud':'مسعود','Mowlana':'مولانا','Osam':'اسام','Qasem':'قاسم','Yazid':'یزید','Mohammadali':'محمد‌علی','Saddam':'صدام','Ardeshir':'اردشیر','Taqi':'تقی','Veladimir':'ولادیمیر','Yeletsin':'یلتسین','Aflatun':'افلاطون','Khosrow':'خسرو','Jafar':'جعفر','Behzad':'بهزاد','Hamidreza':'حمیدرضا','Ebnesina':'ابن‌سینا','Masih':'مسیح','Hormoz':'هرمز','Bahram':'بهرام','Jebreil':'جبرئیل','Mostafa':'مصطفی','Benladen':'بن‌لادن','Qolamreza':'غلامرضا','Shahriyar':'شهریار','Aliakbar':'علیاکبر','Kowsar':'کوثر','Moslem':'مسلم','Ruzvelt':'روزولت','Amiralmomenin':'امیر‌المؤمنین','Amirkabir':'امیرکبیر','Isa':'عیسی','Fereydun':'فریدون','Maryam':'مریم','Viliyam':'ویلیام','Arastu':'ارسطو','Hamid':'حمید','Soleyman':'سلیمان','Ataollah':'عطا‌ءالله','Marvan':'مروان','Masume':'معصومه','Mehrdad':'مهرداد','Bush':'بوش','Eqbal':'اقبال','Babak':'بابک','Bakhtiyar':'بختیار','Qabus':'قابوس','Kurosh':'کورش','Morteza':'مرتضی','Naser':'ناصر','Yaqub':'یعقوب','Mohammadhoseyn':'محمد‌حسین','Amiralmomenin':'امیرالمومنین','Osame':'اسامه','Jorj':'جورج','Kampdeyvid':'کمپ‌‌دیوید','Aslan':'اصلان','Teymur':'تیمور','Khayyam':'خیام','Shahrokh':'شاهرخ','Shahdad':'شهداد','Aliasqar':'علیاصغر','Omar':'عمر','Mokhtar':'مختار','Neron':'نرون','Sakharof':'ساخاروف','Jimz':'جیمز','Ivanof':'ایوانف','Qolamhoseyn':'غلامحسین','Abolfazl':'ابوالفضل','Iraj':'ایرج','Behnam':'بهنام','Zartosht':'زرتشت','Mojtaba':'مجتبی','Manucehr':'منوچهر','Eskandar':'اسکندر','Cercil':'چرچیل','Khashayarsha':'خشایارشا','Rahim':'رحیم','Zak':'ژاک','Seddiqe':'صدیقه','Osman':'عثمان','Kave':'کاوه','Hashem':'هاشم','Jorj':'جرج','Rabert':'رابرت','Abumoslem':'ابومسلم','Mohammadtaqi':'محمد‌تقی','Ricard':'ریچارد','Shapur':'شاپور','Asad':'اسد','Aleksander':'الکساندر','Amirfarshad':'امیرفرشاد','Bayazid':'بایزید','Rafat':'رأفت','Sepanta':'سپنتا','Salman':'سلمان','Tayyebe':'طیبه','Fathali':'فتحعلی','Kazem':'کاظم','Komeyl':'کمیل','Golaqa':'گل‌آقا','Morad':'مراد','Yaser':'یاسر','Yazdan':'یزدان','Abdorrahman':'عبدالرحمن','Mehran':'مهران','Demirel':'دمیرل','Martin':'مارتین','Lenin':'لنین','Mohammadjavad':'محمد‌جواد','Adbolaziz':'عبدالعزیز','Jalaleddin':'جلال‌الدین','Mohammadhasan':'محمد‌حسن','Bizan':'بیژن','Tahmasb':'تهماسب','Jamshid':'جمشید','Heydar':'حیدر','Tahere':'طاهره','Alipur':'علیپور','Alinaqi':'علینقی','Qolamali':'غلامعلی','Karter':'کارتر','Lale':'لاله','Lotfollah':'لطف‌الله','Marziyye':'مرضیه','Manize':'منیژه','Nasrollah':'نصرالله','Navvab':'نواب','Varahram':'ورهرام','Abitaleb':'ابیطالب','Mohammadbaqer':'محمد‌باقر','Maykel':'مایکل','Abdolkarim':'عبدالکریم','Rabin':'رابین','Karrel':'کارل','Aliyof':'علیاف','Faruq':'فاروق','Gote':'گوته','Emamkhomeyni':'امام‌خمینی','Carlz':'چارلز','Shahrzad':'شهرزاد','Abdolazim':'عبدالعظیم','Kobra':'کبری','Hamze':'حمزه','Mishel':'میشل','Baniomayye':'بنیامیه','Artur':'آرتور','Arash':'آرش','Ardavan':'اردوان','Ashraf':'اشرف','Behruz':'بهروز','Tahmine':'تهمینه','Hoseynqoli':'حسینقلی','Khashayar':'خشایار','Rivaldo':'ریوالدو','Sara':'سارا','Sepehr':'سپهر','Soqrat':'سقراط','Samira':'سمیرا','Sohrab':'سهراب','Ezzatollah':'عزت‌الله','Ganjali':'گنجعلی','Leyla':'لیلا','Nasrin':'نسرین','Hushang':'هوشنگ','Edvard':'ادوارد','Abdolmajid':'عبدالمجید','Maskhadof':'ماسخادف','Fidel':'فیدل','Zobayr':'زبیر','Gandi':'گاندی','Abaabdellah':'اباعبدالله','Shamseddin':'شمس‌‌الدین','Mandela':'ماندلا','Mahatir':'ماهاتیر','Malekhoseyn':'ملکحسین','Karlos':'کارلوس','Jamaleddin':'جمال‌الدین','Shahram':'شهرام','Ahmadshah':'احمدشاه','Ruhollah':'روح‌الله','Seyyedossohada':'سید‌‌الشهداء','Abubakr':'ابوبکر','Nikson':'نیکسون','Abuali':'ابوعلی','Ronaldo':'رونالدو','Tareq':'طارق','Hitler':'هیتلر','Davud':'داوود','Ammar':'عمار','Nasereddin':'ناصرالدین','Nasireddin':'نصیرالدین','Anahita':'آناهیتا','Asadollah':'اسدالله','Allahverdikhan':'الله‌و‌‌ردیخان','Amirqoli':'امیرقلی','Ensiyye':'انسیه','Anushiravan':'انوشیروان','Bashu':'باشو','Jahangir':'جهانگیر','Hatam':'حاتم','Hamed':'حامد','Habibollah':'حبیب‌‌الله','Daniyal':'دانیال','Rajab':'رجب','Zeynab':'زینب','Zinat':'زینت','Zozef':'ژوزف','Sattarkhan':'ستارخان','Siyamak':'سیامک','Abdoh':'عبده','Filip':'فیلیپ','Mariya':'ماریا','Nahid':'ناهید','Nasir':'نصیر','Pikaso':'پیکاسو','Abdolhamid':'عبدالحمید','Karpineski':'کارپینسکی','Abutaleb':'ابوطالب','Feranklin':'فرانکلین','Baniesrail':'بنیاسرائیل','Feransis':'فرانسیس','Luis':'لوئیس','Kheyrollah':'خیرالله','Denis':'دنیس','Khoze':'خوزه','Maradona':'مارادونا','Abuhatam':'ابوحاتم','Abusofyan':'ابوسفیان','Antoniyo':'آنتونیو','Talbot':'تالبوت','Rabinson':'رابینسون','Armin':'آرمین','Aleksander':'آلکساندر','Khaldun':'خلدون','Marjan':'مرجان','Mirmohammad':'میرمحمد','Yadollah':'یدالله','Piyaze':'پیاژه','Abdolvahed':'عبدالواحد','Marks':'مارکس','Najmeddin':'نجم‌الدین','Soheyl':'سهیل','Sekspir':'شکسپیر','Lomomba':'لومومبا','Elizabet':'الیزابت','Abdorreza':'عبدالرضا','Kiyumars':'کیومرث','Mani':'مانی','Jozef':'جوزف','Robert':'روبرت','Susan':'سوسن','Abbasali':'عباسعلی','Faramarz':'فرامرز','Mayk':'مایک','Nezamolmolk':'نظام‌الملک','Valid':'ولید','Abureyhan':'ابوریحان','Bokhtonnasr':'بخت‌النصر','Asef':'آسف','Ana':'آنا','Ahmadreza':'احمدرضا','Ommekolsum':'امکلثوم','Amirreza':'امیررضا','Anishtayn':'انیشتین','Babataher':'باباطاهر','Baysonqor':'بایسنقر','Bethoven':'بتهوون','Batul':'بتول','Belqeys':'بلقیس','Buali':'بوعلی','Bibi':'بیبی','Pardis':'پردیس','Tirdad':'تیرداد','Sorayya':'ثریا','Jebrail':'جبرائیل','Hojjat':'حجت','Hojjatollah':'حجت‌الله','Hoseynali':'حسینعلی','Heydarali':'حیدرعلی','Khodabande':'خدابنده','Khalil':'خلیل','Khaju':'خواجو','Daniyel':'دانیل','Zakariyya':'ذکریا','Rahele':'راحله','Rezashah':'رضاشاه','Roksane':'رکسانه','Roberto':'روبرتو','Ruzbeh':'روزبه','Zohre':'زهره','Zeyd':'زید','Sasan':'ساسان','Sajjad':'سجاد','Sorush':'سروش','Somayye':'سمیه','Sirus':'سیروس','Samad':'صمد','Abbasqoli':'عباس‌قلی','Abdollahebnezobayr':'عبدالله‌‌بن‌‌زبیر','Azizollah':'عزیزالله','Faeze':'فائزه','Farahnaz':'فرحناز','Farzad':'فرزاد','Farshid':'فرشید','Keykhosro':'کیخسرو','Ladan':'لادن','Lotfali':'لطفعلی','Loqman':'لقمان','Leyli':'لیلی','Mollasadra':'ملاصدرا','Mehri':'مهری','Mehryar':'مهریار','Mirdamad':'میرداماد','Mina':'مینا','Hegel':'هگل','Homa':'هما','Vahide':'وحیده','Voshmgir':'وشمگیر','Rahmatollah':'رحمت‌الله','Rezakhan':'رضاخان','Napelon':'ناپلئون','Bernard':'برنارد','Ezeddin':'عزالدین','Esfandyar':'اسفندیار','Esmit':'اسمیت','Seyfollah':'سیف‌‌الله','Sahabbas':'شاه‌‌عباس','Abdolmotalleb':'عبدالمطلب','Kopenhag':'کپنهاگ','Keristiyan':'کریستین','Hans':'هانس','Antoni':'آنتونی','Jimi':'جیمی','Dayana':'دایانا','Feredrik':'فردریک','Kant':'کانت','Natasha':'ناتاشا','Viliyamz':'ویلیامز','Sokarno':'سوکارنو','Shaqolam':'شاغلام','Abdorrahim':'عبدالرحیم','Fakhreddin':'فخرالدین','Konstantin':'کنستانتین','Harun':'هارون','Viktoriya':'ویکتوریا','Yunita':'یونیتا','Adamz':'آدامز','Albert':'آلبرت','Alberto':'آلبرتو','Zeynolabedin':'زین‌العابدین','Samuel':'ساموئل','Kamaleddin':'کمال‌‌الدین','Kamalolmolk':'کمال‌‌الملک','Malekeashtar':'مالکاشتر','Nematollah':'نعمت‌الله','Holaku':'هولاکو','Janson':'جانسون','Katrin':'کاترین','Kevin':'کوین','Mohammadkhani':'محمدخانی','Parsonz':'پارسونز','Jakson':'جکسون','Jonz':'جونز','Hekmatyar':'حکمتیار','Reygan':'ریگان','Koilo':'کوئیلو','Nureddin':'نورالدین','Nina':'نینا','Hermes':'هرمس','Borhanoddin':'برهان‌الدین','Jasem':'جاسم','Joqtay':'جغتای','Raol':'رائول','Roqayye':'رقیه','Oday':'عدی','Ferancesko':'فرانچسکو','Komar':'کومار','Nashereddinshah':'ناصرالدین‌شاه','Niyoton':'نیوتن','Ebneabbas':'ابن‌عباس','Amanollah':'امان‌الله','Bahaoddin':'بهاء‌الدین','Tacer':'تاچر','Seykholeslam':'شیخ‌‌الاسلام','Obeydollah':'عبیدالله','Kuyi':'لویی','Mandana':'ماندانا','Mazda':'مزدا','Nelson':'نلسون','Balal':'بلال','Zoliyet':'ژولیت','Shirali':'شیرعلی','Emadeddin':'عمادالدین','Fernando':'فرناندو','Fariborz':'فریبرز','Qarun':'قارون','Keriftofer':'کریستوفر','Kiyanush':'کیانوش','Makiyaveli':'ماکیاولی','Mohammadebrahim':'محمد‌ابراهیم','Mohammadkazem':'محمدکاظم','Mozaffareddin':'مظفرالدین','Nazanin':'نازنین','Arsalan':'ارسلان','Esterling':'استرلینگ','Alhasan':'الحسن','Bozorgmehr':'بزرگمهر','Geshtalt':'گشتالت','Mari':'ماری','Mohammadjafar':'محمد‌جعفر','Marvanebnehakam':'مروان‌بن‌حکم','Hani':'هانی','Yusefali':'یوسفعلی','Aqakhan':'آقاخان','Hajifiruz':'حاجیفیروز','Sadreddin':'صدرالدین','Ziyaoddin':'ضیاءالدین','Adbossalam':'عبدالسلام','Farzan':'فرزان','Qotbeddin':'قطب‌‌الدین','Kit':'کیت','Hanri':'هانری','Herbert':'هربرت','Venus':'ونوس','Atatork':'آتاتورک','Estiv':'استیو','Estiven':'استیون','Jaklandan':'جکلندن','Remi':'رمی','Roze':'روژه','Soniya':'سونیا','Safarali':'صفرعلی','Abdolqader':'عبدالقادر','Abdollahebnejafar':'عبدالله‌‌بن‌‌جعفر','Adnan':'عدنان','Alaeddin':'علاء‌‌الدین','Ferans':'فرانس','Fernandez':'فرناندز','Keristiyan':'کریستیان','Margaret':'مارگارت','Mohammadsadeq':'محمدصادق','Miler':'میلر','Atusa':'آتوسا','Azardokht':'آذردخت','Ariyan':'آرین','Asiye':'آسیه','Ayda':'آیدا','Aydin':'آیدین','Abujahl':'ابوجهل','Edris':'ادریس','Ardalan':'اردلان','Esfahbod':'اسفهبد','Afrasiyab':'افراسیاب','Eqtedarali':'اقتدارعلی','Elyas':'الیاس','Omidreza':'امیدرضا','Omidkalar':'امیدکلار','Amirahmad':'امیراحمد','Amirmohsen':'امیرمحسن','Amirnakhshab':'امیرنخشب','Amirhushang':'امیرهوشنگ','Omayye':'امیه','Ensi':'انسی','Anushe':'انوشه','Ayyub':'ایوب','Barbod':'باربد','Baduk':'بدوک','Baktash':'بکتاش','Bahador':'بهادر','Behjat':'بهجت','Behdad':'بهداد','Behran':'بهران','Behshad':'بهشاد','Behkam':'بهکام','Buda':'بودا','Parastu':'پرستو','Parvin':'پروین','Pariazar':'پریآذر','Parizad':'پریزاد','Parisa':'پریسا','Pegah':'پگاه','Puran':'پوران','Puriya':'پوریا','Piran':'پیران','Pirhasan':'پیرحسن','Tara':'تارا','Turan':'توران','Jam':'جم','Jahansuz':'جهانسوز','Jahanshah':'جهانشاه','Hesam':'حسام','Hasanreza':'حسن‌رضا','Hasanak':'حسنک','Heshmat':'حشمت','Hamdollah':'حمدالله','Hanafiyye':'حنفیه','Huriyye':'حوریه','Heydaroqli':'حیدراغلی','Khodayar':'خدایار','Khezr':'خضر','Khajenasir':'خواجه‌نصیر','Kharazmshah':'خوارزمشاه','Dorrtaj':'درتاج','Raziyye':'رضیه','Rana':'رعنا','Zardosht':'زردشت','Ziyar':'زیار','Zivar':'زیور','Zale':'ژاله','Zila':'ژیلا','Saha':'ساها','Sakine':'سکینه','Samir':'سمیر','Suren':'سورن','Soveyda':'سویدا','Siyavosh':'سیاوش','Shabak':'شاباک','Shadi':'شادی','Shahpur':'شاهپور','Shemr':'شمر','Shahnaz':'شهناز','Shahyad':'شهیاد','Sadra':'صدرا','Sadrolmoteahhelin':'صدرالمتأهلین','Safdar':'صفدر','Abdolmohammad':'عبدالمحمد','Alibaba':'علیبابا','Alimorad':'علیمراد','Emad':'عماد','Feransisko':'فرانسیسکو','Farbod':'فربد','Farnaz':'فرناز','Farimah':'فریماه','Fuziyye':'فوزیه','Kambiz':'کامبیز','Kavus':'کاووس','Kopenhak':'کپنهاک','Ketabali':'کتابعلی','Kertir':'کرتیر','Gelare':'گلاره','Golbad':'گلباد','Leonardo':'لئوناردو','Mamun':'مأمون','Maziyar':'مازیار','Moharram':'محرم','Mahmudreza':'محمودرضا','Marjane':'مرجانه','Mardavij':'مرداویج','Mostasem':'مستعصم','Motazed':'معتضد','Meqdad':'مقداد','Makdonald':'مکدونالد','Malihe':'ملیحه','Mona':'منا','Mahnaz':'مهناز','Mahvash':'مهوش','Mahindokht':'مهیندخت','Mitra':'میترا','Meysam':'میثم','Mirhoseyn':'میرحسین','Mirazizkhan':'میرعزیزخان','Miremad':'میرعماد','Najjashi':'نجاشی','Najme':'نجمه','Naqi':'نقی','Negar':'نگار','Namrud':'نمرود','Nuh':'نوح','Nowzar':'نوذر','Human':'هومن','Vadud':'ودود','Vafaazar':'وفا‌آذر','Vandad':'ونداد','Yunes':'یونس','Esi':'اسی','Batler':'باتلر','Roso':'روسو','Samakeayyar':'سمکعیار','Sharon':'شارون','Shahin':'شهین','Salahaddin':'صلاح‌‌الدین','Abdol':'عبدل','Qiyaseddin':'غیاث‌‌الدین','Faride':'فریده','Moezzeddin':'معزالدین','Haris':'هریس','Hiva':'هیوا','Abolfaraj':'ابوالفرج','Abunasr':'ابونصر','Abiabdellah':'ابیعبدالله','Aljaber':'الجابر','Alqasem':'القاسم','Patris':'پاتریس','Jalinus':'جالینوس','Janatan':'جاناتان','Hasanali':'حسن‌علی','Dorna':'درنا','Qoli':'قلی','Qanbar':'قنبر','Keristi':'کریستی','Konfusiyus':'کنفوسیوس','Keykavus':'کیکاووس','Gustav':'گوستاو','Huraman':'هورامان','Valereshtayn':'والرشتاین','Valentin':'والنتین','Yuhans':'یوهانس','Abuabdollah':'ابو‌عبدالله','Bekenbaer':'بکن‌بائر','Begovic':'بگوویچ','Donald':'دونالد','Diyego':'دیه‌گو','Zabihollah':'ذبیح‌الله','Romeo':'رومئو','Sinderela':'سیندرلا','Shahnaz':'شهنار','Seykhorrais':'شیخ‌‌الرئیس','Abdolrauf':'عبدالرئوف','Abdolmalek':'عبدالملک','Ferantes':'فرانتس','Mohiyeddin':'محیالدین','Moezzoddowle':'معزالدوله','Mehrzad':'مهرزاد','Mahin':'مهین','Nikolas':'نیکولاس','Heraklitos':'هراکلیتوس','Vatson':'واتسون','Ebnearabi':'ابن‌عربی','Abolfazlelabbas':'ابوالفضل‌العباس','Ahmadkhan':'احمدخان','Emanoel':'امانوئل','Iliya':'ایلیا','Indiyana':'ایندیانا','Barmak':'برمک','Baniabbas':'بنیعباس','Petr':'پتر','Tolstoy':'تولستوی','Janhapkinz':'جان‌هاپکینز','Janet':'جانت','Dino':'دینو','Rafael':'رافائل','Saljuq':'سلجوق','Abdolqaffar':'عبدالغفار','Aliyebneabitaleb':'علیبن‌‌ابیطالب','Alishah':'علیشاه','Farazdaq':'فرزدق','Figaro':'فیگارو','Kamyar':'کامیار','Georgi':'گئورگی','Geraham':'گراهام','Manoel':'مانوئل','Malekshah':'ملکشاه','Noman':'نعمان','Nurollah':'نورالله','Nikita':'نیکیتا','Hakan':'هاکان','Yurgan':'یورگن','Atatork':'آتاترک','Amirza':'آمیرزا','Abujafar':'ابو‌جعفر','Abolkheyr':'ابوالخیر','Abutorab':'ابوتراب','Abuhamze':'ابوحمزه','Baqerkhan':'باقرخان','Behnaz':'بهناز','Tamson':'تامسون','Teroman':'ترومن','Juliyus':'جولیوس','Rudgulit':'رودگولیت','Zanpol':'ژان‌پل','Sharafeddin':'شرف‌‌الدین','As':'عاص','Atamalek':'عطاملک','Alikhan':'علیخان','Farzin':'فرزین','Leon':'لئون','Matiyus':'ماتیوس','Majdeddin':'مجدالدین','Mohammadsaid':'محمدسعید','Norman':'نورمن','Hosham':'هشام','Vilhelm':'ویلهلم','Yashar':'یاشار','Aleks':'آلکس','Ebneasir':'ابن‌اثیر','Ebnesad':'ابن‌سعد','Abueshaq':'ابواسحاق','Abualisina':'ابوعلیسینا','Abulahab':'ابولهب','Aljavad':'الجواد','Pedram':'پدرام','Cangizkhan':'چنگیزخان','Khaledeslamboli':'خالد‌اسلامبولی','Zokond':'ژوکوند','Sudabe':'سودابه','Shahrbanu':'شهربانو','Abdolbaset':'عبدالباسط','Abdossamad':'عبدالصمد','Ozra':'عذرا','Qolamabbas':'غلام‌‌عباس','Farajollah':'فرج‌‌الله','Filips':'فیلیپس','Qodratollah':'قدرت‌‌الله','Karnaval':'کارناوال','Katayun':'کتایون','Keristof':'کریستف','Lorens':'لورنس','Mahbube':'محبوبه','Mohammadhadi':'محمدهادی','Nersi':'نرسی','Nastaran':'نسترن','Habil':'هابیل','Hajar':'هاجر','Harunorrashid':'هارون‌الرشید','Hagi':'هاگی','Abuhamed':'ابوحامد','Benali':'بن‌علی','Halime':'حلیمه','Khashayarshah':'خشایارشاه','Roknoddowle':'رکن‌الدوله','Zakariya':'زکریا','Sandbad':'سندباد','Safvan':'صفوان','Safura':'صفورا','Abdorrasul':'عبدالرسول','Emadoddowle':'عماد‌‌الدوله','Amroas':'عمروعاص','Lida':'لیدا','Moinoddin':'معین‌الدین','Muler':'مولر','Nurmohammad':'نورمحمد','Hutan':'هوتن','Valington':'ولینگتون','Vili':'ویلی','Riyamehr':'آریا‌مهر','Ebnebabevey':'ابن‌بابویه','Abujahad':'ابو‌جهاد','Abolvafa':'ابوالوفا','Abuhanife':'ابوحنیفه','Abuqarib':'ابوغریب','Arzang':'ارژنگ','Oziris':'ازیریس','Esparta':'اسپارتا','Espartakus':'اسپارتاکوس','Babaali':'باباعلی','Balzak':'بالزاک','Badri':'بدری','Boqrat':'بقراط','Taqikhan':'تقیخان','Teymurtash':'تیمورتاش','Javanshir':'جوانشیر','Caykofski':'چایکوفسکی','Hanzale':'حنظله','Sankhoze':'سان‌خوزه','Sebastiyan':'سباستین','Sezar':'سزار','Silviya':'سیلویا','Saddamhoseyn':'صدام‌‌حسین','Sorad':'صرد','Ayeshe':'عایشه','Abdollahebneobay':'عبدالله‌‌ابن‌‌ابی','Abdolvahhab':'عبدالوهاب','Aliyebneabitaleb':'علیابن‌‌ابیطالب','Enayatollah':'عنایت‌‌الله','Kohler':'کوهلر','Marta':'مارتا','Nosratollah':'نصرت‌الله','Nikolas':'نیکلاس','Nikolson':'نیکلسون','Nimayushij':'نیمایوشیج','Hayede':'هایده','Harison':'هریسون','Vangog':'ونگوگ','Vilson':'ویلسون','Yasaman':'یاسمن','Yuhanna':'یوحنا','Ebnekhaldun':'ابن‌خلدون','Ebnemoljam':'ابن‌ملجم','Abolfotuh':'ابوالفتوح','Abuhazem':'ابوحازم','Edvardo':'ادواردو','Erikson':'اریکسون','Aleks':'الکس','Alhoda':'الهدی','Ommolbanin':'ام‌البنین','Amirnezam':'امیر‌نظام','Aminozzarb':'امین‌الضرب','Batlamiyus':'بطلمیوس','Benisa':'بن‌عیسی','Patrishiya':'پاتریشیا','Pesyan':'پسیان','Jaberebnehayyan':'جابربن‌حیان','Horr':'حر','Delaram':'دلارام','Dani':'دنی','Donadoni':'دونادونی','Raja':'راجا','Reyhane':'ریحانه','Shabanali':'شعبانعلی','Zahershah':'ظاهرشاه','Zahiroleslam':'ظهیرالاسلام','Abdoljalil':'عبدالجلیل','Abdolhadi':'عبدالهادی','Feredrish':'فردریش','Fisaqures':'فیثاغورث','Kambowziya':'کامبوزیا','Kavazaki':'کاوازاکی','Kati':'کتی','Liza':'لیزا','Matiyas':'ماتیاس','Malkom':'مالکوم','Mazdak':'مزدک','Masiha':'مسیحا','Moshiroddowle':'مشیرالدوله',
	'oo': 'و', 'ja': 'ج','ka': 'کا','da': 'دا','la': 'لا','Ba': 'با','Sa': 'سا','ma': 'ما','ei': 'ی','oo': 'و',
	'eh': 'ه','ed': 'د','en': 'ن','ia': 'یا','Ou': 'و', 'ou': 'و','Gh': 'غ','sh': 'ش', 'Kh': 'خ', 'kh': 'خ', 
	'zh': 'ژ', 'Zh': 'ژ','ch': 'چ', 'Ch': 'چ', 'ph': 'ف', 'Ph': 'ف', 'a': 'ا','A': 'آ', 'b': 'ب', 'B': 'ب',
	 'c': 'س', 'C': 'س','d': 'د', 'D': 'د', 'e': '', 'E': 'ا', 'f': 'ف','F': 'ف', 'g': 'گ', 'G': 'گ', 'h': 'ح',
	  'H': 'ح','i': 'ی', 'I': 'ای', 'j': 'ج', 'J': 'ج', 'K': 'ک','k': 'ک', 'l': 'ل', 'L': 'ل', 'm': 'م', 'M': 'م',
	  'n': 'ن', 'N': 'ن', 'o': '','O': 'ا', 'p': 'پ','P': 'پ', 'q': 'غ','Q': 'ق', 'r': 'ر','R': 'ر', 's': 'س','S': 'س',
	   't': 'ت','T': 'ت','u': 'و','U': 'و' , 'w': 'و','W': 'و', 'v': 'و','V': 'و', 'x': 'ز','X': 'ز', 'y': 'ی','Y': 'ی', 
	   'z': 'ز','Z': 'ز'});
}
//alert(fname+'-'+lname_fa);
if(lname=='undefined'){lname_fa='';
lname='';}
tx.executeSql('INSERT INTO contact(ids,id_phone,fname,lname,display,fname_fa,lname_fa,display_fa,number,flag) values('+id+','+id_phone.id+', "'+fname+'", "'+lname+'", "'+display+'","'+fname_fa+'","'+lname_fa+'","1","'+number+'",0)');
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
  {
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
{ 
  var deferred, result = [];
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
this.deleten = function() 
{
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(function(tx) 
{
	return tx.executeSql("DELETE  from contact where number=0918" , [], function(tx, res) 
	{
		return true;
	});
});
return false;
},
////////////////////////////////////////////////////////////////////////////////////
this.endupdate = function()
  {  // alert(ss);
  var deferredx, result = [];
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
text = JSON.stringify(ssddd);
arr = JSON.parse(text);
tedad=arr.length; 

if(tedad==0){
$mdToast.show(
  $mdToast.simple()
	.textContent('لطفا یک مخاطب را انتخاب کنید!')
	.position('top')
	.hideDelay(3000)
);
}else{
$scope.mySwitch =true;
$scope.mylist =true;
$scope.myexe =false;

todoService.listm(ssddd);

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
}
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
scotchApp.controller('backup', function ($scope,todoService,$interval,$location,$routeParams,$mdToast) {
$scope.mylist =true;
$scope.loadlist=true;
var param1 = $routeParams.param1;
$scope.idphone=param1;
document.addEventListener("backbutton", function(e){
	if($location.path()=='/backup/'+param1 ){
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
text = JSON.stringify(ssddd);
arr = JSON.parse(text);
tedad=arr.length;
if(tedad==0){
$mdToast.show(
  $mdToast.simple()
	.textContent('لطفا یک مخاطب را انتخاب کنید!')
	.position('top')
	.hideDelay(3000)
);
}else{
$scope.mySwitch =true;
$scope.mylist =true;
todoService.listbac(ssddd);

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
}
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