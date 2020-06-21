
// on page load
document.addEventListener('DOMContentLoaded', () => {
    countQuestions();
    // on input click
    document.querySelectorAll('input').forEach(item => {
        item.addEventListener('click', event => {
            tallyCandidateCount();
            showDetail();
            insertResponse();
            highlightTableColumn();
        })
    });
});


// get total questions
countQuestions = () => {
    // get total number of questions 
    let counter = document.querySelectorAll('#question').length;
    // insert total
    document.querySelector('#counter').innerHTML = counter;
};


// get total count per candidate
tallyCandidateCount = () => {
    // candidate inputs 
    const questions = document.querySelectorAll('#question').length;
    const candidateA = document.querySelectorAll('input[id="candidate-1"]');
    const candidateB = document.querySelectorAll('input[id="candidate-2"]');

    // checked counter
    let countA = 0;
    let countB = 0;

    // iterate through input to count checked 
    for (let i = 0; i < candidateA.length; i++) {
        if (candidateA[i].checked) {
            countA++;
        }
    }
    for (let i = 0; i < candidateB.length; i++) {
        if (candidateB[i].checked) {
            countB++;
        }
    }

    // get percentage 
    let percentageA = (countA / questions) * 100;
    let percentageB = (countB / questions) * 100;

    // text for candidate-1
    document.getElementById('candidate1').innerHTML = countA;
    document.getElementById('percentage1').innerHTML = percentageA;

    // text for candidate-2
    document.getElementById('candidate2').innerHTML = countB;
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
    let questions = document.querySelectorAll('#question');

    // iterate through questions
    for (i = 0; i < questions.length; i++) {
        // insert value if question id match response id
        if (questions[i].dataset.id === eResponse) {
            questions[i].firstElementChild.innerHTML = eValue;
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

