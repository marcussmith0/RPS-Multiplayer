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

var turnRef = database.ref("turn");

var playerName;
var playerNumber;

var p1Choice;
var p2Choice;

var p1Wins;
var p2Wins;
var p1Losses;
var p2Losses;

var p1Name;
var p2Name;

var tie = false;

$("#p1Square").hide();
$("#p2Square").hide();

turnRef.onDisconnect().remove();


playerRef.on("child_added",function(snapshot){

    var key = snapshot.key;

    $("#statusp"+ key).html("Hello " + snapshot.val().name + " you are player " + key);

});

playerRef.on("child_removed", function(snapshot){

    var key = snapshot.key;

    $("#statusp"+ key).html("Waiting on player " + key);

  /*  if(key == 1) {

      playerRef.child("2").update({
            wins: 0,
            losses: 0
        });


    } else if ( key == 2) {

      playerRef.child("1").update({
            wins: 0,
            losses: 0
        });


    } */

});




$("#add-player").on("click", function(e){

  e.preventDefault();

  playerName = $("#player-name").val().trim();

  assignPlayers();


});


function assignPlayers() {

  database.ref().once("value", function(snapshot) {

    var numberOfPlayers = snapshot.child("player").numChildren();


    if(numberOfPlayers == 0) {

      playerNumber = 1;

      p1Wins = 0;
      p1Losses = 0;

      $("#statusp1").html("Hello " + playerName + " you are player " + playerNumber);
      $("#p1losses").html(p1Losses);
      $("#p1wins").html(p1Wins);
      $("#player-input-form").hide();
      


      playerRef.child(playerNumber).onDisconnect().remove();

         playerRef.child(playerNumber).set({

            name: playerName,
            wins: 0,
            losses: 0

          });

         console.log(numberOfPlayers)
    

    } else if (numberOfPlayers == 1 && snapshot.child("player").val()[2] !== undefined){

        playerNumber = 1;

        p1Wins = 0;
        p1Losses = 0;

        $("#statusp1").html("Hello " + playerName + " you are player " + playerNumber);
        $("#p1losses").html(p1Losses);
        $("#p1wins").html(p1Wins);
        $("#player-input-form").hide();
        $("#p1Square").show();



        playerRef.child(playerNumber).onDisconnect().remove();

              playerRef.child(playerNumber).set({

                  name: playerName,
                  wins: 0,
                  losses: 0

              });

            turnRef.set(1);

    } else if (numberOfPlayers == 1) {

        playerNumber = 2;

        p2Wins = 0;
        p2Losses = 0;

        $("#statusp2").html("Hello " + playerName + " you are player " + playerNumber);
        $("#p2losses").html(p2Losses);
        $("#p2wins").html(p2Wins);
        $("#player-input-form").hide();
        $("#p2Square").show();


         playerRef.child(playerNumber).onDisconnect().remove();

         playerRef.child(playerNumber).set({

            name: playerName,
            wins: 0,
            losses: 0

          });

       turnRef.set(1);

    }

  });

}

turnRef.on("value",function(snapshot){

    //this gets the value of the turn key within the turn folder

    var turn = snapshot.val();

    //evalutes if the value of turn within the turn folder is 1 or not

    if(turn == 1){

      console.log("+++++++++++++++++++++++++++++++++++++++++");


      if(playerNumber == 1) {

         $("#1").removeClass("default");
         $("#1").addClass("active");

         $("#p1Square").show();

      } else if(playerNumber == 2) {

         $("#1").removeClass("default");
         $("#1").addClass("active");
         $("#p2Pics").css("display", "none");



      }


    }


    if(turn == 2){



      if(playerNumber == 1) {

        $("#2").removeClass("default");
        $("#2").addClass("active");

        $("#1").removeClass("active");
        $("#1").addClass("default");

      } else if(playerNumber == 2) {

         $("#1").removeClass("active");
         $("#1").addClass("default");

         $("#2").removeClass("default");
         $("#2").addClass("active");


         $("#p1Pics").css("display", "none");
          $("#p2Pics").css("display", "block");




      }


    }

    if(turn == 3){

      $("#middle").removeClass("middle");
      $("#middle").addClass("active");

      $("#2").removeClass("active");
      $("#2").addClass("default");

      whoWon();



    }

});


$(".paper").on("click", function() {

  playerRef.child(playerNumber).update({

        choice: "paper"

    });

  if (playerNumber == 1) {

    var playerChoiceImage = $("<img>");
    var imgSrc = $(this).attr("src");

    $("#p1Choice").attr("src", imgSrc);
    $("#p1Choice").addClass("picDem");

    turnRef.set(2);


  } else if (playerNumber == 2) {

    var playerChoiceImage = $("<img>");
    var imgSrc = $(this).attr("src");

    $("#p2Choice").attr("src", imgSrc);
    $("#p2Choice").addClass("picDem");

    turnRef.set(3);

  }




});

$(".rock").on("click", function() {

  playerRef.child(playerNumber).update({

        choice: "rock"

    });

  if (playerNumber == 1) {

    var playerChoiceImage = $("<img>");
    var imgSrc = $(this).attr("src");

    $("#p1Choice").attr("src", imgSrc);
    $("#p1Choice").addClass("picDem");

    turnRef.set(2);


  } else if (playerNumber == 2) {

    var playerChoiceImage = $("<img>");
    var imgSrc = $(this).attr("src");

    $("#p2Choice").attr("src", imgSrc);
    $("#p2Choice").addClass("picDem");

    turnRef.set(3);

  }



});

$(".scissors").on("click", function() {

  playerRef.child(playerNumber).update({

        choice: "scissors"

    });

  if (playerNumber == 1) {

    var playerChoiceImage = $("<img>");
    var imgSrc = $(this).attr("src");

    $("#p1Choice").attr("src", imgSrc);
    $("#p1Choice").addClass("picDem");

    turnRef.set(2);


  } else if (playerNumber == 2) {

    var playerChoiceImage = $("<img>");
    var imgSrc = $(this).attr("src");

    $("#p2Choice").attr("src", imgSrc);
    $("#p2Choice").addClass("picDem");

    turnRef.set(3);

  }


});

function whoWon() {

  












}