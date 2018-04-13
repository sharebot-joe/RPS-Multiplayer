
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
  var name = "";
  var wins = 0;
  var losses = 0;
  var playerOneIsReady = 0;
  var playerTwoIsReady = 0;

  // Capture Button Click
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name").val().trim();
    console.log(name)
    // Code for the push
    dataRef.ref().push({
      name: name,
      wins: wins,
      losses: losses
    });

    $(".login").hide();
  });
  
  // Functions
  function loadPlayerOne() {
  	dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().wins);
      console.log(childSnapshot.val().losses);

      // full list of items to the well
      $(".playerstatus").append("<div class='well'>Hi <span class='player-name'> " + childSnapshot.val().name +
        "! You are player </span><span>" + childSnapshot.val().id +
        " </span></div>");


      // hide waiting for playerr msg
      $('.player-1 .player-name').html(childSnapshot.val().name);

      // display score in box
      $('.player-1 .score').attr('visibility', 'visible');;
      playerOneIsReady = 0;

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  };
  function loadPlayerTwo() {
  	dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().wins);
      console.log(childSnapshot.val().losses);

      // full list of items to the well
      $(".playerstatus").append("<div class='well'>Hi <span class='player-name'> " + childSnapshot.val().name +
        "! You are player </span><span>" + childSnapshot.val().id +
        " </span></div>");


      // hide waiting for playerr msg
      $('.player-2 .player-name').html(childSnapshot.val().name);

      // display score in box
      $('.player-2 .score').attr('visibility', 'visible');;
      playerOneIsReady = 0;

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  };

  // Run main program 
  loadPlayerOne();
  loadPlayerTwo();
  while (playerOneIsReady && playerTwoIsReady) {
  	startGame();
  }

 
});