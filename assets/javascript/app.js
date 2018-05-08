$(function() {

  // Config Firebase
  var config = {
    apiKey: "AIzaSyAhLe2mld-HlxtLFeRXQmJF_QxeFBPUbQo",
    authDomain: "rock-paper-scissors-4f31f.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-4f31f.firebaseio.com",
    projectId: "rock-paper-scissors-4f31f",
    storageBucket: ""
  };
  // Initialize Firebase 
  firebase.initializeApp(config);

  // Firebase database
  const dataRef = firebase.database();

  // Firebase references
  const playersRef = dataRef.ref('players')
  const turnRef = dataRef.ref('turn')
  const p1Ref = playersRef.child("1")
  const p2Ref = playersRef.child("2")
  const p1WinsRef = p1Ref.child('wins');
  const p1LossesRef = p1Ref.child('losses');
  const p2WinsRef = p2Ref.child('wins');
  const p2LossesRef = p2Ref.child('losses');

  // Initial Values
  var numPlayers = 0;
  var wins = 0;
  var losses = 0;
  var p1Clicked = ''
  var p2Clicked = ''
  var p1ClickedStatus = ''
  var p2ClickedStatus = ''
  
  // Capture Button Click
  $("#submit-button").on("click", function(event) {

    event.preventDefault();

    // Clear Firebase database
    dataRef.ref().remove()

    // Increment num of players
    numPlayers++

    // Taking text input 
    var name = $("#name").val().trim();
    var playerIndexStr = numPlayers.toString()

    // Storing in Firebase
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
    // display buttons
    var rockBtn = $('<button type="button" class="btn btn-info rock-btn">Rock</button>')
    var paperBtn = $('<button type="button" class="btn btn-info paper-btn">Paper</button>')
    var scissorsBtn = $('<button type="button" class="btn btn-info scissors-btn">Scissors</button>')
    $('.p1-panel, .p2-panel').prepend(scissorsBtn, '<br/>', paperBtn, '<br/>', rockBtn)

    // Initialize turn value
    turnRef.set(1);

    // Process click events
    playerOneTurn()
    
    // Play subsequent turns
    turnRef.on('value', function(snapshot) {
      var turn = snapshot.val();
      console.log("turn: " + turn);
      if (turn === 2) {
        playerTwoTurn()
      }
      if (turn === 3) {
        checkWinner()
 
        turnRef.set(1)
        // console.log('turnRef.val(): ' + turnRef.val())
  
        setTimeout(runGame, 4000)
      }
    });
   
    
    // turnRef.on('value', function(data) {
    //    var turn = data.val();
    //    console.log("turn: " + turn);
    //    checkWinner()
    // });

    
    // turnRef.on('child_changed', () => onUpdate(snap) {
    //   playerTwoTurn()
    // }
    // if (p2ClickedStatus) {
    //   checkWinner()
    // }

    // // Increment 'turn' count
    // var turnRef = dataRef.ref('turn')
    // turnRef.transaction(function(searches) {
    //   if (searches) {
    //     searches = searches + 1;
    //   }
    //   return (searches || 0) + 1;
    // });

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

  function playerOneTurn() {
    
    $(document).on('click', '.p1-panel .btn', function() {
      // console.log($(this).text())
     
      p1Clicked = $(this).text();
      console.log('p1Clicked: ' + p1Clicked)
      
      // Hide buttons on click
      $('.p1-panel .btn').remove()

      var p1ImageDiv = $('.p1-image')
      var p1ImageMsg = $('<p>You picked ' + p1Clicked + '!</p>')

      if (p1Clicked === 'Rock') {
        var rockImg = ('<img src="assets/images/rock.png"/>')
        p1ImageDiv.append(rockImg, p1ImageMsg)
  
      } else if (p1Clicked === 'Paper') {
        var paperImg = ('<img src="assets/images/paper.png"/>')
        p1ImageDiv.append(paperImg, p1ImageMsg)

      } else if (p1Clicked === 'Scissors') {
        var scissorsImg = ('<img src="assets/images/scissors.png"/>')
        p1ImageDiv.append(scissorsImg, p1ImageMsg)
      }

      // Increment 'turn' count
      turnRef.transaction(function(turn) {
        return (turn || 0) + 1;
      });
    })

    // Setting new playersRef child value
    // playersRef.child('1').set(newPlayer);
  }

  function playerTwoTurn() {
    console.log('playerTwoTurn has begun')
    $(document).on('click', '.p2-panel .btn', function() {
  
      p2Clicked = $(this).text();
      console.log('p2Clicked: ' + p2Clicked)

       // Hide player 2 buttons on click
      $('.p2-panel .btn').remove()

      var p2ImageDiv = $('.p2-image')
      var p2ImageMsg = $('<p>You picked ' + p2Clicked + '!</p>')

      if (p2Clicked === 'Rock') {
        var rockImg = ('<img src="assets/images/rock.png"/>')
        p2ImageDiv.append(rockImg, p2ImageMsg)
      } else if (p2Clicked === 'Paper') {
        var paperImg = ('<img src="assets/images/paper.png"/>')
        p2ImageDiv.append(paperImg, p2ImageMsg)
      } else if (p2Clicked === 'Scissors') {
        var scissorsImg = ('<img src="assets/images/scissors.png"/>')
        p2ImageDiv.append(scissorsImg, p2ImageMsg)
      }
     
      // Increment turnRef
      turnRef.transaction(function(turn) {
        return (turn || 0) + 1;
      });

    });

    
  }
  
  function checkWinner() { 
    console.log('checkWinner has begun')
    
    var p1Win = p1WinBoolean(p1Clicked, p2Clicked);
    console.log('p1Win: ' + p1Win)
    updateScore(p1Win, p1Ref, p2Ref)
  }  

    // Remember, u can order by child property's value, like values for 'word', but filter equalTo a key on the parent level
    // data = firebase.database().ref('indexCards').orderByChild('word').equalTo('noun')

    // return playersRef.orderByChild('name').equalTo('1').once('value').then(function(snapshot) {
    //   var playername = snapshot.val().name;
    //   console.log('playername')
    // });
    // resultsText.html(playername + ' wins!')

  // Accepts boolean for p1 win status. Updates html and Firebase values acordingly 
  function updateScore(p1Win, p1DataRef, p2DataRef) {
    if(p1Win === true) {

      // Increment P1 win in Firebase 
      p1WinsRef.transaction(function(wins) {
        return (wins || 0) + 1;
      });

      // Increment P2 loss in Firebase
      p2LossesRef.transaction(function(losses) {
        var increment = (losses || 0) + 1;
        return increment

        // Update score
        var lossesDiv = $('.player-2 #losses')
        lossesDiv.html(increment)
      });

      // Get Player 1 name from Firebase
      p1DataRef.once("value", function(snapshot) {
        var player1name = snapshot.child('name').val()

        // Update HTML
        var resultstext = $('.results-text')
        resultstext.text(player1name + ' wins!') 
        
        // Update score
        var winsDiv = $('.player-1 #wins')
        winsDiv.html(snapshot.child('wins').val())
        
      });
    } else if (p1Win === false) {

      // Increment P2 win in Firebase 
      p2WinsRef.transaction(function(wins) {
        return (wins || 0) + 1;
      });

      // Increment P1 loss in Firebase
      p1LossesRef.transaction(function(losses) {
        return (losses || 0) + 1;
      });
      p2DataRef.once("value", function(snapshot) {
        // Get Player 2 name from Firebase
        var player2name = snapshot.child('name').val()

        // Update HTML
        var resultstext = $('.results-text')
        resultstext.text(player2name + ' wins!') 
        
      });

    } else if (p1Win === null) {
      // Update HTML
      var resultstext = $('.results-text')
      resultstext.text('It\'s a tie!') 
    }
  }
  // Accepts two strings arguments - p1's choice and p2'choice - and return true if p1 wins, false if p1 loses
  function p1WinBoolean(p1ClickedStr, p2ClickedStr) {
    // console.log('p1ClickedStr: ' + p1ClickedStr)
    // console.log('p2ClickedStr: ' + p2ClickedStr)

    if (p1ClickedStr === 'Rock' && p2ClickedStr === 'Rock') {
      return null    
    }
    if (p1ClickedStr === 'Rock' && p2ClickedStr === 'Paper') {
      return false  
    }
    if (p1ClickedStr === 'Rock' && p2ClickedStr === 'Scissors') {
      return true  
    }
    if (p1ClickedStr === 'Paper' && p2ClickedStr === 'Rock') {
      return true
    }
    if (p1ClickedStr === 'Paper' && p2ClickedStr === 'Paper') {
      return null
    }
    if (p1ClickedStr === 'Paper' && p2ClickedStr === 'Scissors') {
      return false  
    }
    if (p1ClickedStr === 'Scissors' && p2ClickedStr === 'Rock') {
      return false
    }
    if (p1ClickedStr === 'Scissors' && p2ClickedStr === 'Paper') {
      return true
    }
    if (p1ClickedStr === 'Scissors' && p2ClickedStr === 'Scissors') {
      return null
    }
  }
    
    // Turn data will automatically increment after this function ends

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