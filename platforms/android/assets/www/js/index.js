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
    onDeviceReady: function() {//alert('سلام');
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

document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
  function onOffline() {
document.getElementById('online').value=0;
}	
  function onOnline() {
document.getElementById('online').value=1;
}	

var id_phone = {}; // Globally scoped object
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {// sakht db brray zakhire etelaat mokhataban	
var db = window.openDatabase("Database", "1.0", "Cordova Namia", 200000);
db.transaction(table, errorCB, successCB);
}

function table(tx){
//tx.executeSql('DROP TABLE IF EXISTS backup');	
//tx.executeSql('DROP TABLE IF EXISTS contact');
//tx.executeSql('DROP TABLE IF EXISTS setting');
//tx.executeSql('CREATE TABLE IF NOT EXISTS contact(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER,id_phone INTEGER, fname text,lname text,display text,fname_fa text,lname_fa text,display_fa text,number text,flag INTEGER) ');
tx.executeSql('CREATE TABLE IF NOT EXISTS setting(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title text,value text)');
tx.executeSql('CREATE TABLE IF NOT EXISTS backup(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER,id_phone INTEGER, fname text,lname text,display text,fname_fa text,lname_fa text,display_fa text,number text,flag INTEGER) ');
}

function successCB() {

}
function errorCB(err) {
    alert("Error processing SQL: "+err.message);
}

//////////////////////////////////// مرحله سنجش فلگ بار اول
