var myQuestions = [
    {
        question: "What is HTML stand for",
        answers: {
            a: 'HYPER TEXT MARKUP LANGUAGE',
            b: 'HYPER LINK MAILWARE LANGUAGE',
            c: 'HYPER TEST MAILWARE LANGUAGE'
        },
        correctAnswer: 'a'
    },
    {
        question: "is html a fragile language",
        answers: {
            a: 'yes',
            b: 'no',
            c: 'i dont know'
        },
        correctAnswer: 'b'
    }, 
    { 
        question: "Do all HTML tags come in pairs? ",
        answers: {
            a: 'yes', 
            b: 'no'
        },
        correctAnswer: 'b'
    }, 
    {
        question: "How do you create a link that will connect to another web page when clicked",
        answers: {
            a: 'a src',
            b: 'button src',
            c: 'a href'
        }, 
        correctAnswer: 'c'
    }, 
    {
        question: "Can you change the color of bullets?",
        answers: {
            a: 'yes',
            b: 'no'
        }, 
        correctAnswer: 'b'
    },
    {
        question: "Which browsers support HTML5", 
        answers: {
            a: 'Chrome, safari, firefox, opera', 
            b: 'chrome, firefox, opera', 
            c: 'just chrome'
        },
        correctAnswer: 'a'
    }


];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
const percContainer = document.getElementById('perc');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        var finalPercentage = numCorrect / questions.length * 100; 
          resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        alert("You got " + finalPercentage + "%");

        if (finalPercentage < 80) {
            alert("You have failed below the average of the test, try again next time");
        }
        else {
            alert("you have passed");
        }

         
   
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}