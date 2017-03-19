$(function() {
  //Declare Variables
  var question;
  var questionIndex;
  var timerId = 0;
  var correctCount;
  var questionCatalog = [{
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
  var gameQuestionCatalog;
  var questionTotal = questionCatalog.length;

  //Game Click Logic
  $('#start-button').click(function(event){
    event.preventDefault();
    startNewGame();
    $('#start-button').toggleClass('invisible');
  })

  $('#again-button').click(function(event){
      event.preventDefault();
      startNewGame();
      $('#again').toggleClass('invisible');
      $('#answer-box').toggleClass('invisible');
  })
  
  $('.option').click(function(){
        endQuestion($(this).attr('data-id'), timerId);
  })   
  
  //Functions
  function startNewGame() {
    gameQuestionCatalog = Array.from(questionCatalog);
    correctCount = 0;
    newQuestion();
  }

  function newQuestion() {  
    //Generate a random question
    questionIndex = Math.floor(Math.random() * gameQuestionCatalog.length);
    question = gameQuestionCatalog[questionIndex];

    //Populate Question
    $('#question').text(question.question);

    //Populate Options
    for (var i=0; i < question.options.length; i++) {
      var activeCol = $('div[data-id=' + i + ']');
      activeCol.text(question.options[i]);
    }

    startQuestion(15);
  }

  function endQuestion(guess, id) {
    clearInterval(id);

    gameQuestionCatalog.splice(questionIndex, 1);

    $('#question-box').toggleClass('invisible');
    $('#answer-box').toggleClass('invisible');
    
    if (guess == question.answer) {
      $('#answer').html('<h2>Yep!</h2>');
      correctCount++;
    } else {
      $('#answer').html('<h2>Nope!</h2>');
      $('#incorrect').text(question.question + ' - ' + question.options[question.answer]);
    }

    $('#image').html('<img src=\'' + question.giphy + '\'>');

    var timeOutId = setTimeout(function() {
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
    var timeCount = seconds;
    $('#timer').text('Time left: ' + timeCount);
    $('#question-box').toggleClass('invisible');
   
    timerId = setInterval(function() {
      timeCount--;
      $('#timer').text('Time left: ' + timeCount);

      if (timeCount === 0) endQuestion(null, timerId);
    }, 1000);  
  }

  function endGame() {
    $('#answer-box').toggleClass('invisible');
    $('#answer').html('You got ' + correctCount + ' out of ' + questionTotal + ' questions correct');
    if (correctCount >= 7) {
      $('#incorrect').html('Great Job!');
      $('#image').html('<img src=\'https://media.giphy.com/media/WJEtSz2gobd6M/giphy.gif\'>');
    } else {
      $('#incorrect').html('Better luck next time!');
      $('#image').html('<img src=\'https://media.giphy.com/media/RX3vhj311HKLe/giphy.gif\'>');
    }
    $('#again').toggleClass('invisible');

  }
});