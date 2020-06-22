// on page load
document.addEventListener('DOMContentLoaded', () => {
    // countQuestions();
    // on input click
    document.querySelectorAll('input').forEach(item => {
        item.addEventListener('click', event => {
            tallyCount();
            showDetail();
            insertResponse();
            highlightTableColumn();
        })
    });
});


// // get total questions
// countQuestions = () => {
//     // get total number of questions 
//     let counter = document.querySelectorAll('#question').length;
//     // insert total
//     document.querySelector('#counter').innerHTML = counter;
// };


// get total count per candidate
tallyCount = () => {
    const candidates = document.querySelectorAll('#candidate');
    const questions = document.querySelectorAll('#question').length;
    let e = event.target;
    let eResponse = e.dataset.response;
    let eCandidate = e.dataset.candidate;

    let candidateA = 0;
    let candidateB = 0;
    let countAnswered = 0;
    let allActives = [];

    for (i = 0; i < candidates.length; i++) {
        if (candidates[i].dataset.response === eResponse) {
            if (candidates[i].dataset.candidate === eCandidate) {
                candidates[i].classList.add('button-active');
                allActives++;
            } else {
                candidates[i].classList.remove('button-active');
            }
        }
        let buttonActive = document.getElementsByClassName('button-active');
        countAnswered = buttonActive.length;
        allActives = buttonActive;
    }

    for (j = 0; j < allActives.length; j++) {
        if (allActives[j].dataset.candidate === "1") {
           candidateA++;
        }
        if (allActives[j].dataset.candidate === "2") {
            candidateB++;
        }

    }
    console.log(candidateA);
    console.log(candidateB);
    

    // do math 
    let percentageAnswered = (countAnswered / questions) * 100;
    let percentageA = (candidateA / questions) * 100;
    let percentageB = (candidateB / questions) * 100;


    // all totals
    document.querySelector('#counter').innerHTML = `${questions} (${percentageAnswered}% answered)`;
    document.getElementById('count-all').innerHTML = countAnswered; 

    // total for candidate-1
    document.getElementById('candidate1').innerHTML = candidateA;
    document.getElementById('percentage1').innerHTML = percentageA;

    // total for candidate-2
    document.getElementById('candidate2').innerHTML = candidateB;
    document.getElementById('percentage2').innerHTML = percentageB;


};


// check which input was checked 
showDetail = () => {
    // get ids of checked input 
    let e = event.target;
    let eResponse = e.dataset.response;
    let eCandidate = e.dataset.candidate;
    const details = document.querySelectorAll('#responseDetail');

    // iterate through the details
    for (i = 0; i < details.length; i++) {
        // show detail if it matches the response of candidate
        if (details[i].dataset.response === eResponse) {
            if (details[i].dataset.candidate === eCandidate) {
                details[i].classList.replace("hide", "show");
            } else {
                details[i].classList.replace("show", "hide");
            }
        }
    }
};

// insert chosen response into question
insertResponse = () => {
    // get value of checked input
    let e = event.target;
    let eResponse = e.dataset.response;
    let eValue = e.value;
    let questions = document.querySelectorAll('#question-span');

    // iterate through questions
    for (i = 0; i < questions.length; i++) {
        // insert value if question id match response id
        if (questions[i].dataset.question === eResponse) {
            questions[i].className = "insert-response";
            questions[i].innerHTML = eValue;
            // questions[i].firstElementChild.innerHTML = eValue;
        }
    }
};

highlightTableColumn = () => {
    // get ids of checked input 
    let e = event.target;
    let eResponse = e.dataset.response;
    let eCandidate = e.dataset.candidate;
    const tableColumns = document.querySelectorAll('#tableColumn');

    // iterate through the columns
    for (i = 0; i < tableColumns.length; i++) {
        // show detail if it matches the response of candidate
        if (tableColumns[i].dataset.response === eResponse) {
            if (tableColumns[i].dataset.candidate === eCandidate) {
                tableColumns[i].className = 'background-color';
            } else {
                tableColumns[i].className = '';
            }
        }
    }
};