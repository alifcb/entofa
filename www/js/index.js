
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {alert('سلام');
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

//start
var id_phone = {}; // Globally scoped object
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {// sakht db brray zakhire etelaat mokhataban	
document.getElementById('loader').style.display = 'block';
document.getElementById('demo').style.display = 'none';
document.getElementById('starter').style.display = 'none';
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(table, errorCB, successCB);
}

function table(tx){
tx.executeSql('DROP TABLE IF EXISTS contact');
//tx.executeSql('DROP TABLE IF EXISTS setting');
tx.executeSql('CREATE TABLE IF NOT EXISTS contact(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER,id_phone INTEGER, fname text,lname text,display text,fname_fa text,lname_fa text,display_fa text,number text,flag INTEGER) ');
tx.executeSql('CREATE TABLE IF NOT EXISTS setting(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title text,value text)');
tx.executeSql('CREATE TABLE IF NOT EXISTS backup(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER,id_phone INTEGER, fname text,lname text,display text,fname_fa text,lname_fa text,display_fa text,number text,flag INTEGER) ');
}

function successCB() {
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(flag_one, one_start);
}
//////////////////////////////////// مرحله سنجش فلگ بار اول
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
alert(id_phone.id);
}
}

//success db
function errorCB(err) {
    alert("Error processing SQL: "+err.message);
}


// onSuccess contacts
function onSuccess(contacts) {
var y=0;
var arr = Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','y','w','x','z','u','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','Y','W','X','Z','U');

for (var i=0; i<contacts.length; i++) {
var x=long=0;res=display='';

if(contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined ) {
var number =contacts[i].phoneNumbers[0].value;

var lname ='';
var fname ='';

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
document.getElementById('loader').style.display = 'none';
document.getElementById('demo').style.display = 'block';
document.getElementById('starter').style.display = 'block';
document.getElementById("demo").innerHTML = y;
} else {
var number =09180000000;
}
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
//function up_function(tx,fname,lname,display ) {//alert(display+'-'+fname+'-'+lname);
//tx.executeSql("UPDATE contact SET fname_fa='"+fname+"',lname_fa='"+lname+"',display_fa='"+display+"',flag=1", [], testonly, errOUT );
//}
//function testonly() {
//}
//// onError: Failed to get the contacts
// 
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