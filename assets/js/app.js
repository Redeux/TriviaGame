//Main Function, everything inside hidden from user
$(function() {
  //Declare Variables
  let question;
  let questionIndex;
  let timerId = 0;
  let correctCount;
  const questionCatalog = [{
      question: 'Who said: \"I would have followed you, my brother...my captain...my king.\”',
      options: ['Legolas', 'Pippin', 'Aragorn', 'Boromir'],
      answer: 3,
      giphy: 'https://media.giphy.com/media/rh4OkmEydVIqY/giphy.gif'
    },
    {
      question: 'Which hobbit stabs the Witch King?',
      options: ['Frodo', 'Pippin', 'Merry', 'Sam'],
      answer: 2,
      giphy: 'https://media.giphy.com/media/SMDhTZz20D0ly/giphy.gif'
    },
    {
      question: 'Who leads Frodo and Sam to Buckleberry Ferry?',
      options: ['Farmer Maggot', 'Merry and Pippin', 'Gandalf', 'Bilbo'],
      answer:  0,
      giphy: 'https://media.giphy.com/media/PNG9yAazKn5ni/giphy.gif'
    },
    {
      question: 'Why can Arwen choose a mortal life?',
      options: ['Her immortality is tied to her Evenstar necklace, which she gives away','Galadriel, Arwen\'s grandmother used Nenya to give Arwen mortality','All elves can choose a moral life','Her family has human ancestry'],
      answer: 3,
      giphy: 'https://media.giphy.com/media/iBDseNVxjfuOk/giphy.gif'
    },
    {
      question: 'Who is Shelob?',
      options: ['An ent that befriends Pippin and Merry','A beastly spider that tried to eat Frodo and Sam','An elf queen','Uruk-hai leader'],
      answer: 1,
      giphy: 'https://media.giphy.com/media/61EAP9wvKQFiw/giphy.gif'
    },
    {
      question: 'Who said: \“I don\'t know half of you half as well as I should like, and I like less than half of you half as well as you deserve.\"' ,
      options: ['Gandalf','Merry','Pippin','Bilbo'],
      answer: 3,
      giphy: 'https://media.giphy.com/media/o1oMLAz6S8Lpm/giphy.gif'
    },
    {
      question: 'Gollum wasn\'t always Gollum. He was a hobbit of the River-folk. What was his name?',
      options: ['Daegol','Bandobras','Smeagol','Tobold'],
      answer: 2,
      giphy: 'https://media.giphy.com/media/C90oq8FWtR6UM/giphy.gif'
    },
    {
      question: 'In \"Fellowship of the Ring,\" what gift does Lady Galadriel give Gimli before the fellowship leaves Lothlorien?',
      options: ['Elvish rope','Three strands of her hair','A pint crafted from wood','A dagger'],
      answer: 1,
      giphy: 'https://media.giphy.com/media/vgwE3pV4kRiZq/giphy.gif'
    },
    {
      question: 'How many Rings of Power were forged in the second age?',
      options: [1,19,20,13],
      answer: 2,
      giphy: 'https://media.giphy.com/media/XgE4LlECZjw6k/giphy.gif'
    },
    {
      question: 'Who said: \“Nine companions. So be it. You shall be the fellowship of the ring.\”',
      options: ['Elrond','Gandalf','Aragorn','Celeborn'],
      answer: 0,
      giphy: 'https://media.giphy.com/media/yeeHsczwxqyTC/giphy.gif'
    }
  ]  
  let gameQuestionCatalog;
  let questionTotal = questionCatalog.length;

  //Stop touchscreen from doing mouse stuff
  $(document).on('touchstart', function() {

  })

  //Hover styling through JQuery since CSS :hover doesn't play nice with touchscreen
  $('#start-button, #again-button, .hover').mouseenter(function() {
    $(this).css('background', 'rgba(44, 133, 141, 0.6)')
    .css('border', '2px solid rgba(0, 64, 86, 0.6)')
    .css('font-weight', 'bold')
    .css('color', 'white');
  }).mouseleave(function() {
    $(this).css('background', 'rgba(255, 255, 203, 0.6)')
    .css('border', 'none')
    .css('font-weight', 'normal')
    .css('color', 'black');
  })
  
  //Stop touch from doing mouse stuff
  
  //Game Click Logic
  $('#start-button').click(function(event) {
    event.preventDefault();
    startNewGame();
    $('#start-button').toggleClass('invisible');
  })

  $('#again-button').click(function(event) {
    event.preventDefault();
    startNewGame();
    $('#again').toggleClass('invisible');
    $('#answer-box').toggleClass('invisible');
  })
  
  $('.option').click(function() {
    endQuestion($(this).attr('data-id'), timerId);
  })   
  
  //Functions
  function startNewGame() {
    //create a mutable array specific to this 1 game from the catalog of questions 
    gameQuestionCatalog = Array.from(questionCatalog);
    correctCount = 0;
    newQuestion();
  }

  function newQuestion() {  
    //Generate a random question
    questionIndex = Math.floor(Math.random() * gameQuestionCatalog.length);
    question = gameQuestionCatalog[questionIndex];
    //Populate question
    $('#question').text(question.question);
    //Populate the answer options
    for (let i=0; i < question.options.length; i++) {
      let activeCol = $('div[data-id=' + i + ']');
      activeCol.text(question.options[i]);
    }
    //Start the question and timer
    startQuestion(15);
  }

  function endQuestion(guess, id) {
    //Stop the timer
    clearInterval(id);
    //Remove the question from the available options
    gameQuestionCatalog.splice(questionIndex, 1);
    //Hide the question div and show the answer div
    $('#question-box').toggleClass('invisible');
    $('#answer-box').toggleClass('invisible');
    //Tell the user if they got it correct or incorrect
    if (guess == question.answer) {
      $('#answer').html($('<h2>').text('Yep!'));
      correctCount++;
    } else {
      $('#answer').html($('<h2>').text('Nope!'));
      $('#incorrect').text(question.question + ' - ' + question.options[question.answer]);
    }
    //Display the corresponding gif
    $('#image').html($('<img>').attr({
      src: question.giphy,
      'class': 'img-fluid'
    }));
    //After 5 seconds clear/hide the answer div and check to see if the game is over or go the next question
    let timeOutId = setTimeout(function() {
        $('#answer-box').toggleClass('invisible');
        $('image').html('');
        $('#incorrect').html('');
        if (gameQuestionCatalog.length > 0) {
          newQuestion();
        } else {
          endGame();
        }
      }, 5000)
  }

  function startQuestion(seconds) {
    let timeCount = seconds;
    //Populate the timer and show the question div
    $('#timer').text('Time left: ' + timeCount);
    $('#question-box').toggleClass('invisible');
    //Start and update the countdown on the page
    timerId = setInterval(function() {
      timeCount--;
      $('#timer').text('Time left: ' + timeCount);
      //If no answer is given in time submit the question with no answer
      if (timeCount === 0) endQuestion(null, timerId);
    }, 1000);  
  }

  function endGame() {
    //Show the answer div and tell the user how many out of the total questions they got correct
    $('#answer-box').toggleClass('invisible');
    $('#answer').html('You got ' + correctCount + ' out of ' + questionTotal + ' questions correct');
    //If they got 7 or more correct show them the great job gif, if not show them the 'you have no power here' gif
    if (correctCount >= 7) {
      $('#incorrect').html('Great Job!');
      $('#image').html($('<img>').attr({
        src: 'https://media.giphy.com/media/WJEtSz2gobd6M/giphy.gif',
        'class': 'img-fluid'
      }));
    } else {
      $('#incorrect').html('Better luck next time!');
      $('#image').html($('<img>').attr({
        src: 'https://media.giphy.com/media/RX3vhj311HKLe/giphy.gif',
        'class': 'img-fluid'
      }));
    }
    //make the play again button visible
    $('#again').toggleClass('invisible');

  }
});