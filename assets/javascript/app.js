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
  var p1Clicked = ''
  var p2Clicked = ''


  // Capture Button Click
  $("#submit-button").on("click", function(event) {

    event.preventDefault();

    numPlayers++

    // Taking text input and storing in Firebase
    var name = $("#name").val().trim();

    var playerIndexStr = numPlayers.toString()
    console.log('typeof(playerIndex): ' + typeof(playerIndex))
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
      runGame() // Start game when two players signed in
    }
  }, function(errorObject) {
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

  function playTurn() {
    playerOneTurn()
    playerTwoTurn()
    updateScore()
  }

  function playerOneTurn() {
    // display buttons
    var rockBtn = $('<button type="button" class="btn btn-info rock-btn">Rock</button>')
    var paperBtn = $('<button type="button" class="btn btn-info paper-btn">Paper</button>')
    var scissorsBtn = $('<button type="button" class="btn btn-info scissors-btn">Scissors</button>')
    $('.p1-panel').prepend(scissorsBtn, '<br/>', paperBtn, '<br/>', rockBtn)
    // $('.p1-panel').prepend(paperBtn)
    // $('.p1-panel').prepend(rockBtn)

    
    $(document).on('click', '.p1-panel .btn', function() {
      p1Clicked = $(this).text();
      console.log('clicked: ' + p1Clicked)
      // Hide buttons on click
      $('.p1-panel .btn').remove()

      var p1ImageDiv = $('.p1-image')
      var p1ImageMsg = $('<p>You picked ' + p1Clicked + '!</p>')

      if (p1Clicked === 'Rock') {
        var rockImg = ('<img src="assets/images/rock.png"/>')
        p1ImageDiv.append(rockImg, p1ImageMsg)

      } 
      if (p1Clicked === 'Paper') {
        var paperImg = ('<img src="assets/images/paper.png"/>')
        p1ImageDiv.append(rockImg)
      }
      if (p1Clicked === 'Scissors') {
        var scissorsImg = ('<img src="assets/images/scissors.png"/>')
        p1ImageDiv.append(scissorsImg)
      }
    });

    // Setting new playersRef child value
    // playersRef.child('1').set(newPlayer);
  }
  function playerTwoTurn() {
    // display buttons
    var rockBtn = $('<button type="button" class="btn btn-info rock-btn">Rock</button>')
    var paperBtn = $('<button type="button" class="btn btn-info paper-btn">Paper</button>')
    var scissorsBtn = $('<button type="button" class="btn btn-info scissors-btn">Scissors</button>')
    $('.p2-panel').prepend(scissorsBtn, '<br/>', paperBtn, '<br/>', rockBtn)
    // $('.p1-panel').prepend(paperBtn)
    // $('.p1-panel').prepend(rockBtn)

    
    $(document).on('click', '.p2-panel .btn', function() {
      p2Clicked = $(this).text();
      console.log('clicked: ' + p2Clicked)
      // Hide buttons on click
      $('.p2-panel .btn').remove()

      var p2ImageDiv = $('.p2-image')
      var p2ImageMsg = $('<p>You picked ' + p2Clicked + '!</p>')

      if (p2Clicked === 'Rock') {
        var rockImg = ('<img src="assets/images/rock.png"/>')
        p2ImageDiv.append(rockImg, p2ImageMsg)

      } 
      if (p2Clicked === 'Paper') {
        var paperImg = ('<img src="assets/images/paper.png"/>')
        p2ImageDiv.append(rockImg)
      }
      if (p2Clicked === 'Scissors') {
        var scissorsImg = ('<img src="assets/images/scissors.png"/>')
        p2ImageDiv.append(scissorsImg)
      }
    });

    // Setting new playersRef child value
    // playersRef.child('2').set(newPlayer);
  }
  
  function updateScore () {

    return playersRef.orderByChild('name').equalTo('1').once('value').then(function(snapshot) {
      var playername = snapshot.val().name;
      console.log('playername')
    });
    var resultsText = $('.results-text')
    resultsText.html(playername + ' wins!')

    if (p1Clicked === 'Rock' && p2Clicked === 'Rock') {

      return playersRef.orderByChild('name').equalTo('1').once('value').then(function(snapshot) {
        var playername = snapshot.val().name;
        // ...
      });


      // var p1WinsRef = playersRef.ref('1').ref('wins')
      // // p1WinsRef.once('1')
      // //   .then(function(dataSnapshot) {
      // //     winsRefvalue = dataSnapshot.val().wins
      // //   });
      // p1WinsRef.transaction(function(searches) {
      //   if (searches) {
      //     searches = searches + 1;
      //   }
      //   return (searches || 0) + 1;
      // });

      // var winner = playerRef.child('1').
      // resultsText.html('')
    }

    if (p1Clicked === 'Rock' && p2Clicked === 'Paper') {
      
    }
    if (p1Clicked === 'Rock' && p2Clicked === 'Scissors') {
      
    }
    if (p1Clicked === 'Paper' && p2Clicked === 'Rock') {

    }
    if (p1Clicked === 'Paper' && p2Clicked === 'Paper') {
      
    }
    if (p1Clicked === 'Paper' && p2Clicked === 'Scissors') {
      
    }
    if (p1Clicked === 'Scissors' && p2Clicked === 'Rock') {

    }
    if (p1Clicked === 'Scissors' && p2Clicked === 'Paper') {
      
    }
    if (p1Clicked === 'Scissors' && p2Clicked === 'Scissors') {
      
    }

    // Turn data will automatically increment after this function ends
  }
  // function startGame() {
  //  showButtons();
  //  if (playerOneWins) {
  //    name = $("#player-one").val();
  //    console.log(name)
  //    // Code for the push
  //    dataRef.ref().push({
  //     name: name,
  //     wins: wins,
  //     losses: losses
  //   });
  //  }
  //  if (playerTwoWins) {

  //  }
  // }
  // Run main program 
  // loadPlayerOne();
  // loadPlayerTwo();

  // startGame();
  // while (playerOneIsReady && playerTwoIsReady) {
  //  startGame();
  // }


});