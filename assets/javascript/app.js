
$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhLe2mld-HlxtLFeRXQmJF_QxeFBPUbQo",
    authDomain: "rock-paper-scissors-4f31f.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-4f31f.firebaseio.com",
    projectId: "rock-paper-scissors-4f31f",
    storageBucket: ""
  };

  firebase.initializeApp(config);
  var dataRef = firebase.database();
  // Initial Values
  var numPlayers = 0;
  var wins = 0;
  var losses = 0;
  var playerOneIsReady = 0;
  var playerTwoIsReady = 0;


  // Capture Button Click
  $("#submit-button").on("click", function(event) {
  	dataRef.ref().remove()
  	var playersRef = dataRef.ref("players");
    event.preventDefault();
    
    // Don't forget to provide initial data to your Firebase database.
    var name = $("#name").val().trim();
    console.log(name)
    var newPlayerIndex = numPlayers + 1

    playersRef.set({
    	[newPlayerIndex]: {
    		name: name,
    		wins: wins,
      	losses: losses
    	}
    });
    numPlayers++;
    $(".login").hide();
  });

  dataRef.ref().on("child_added", function(childSnapshot) {
  	console.log('childSnapshot: ' + childSnapshot.val())
  	console.log('childSnapshot.name: ' + childSnapshot.name)
  	console.log('childSnapshot.key: ' + childSnapshot.key)
  	if (childSnapshot.key === 1) {
  		loadPlayerOne(childSnapshot);
  	}
  	if (childSnapshot.key === 2) {
  		loadPlayerTwo(childSnapshot);
  	}
  }, function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
  }); 

  // Functions
  function loadPlayerOne(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val().name);
    console.log(snapshot.val().wins);
    console.log(snapshot.val().losses);

    // full list of items to the well
    $(".playerstatus").html("<div class='well'>Hi <span class='player-name'> " + snapshot.val().name +
      "! You are player </span><span>" + snapshot.key +
      " </span></div>");


    // display player name
    $('.player-1 .player-name').html(snapshot.val().name);

    // display score in box
    $('.player-1 .score').attr('visibility', 'visible');
    playerOneIsReady = 1;

  };
  // function loadPlayerTwo() {
  // 	dataRef.ref().on("child_added", function(snapshot) {

  //     // Log everything that's coming out of snapshot
  //     console.log(childSnapshot.val().name);
  //     console.log(childSnapshot.val().wins);
  //     console.log(childSnapshot.val().losses);

  //     // full list of items to the well
  //     $(".playerstatus").append("<div class='well'>Hi <span class='player-name'> " + childSnapshot.val().name +
  //       "! You are player </span><span>" + childSnapshot.val().id +
  //       " </span></div>");


  //     // hide waiting for playerr msg
  //     $('.player-2 .player-name').html(childSnapshot.val().name);

  //     // display score in box
  //     $('.player-2 .score').attr('visibility', 'visible');;
  //     playerOneIsReady = 0;

  //   // Handle the errors
  //   }, function(errorObject) {
  //     console.log("Errors handled: " + errorObject.code);
  //   });
  // };
  // function startGame() {
  // 	showButtons();
  // 	if (playerOneWins) {
  // 		name = $("#player-one").val();
	 //    console.log(name)
	 //    // Code for the push
	 //    dataRef.ref().push({
  //     name: name,
  //     wins: wins,
  //     losses: losses
  //   });
  // 	}
  // 	if (playerTwoWins) {

  // 	}
  // }
  // // Run main program 
  // // loadPlayerOne();
  // // loadPlayerTwo();
  // while (playerOneIsReady && playerTwoIsReady) {
  // 	startGame();
  // }

 
});