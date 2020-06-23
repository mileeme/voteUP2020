// on page load
document.addEventListener('DOMContentLoaded', () => {
    // form input buttons
    document.querySelectorAll('input').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            tallyCandidateCount();
            showResponseDetail();
            insertResponse();
            highlightTableColumn();
        });
    });
    // results button
    document.querySelector('#showResults').addEventListener('click', function(event) {
        event.preventDefault();
        showPollResults();
    });
});

// on scroll 
window.onscroll = () => {
    const firstForm = document.getElementsByTagName('form')[0].offsetTop;
    const preButtonId = document.querySelector('#pre-button');
    let preButtonLoc = preButtonId.offsetTop;
    let buttonInView = window.scrollY + window.innerHeight;
    // console.log(preButtonLoc);
    // console.log(`window innerheight: ${window.innerHeight}, scrollY: ${window.scrollY}, button loc: ${preButtonLoc}, doc body offsetHeight: ${document.body.offsetHeight}, buttonInView: ${window.innerHeight + window.scrollY}`);

    if (window.scrollY >= firstForm && window.scrollY < preButtonLoc) {
        document.querySelector('#showResults').classList.add('result-button--fixed');
    }
    if (buttonInView > preButtonLoc) {
        document.querySelector('#showResults').classList.remove('result-button--fixed');
    }
}

// get total count per candidate
tallyCandidateCount = () => {

    const candidates = document.querySelectorAll('#candidate');
    const questions = document.querySelectorAll('#question').length;
    let e = event.target;
    let eResponse = e.dataset.response;
    let eCandidate = e.dataset.candidate;

    let candidateA = 0;
    let candidateB = 0;
    let countAnswered = 0;
    let allActives = [];

    // iterate through response buttons
    for (i = 0; i < candidates.length; i++) {
        if (candidates[i].dataset.response === eResponse) {
            if (candidates[i].dataset.candidate === eCandidate) {
                candidates[i].classList.add('button-active');
                allActives++;
            } else {
                candidates[i].classList.remove('button-active');
            }
        }
        // get all active buttons
        let buttonActive = document.getElementsByClassName('button-active');
        // count actives 
        countAnswered = buttonActive.length;
        // store actives 
        allActives = buttonActive;
    }

    // count candidate response active
    for (j = 0; j < allActives.length; j++) {
        if (allActives[j].dataset.candidate === "1") {
           candidateA++;
        }
        if (allActives[j].dataset.candidate === "2") {
            candidateB++;
        }
    }

    // get total 
    let percentageAnswered = (countAnswered / questions) * 100;
    let percentageA = (candidateA / questions) * 100;
    let percentageB = (candidateB / questions) * 100;

    // display totals
    document.querySelector('#counter').innerHTML = `${questions} (${percentageAnswered}% answered)`;
    document.querySelector('#count-all').innerHTML = countAnswered; 

    // total for candidate-1
    document.querySelector('#candidate1').innerHTML = candidateA;
    document.querySelector('#percentage1').innerHTML = percentageA;

    // total for candidate-2
    document.querySelector('#candidate2').innerHTML = candidateB;
    document.querySelector('#percentage2').innerHTML = percentageB;

    // show progress on disabled results button
    if (percentageAnswered === 100) {
        document.querySelector('#showResults').classList.remove('button-disabled');
        document.querySelector('#showResults').classList.add('button-show');
        document.querySelector('#showResults').innerHTML = 'Show results';
    } else {
        document.querySelector('#showResults').classList.remove('button-show');
        document.querySelector('#showResults').classList.add('button-disabled');
        document.querySelector('#showResults').innerHTML = `${countAnswered} out of ${questions} answered`;
    }
};


// show detail of selected response 
showResponseDetail = () => {
    // get target
    let e = event.target;
    let eResponse = e.dataset.response;
    let eCandidate = e.dataset.candidate;
    const details = document.querySelectorAll('#responseDetail');

    // iterate through the details
    for (i = 0; i < details.length; i++) {
        // show detail if it matches target
        if (details[i].dataset.response === eResponse) {
            if (details[i].dataset.candidate === eCandidate) {
                details[i].classList.replace("hide", "show");
            } else {
                details[i].classList.replace("show", "hide");
            }
        }
    }
};

// insert target into question
insertResponse = () => {
    // get value of target
    let e = event.target;
    let eResponse = e.dataset.response;
    let eValue = e.value;
    let questions = document.querySelectorAll('#question-span');

    // iterate through questions
    for (i = 0; i < questions.length; i++) {
        // insert target value if question match id
        if (questions[i].dataset.question === eResponse) {
            questions[i].className = "insert-response";
            questions[i].innerHTML = eValue;
        }
    }
};

// table 
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
                tableColumns[i].className = '';
                tableColumns[i].className = 'background-true';
                tableColumns[i].firstElementChild.innerHTML = "✔️";
            } else {
                tableColumns[i].className = '';
                tableColumns[i].className = 'background-false';
                tableColumns[i].firstElementChild.innerHTML = "✖️";
            }
        }
    }
};


// show results
showPollResults = () => {
    document.querySelector('#revealResults').className = "show";
}