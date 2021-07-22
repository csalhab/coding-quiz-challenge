//Data (global variables, things to keep track of)=====================
//made array of objects
var quiz = [
{
    question: "Commonly used data types DO NOT include:",
    choice: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},

{
    question: "The condition in an if/else statement is enclosed within _____.",
    choice: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},

{
    question: "Arrays in JavaScript can be used to store _____.",
    choice: ["numbers and strings", "other arrays", "booleans", "all the above"],
    answer: "all the above"
},

{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choice: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
},

{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
}
];

//answer indicator, finished playing, final score message, enter initials
var rightAnswer = "Correct! 20 points added to your score! Next question ..";
var wrongAnswer = "Wrong! 10 seconds have been deducted from your time. Next question ..";
var rightAnswerLast = "Correct! 20 points added to your score! This was the last question.";
var wrongAnswerLast = "Wrong! 10 seconds have been deducted from your time. This was the last question.";
var finishedPlaying = "All done!";
var finalScoreMsg = "Your final score is ";
var enterInitials = "Enter initials:";


//secondsLeft
var secondsLeft = 60;

//seconds penalty for answering wrong
var penalty = 10;

//starting score
var score = 0;

var questionCounter = 0;

var timerInterval;

var didQuizStart = false;

//select element by class
var timeEl = document.querySelector(".time");

//select the viewHighscoresLink element that's on the top of the page
var viewHighscoresLinkEl = document.querySelector(".viewHighscoresLink");

//this returns button element, which has an id of #startQuiz and assigns it to a variable called startQuizButton
var startQuizButton = document.querySelector("#startQuiz");

//Functions============================================================

function setTime() {

    //didQuizStart = true;
    viewHighscoresLinkEl.disabled = true;

    //shows starting time
    timeEl.textContent = "Time: " + secondsLeft;

    //trigger hide header, div/p/instructions and startQuizButton
    hideStartElements();

    showQuestion(quiz[questionCounter]);

    //sets interval in variable for Time countdown
    timerInterval = setInterval(function() {
        secondsLeft--;
        //shows decrementing time
        timeEl.textContent = "Time: " + secondsLeft;
        
        if (secondsLeft === 0) {
            //shows final time of 0
            timeEl.textContent = "Time: " + secondsLeft;
            //stops execution of setInterval's actions
            clearInterval(timerInterval);
            //trigger All done!
            allDoneEnterInitials();
        }

    }, 1000); //closes setInterval, triggered every second/1000ms
} //ends setTime()

function hideStartElements() {
    var quizStartEl = document.querySelector("#quizStart");
    quizStartEl.setAttribute("style", "display: none");
    var startQuizBtnEl = document.querySelector("#startQuiz");
    startQuizBtnEl.setAttribute("style", "display: none");
}

function showQuestion(quizItem) {

    //select body element
    var bodyEl = document.querySelector("body");

    var sectionEl = document.createElement("section");
    bodyEl.appendChild(sectionEl);

    //create p tag, that's part of section, to hold question
    var pEl = document.createElement("p");
    pEl.textContent = quizItem.question;
    sectionEl.appendChild(pEl);

    //create div, that's part of section, to hold choices
    var divEl = document.createElement("div");
    divEl.setAttribute("class", "choicesDiv");
    sectionEl.appendChild(divEl);
    
    //create buttons (not ol with li's) for choices, need click event
    for (var i=0; i < quizItem.choice.length; i++) {
        var quizChoiceButton = document.createElement("button");
        quizChoiceButton.textContent = quizItem.choice[i];
        divEl.appendChild(quizChoiceButton);
        //listen for which choice button is clicked
        quizChoiceButton.addEventListener("click", function() {
            if (event.target.firstChild.data != quizItem.answer) {
                quizChoiceButton.disabled = true;
                //user selected wrong choice button
                var wrongHeading = document.createElement("h2");
                //show Wrong! or Wrong!/was last question
                if (questionCounter !== quiz.length - 1) {
                    wrongHeading.textContent = wrongAnswer;
                } else {
                    wrongHeading.textContent = wrongAnswerLast;
                }
                sectionEl.appendChild(wrongHeading);
                //apply/subtract penalty from time
                secondsLeft -= penalty;
                //show updated time after penalty applied
                timeEl.textContent = "Time: " + secondsLeft;
            } else {
                quizChoiceButton.disabled = true;
                //user selected correct choice button
                var correctHeading = document.createElement("h2");
                //show Correct! or Correct!/was last question
                if (questionCounter !== quiz.length - 1) {
                    correctHeading.textContent = rightAnswer;
                } else {
                    correctHeading.textContent = rightAnswerLast;
                }
                sectionEl.appendChild(correctHeading);
                //add 20 points to score
                score += 20;
            }
            //clear current question/choices in preparation to show next one
            clearQuestionChoices();


        });
    }

}

function clearQuestionChoices() {
    //this allows Wrong/Correct info to be displayed for a brief second before next question/choices appear
    setTimeout(function(){ 
        
        var existingSectionEl = document.querySelector("section");
        var priorQuestionChoices = document.body.removeChild(existingSectionEl);
        questionCounter += 1;
            
        if (questionCounter < quiz.length) {
            showQuestion(quiz[questionCounter]);
        } else {
            //show Enter Initials
            allDoneEnterInitials();
        }
         
    }, 1000);

}

function allDoneEnterInitials() {

    secondsLeft = 60;

    timeEl.textContent = "Time: 0";
    clearInterval(timerInterval);

    //select body element
    var bodyEl = document.querySelector("body");

    var sectionEl = document.createElement("section");
    bodyEl.appendChild(sectionEl);

    //create p tag, that's part of section, to hold All done! text
    var pAllDoneEl = document.createElement("p");
    pAllDoneEl.textContent = finishedPlaying;
    sectionEl.appendChild(pAllDoneEl);

    //create another p tag, that's part of section, to hold Your final score is #. text
    var pFinalScoreEl = document.createElement("p");
    pFinalScoreEl.textContent = finalScoreMsg + score;
    sectionEl.appendChild(pFinalScoreEl);

    //create div that's part of section, contains form for Enter Initials
    //set attributes too
    var divFormEl = document.createElement("div");
    divFormEl.setAttribute("class", "enterInitials");
    sectionEl.appendChild(divFormEl);
    var formEl = document.createElement("form");
    formEl.setAttribute("action", "");
    divFormEl.appendChild(formEl);
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "userInitials");
    labelEl.textContent = "Enter initials:"
    formEl.appendChild(labelEl);
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "userInitials");
    inputEl.setAttribute("name", "userInitials");
    formEl.appendChild(inputEl);
    var submitButtonEl = document.createElement("button");
    //submitButtonEl.setAttribute("id", "userInitials");
    submitButtonEl.setAttribute("type", "submit");
    submitButtonEl.textContent = "Submit";
    if (submitButtonEl) {
        submitButtonEl.addEventListener("click", function() {
            event.preventDefault();
            if (!inputEl.value) {
                alert("You must enter initials.");
            } else {
                localStorage.setItem("name", inputEl.value);
                localStorage.setItem("score", score);
                showHighScores(event, sectionEl);
            }
        });
    } else {
        alert('No Enter Initials submit button');
    }
    formEl.appendChild(submitButtonEl);
}

function showHighScores(event, allDoneEnterInitialsSectionEl) {

    didQuizStart = false;

    if (allDoneEnterInitialsSectionEl) {
        event.preventDefault();
        //remove All done & Enter Initials elements which are all inside section
        var sectionEl = document.body.removeChild(allDoneEnterInitialsSectionEl);
    }

    //create, setAttributes, build, place High Scores
    var bodyEl = document.querySelector("body");
    var divHighScoresEl = document.createElement("div");
    divHighScoresEl.setAttribute("class", "highscores-container");
    bodyEl.appendChild(divHighScoresEl);
    var pHighScoresEl = document.createElement("p");
    divHighScoresEl.appendChild(pHighScoresEl);
    pHighScoresEl.textContent = "Highscores";
    var olHighScoresEl = document.createElement("ol");
    divHighScoresEl.appendChild(olHighScoresEl);
    var liHighScoresEl = document.createElement("li");
    var userNameStored = localStorage.getItem("name");
    var scoreStored = localStorage.getItem("score");
    if (userNameStored === null || scoreStored === null) {
        var userNameScoreStored = "";
    } else {
        var userNameScoreStored = "#1: " + localStorage.getItem("name") + " - " + localStorage.getItem("score");
    }
    liHighScoresEl.textContent = userNameScoreStored;
    olHighScoresEl.appendChild(liHighScoresEl);
    var divHighScoresBtnsEl = document.createElement("div");
    divHighScoresBtnsEl.setAttribute("class", "divHighScoresBtns");
    bodyEl.appendChild(divHighScoresBtnsEl);
    var goBackBtnHighScoresEl = document.createElement("button");
    goBackBtnHighScoresEl.setAttribute("type", "submit");
    goBackBtnHighScoresEl.textContent = "Go back";
    divHighScoresBtnsEl.appendChild(goBackBtnHighScoresEl);
    var clearHighScoresBtnHighScoresEl = document.createElement("button");
    clearHighScoresBtnHighScoresEl.setAttribute("type", "submit");
    clearHighScoresBtnHighScoresEl.textContent = "Clear high scores";
    divHighScoresBtnsEl.appendChild(clearHighScoresBtnHighScoresEl);

    clearHighScoresBtnHighScoresEl.addEventListener("click", function() {
        liHighScoresEl.innerHTML = " ";
        localStorage.clear();
    });

    goBackBtnHighScoresEl.addEventListener("click", function() {
        var priorDivHighScoresEl = document.body.removeChild(divHighScoresEl);
        var priorDiveHighScoresBtnsEl = document.body.removeChild(divHighScoresBtnsEl);
        var quizStartEl = document.querySelector("#quizStart");
        quizStartEl.setAttribute("style", "display: inline");
        var startQuizBtnEl = document.querySelector("#startQuiz");
        startQuizBtnEl.setAttribute("style", "display: inline");
        viewHighscoresLinkEl.disabled = false;
        questionCounter = 0;
        score = 0;
    });

}

function viewHighscoresLinkElHandler(event) {
    //since already on high scores, disable button
    event.target.disabled = true;
    if (didQuizStart) {
        var existingSectionEl = document.querySelector("section");
        var priorQuestionChoices = document.body.removeChild(existingSectionEl);
    } else {
        hideStartElements();
    }
    showHighScores();
}

//User Interactions====================================================

viewHighscoresLinkEl.addEventListener("click", viewHighscoresLinkElHandler);


//Initialization=======================================================

//this adds a listener to variable startQuizButton, listening for "click" event 
//and will trigger/call setTime() function when button is clicked
startQuizButton.addEventListener("click", setTime);