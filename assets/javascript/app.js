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
  dataRef.ref().remove()
  var playersRef = dataRef.ref('players')

  // Initial Values
  var numPlayers = 0;
  var wins = 0;
  var losses = 0;
  

  // Capture Button Click
  $("#submit-button").on("click", function(event) {
  	
  	event.preventDefault();

    numPlayers++
    
    // Taking text input and storing in Firebase
    var name = $("#name").val().trim();
    
    var playerIndexStr = numPlayers.toString()
    console.log ('typeof(playerIndex): ' + typeof(playerIndex))
    var newPlayer = {
        name: name,
        wins: wins,
        losses: losses
      }

    playersRef.child(playerIndexStr).set(newPlayer);

    // Clearing input text
    $('.login').val('');

    // if (numPlayers === 2) {
    //   $(".login").hide();
    // }
  
  });

  playersRef.on("child_added", function(childSnapshot) {
  	console.log('childSnapshot: ' + childSnapshot.val())
  	console.log('childSnapshot.name: ' + childSnapshot.name)
  	console.log('childSnapshot.key: ' + childSnapshot.key)
  	if (childSnapshot.key === '1') {
  		loadPlayerOne(childSnapshot);
  	}
  	if (childSnapshot.key === '2') {
  		loadPlayerTwo(childSnapshot);
      runGame()  // Start game when two players signed in
  	}
  }, function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
  }); 

  // Functions
  function loadPlayerOne(snapshot) {
    // Log everything that's coming out of snapshot

    var playerName = snapshot.val().name;
    var playerNum = snapshot.key
    
    console.log('loading playerName: ' + playerName);
    console.log('loading playerNum: ' + playerNum);

    // full list of items to the well
    $(".playerstatus").html("<div class='well'>Hi <span class='player-name'> " + playerName +
      "! You are player </span><span>" + playerNum +
      " </span></div>");

    // display player name
    $('.player-1 .player-name').html(playerName);

    // display score in box
    $('.player-1 .score').css('visibility', 'visible');

    // Hide text input on submit
    // $(".login").hide();
  }

  function loadPlayerTwo(snapshot) {
    // Log everything that's coming out of snapshot

    var playerName = snapshot.val().name;
    var playerNum = snapshot.key
    
    console.log('loading playerName: ' + playerName);
    console.log('loading playerNum: ' + playerNum);

    // full list of items to the well
    $(".playerstatus").html("<div class='well'>Hi <span class='player-name'> " + playerName +
      "! You are player </span><span>" + playerNum +
      " </span></div>");

    // display player name
    $('.player-2 .player-name').html(playerName);

    // display score in box
    $('.player-2 .score').css('visibility', 'visible');
    $(".login").hide();
  }
  function runGame() {
    var turnRef = dataRef.ref('turn')

    playTurn()

    // Increment 'turn' count
    turnRef.transaction(function(searches) {
      if (searches) {
        searches = searches + 1;
      }
      return (searches || 0) + 1;
    });

    // while(numPlayers > 1) {
    //   playTurn()

    //   // Increment 'turn' count
    //   turnRef.transaction(function(searches) {
    //     if (searches) {
    //       searches = searches + 1;
    //     }
    //     return (searches || 0) + 1;
    //   });
    // }
  }
  function playTurn () {
  	playerOneTurn()
    // playerTwoTurn()
    // updateScore()
    
  }
  function playerOneTurn() {
    // display buttons
    console.log('time to display buttons')
    var rockBtn = $('<button type="button" class="btn btn-info rock-btn">Rock</button>')
    var paperBtn = $('<button type="button" class="btn btn-info paper-btn">Paper</button>')
    var scissorsBtn = $('<button type="button" class="btn btn-info scissors-btn">Scissors</button>')
    $('.p1-panel').prepend(scissorsBtn, '<br/>', paperBtn, '<br/>', rockBtn)
    // $('.p1-panel').prepend(paperBtn)
    // $('.p1-panel').prepend(rockBtn)

    // playersRef.child(playerIndexStr).set(newPlayer);

  }
  $(document).on('click', '.scissors-btn', function() {
    console.log('scissors btn clicked')
  });
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
  // Run main program 
  // loadPlayerOne();
  // loadPlayerTwo();
  
  // startGame();
  // while (playerOneIsReady && playerTwoIsReady) {
  // 	startGame();
  // }

 
});