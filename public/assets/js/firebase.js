
// Initialize Firebase
var config = {
apiKey: "AIzaSyDl2SSNFT8RERsnZrg4WBCblH43Pdx_zko",
authDomain: "contadordeviagens.firebaseapp.com",
databaseURL: "https://contadordeviagens.firebaseio.com",
storageBucket: "contadordeviagens.appspot.com",
messagingSenderId: "192772934982"
};

//Initialize the app
firebase.initializeApp(config);

//// Get a reference to the database service
var database = firebase.database();
var now = formattedDate(new Date());
var actual_qtde = 0;

var ref = database.ref(now);

//function to add a travel
function add(evt){
	ref.on("value", function(qtde) {
	  actual_qtde = qtde.val()['qtde'];
	  
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	database.ref(now).set({
    qtde: actual_qtde + 1
  });
	
}

$(document).ready(function() {
	
	ref.on("value", function(qtde) {
		  $('#qtde_span').html(qtde.val()['qtde']);
		  
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
});


function formattedDate(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('');
}

//console.log(actual_qtde);
var submit = $('#add');

submit.click(add);
