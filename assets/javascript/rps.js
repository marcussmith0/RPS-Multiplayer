 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAgDgSdSXRvY-mD8czhSXzpyC9dELAp4tQ",
    authDomain: "rps-project-f2f6b.firebaseapp.com",
    databaseURL: "https://rps-project-f2f6b.firebaseio.com",
    projectId: "rps-project-f2f6b",
    storageBucket: "rps-project-f2f6b.appspot.com",
    messagingSenderId: "57488796692"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var playerRef = database.ref("player");

var player1 = playerRef;

var player2 = playerRef.child("2");

  $("#p1Square").hide();
  $("#p2Square").hide();

$("#add-player").on("click", function(event) {

	event.preventDefault();

  var name = $("#player-name").val().trim();

  player1.child("1").set({
    wins: 0,
    losses: 0,
    name: name
  })

    $("#p1Square").show();
	
});

$("img").on("click", function() {

  var choice = $(this).attr("class");
  var src = $(this).attr("src");

  var p1Choice = $("<img>");
  p1Choice.attr("src", src);
  p1Choice.attr("height", "60px");
  p1Choice.attr("width", "60px");

  console.log("THIS PROBABLY SHOULD BE A BOOLEN " + $("#p1Choice:has(img)"));


  $("#p1Choice").append(p1Choice);
  $("img").off();

  console.log("this is the picture " + src);

  player1.child("1").update({
    choice: choice
  })

  console.log(choice);

});

player1.on("child_added", function(snapshot) {

  $("#statusp1").html("Hello " + snapshot.val().name + " you are player 1");
  $("#p1losses").html(snapshot.val().losses);
  $("#p1wins").html(snapshot.val().wins);

  console.log("the snapshot we recieved is (line 54) " + snapshot.val().name);
  console.log("the obj has a value of: " + snapshot.val());


});
