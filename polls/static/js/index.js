// on page load
document.addEventListener('DOMContentLoaded', () => {
    // form input buttons
    document.querySelectorAll('#candidateResponse').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            insertResponse(); //1
            showResponseDetail(); //2
            tallyCandidateCount(); //3
            highlightTableColumn(); //4
        });
    });

    // results button
    document.querySelector('#showResults').addEventListener('click', function(event) {
        event.preventDefault();
        showPollResults(); //5
    });
});


// on scroll fix button to bottom
window.onscroll = () => {
    const firstQuestion = document.querySelector('#poll').offsetTop;
    const preButtonId = document.querySelector('#pre-button');
    let preButtonLoc = preButtonId.offsetTop;
    let buttonInView = window.scrollY + window.innerHeight;
    // console.log(preButtonLoc);
    // console.log(`window innerheight: ${window.innerHeight}, scrollY: ${window.scrollY}, button loc: ${preButtonLoc}, doc body offsetHeight: ${document.body.offsetHeight}, buttonInView: ${window.innerHeight + window.scrollY}`);

    if (window.scrollY >= firstQuestion && window.scrollY < preButtonLoc) {
        document.querySelector('#showResults').classList.add('is-fixed-button');
    }
    if (buttonInView > preButtonLoc) {
        document.querySelector('#showResults').classList.remove('is-fixed-button');
    }
}

// 1 insert target into question
insertResponse = () => {
    // get value of target
    let e = event.target;
    let eResponse = e.dataset.response;
    let eValue = e.innerHTML;
    let questions = document.querySelectorAll('#questionSpan');
    // iterate through questions
    for (i = 0; i < questions.length; i++) {
        // insert target value if question match id
        if (questions[i].dataset.question === eResponse) {
            questions[i].className = "is-response";
            questions[i].innerHTML = eValue;
        }
    }
};

// 2 show detail of selected response 
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
                details[i].classList.replace("u-hide", "u-show");
            } else {
                details[i].classList.replace("u-show", "u-hide");
            }
        }
    }
};

// 3 get total count per candidate
tallyCandidateCount = () => {

    const candidates = document.querySelectorAll('#candidateResponse');
    const questions = document.querySelectorAll('#question').length;
    let e = event.target;
    let eResponse = e.dataset.response;
    let eCandidate = e.dataset.candidate;

    let candidateA = 0;
    let candidateB = 0;
    let countAnswered = 0;
    let allActives = [];

    // iterate through responses chosen
    for (i = 0; i < candidates.length; i++) {
        if (candidates[i].dataset.response === eResponse) {
            if (candidates[i].dataset.candidate === eCandidate) {
                candidates[i].className = "is-active-button";
                allActives++;
            } else {
                candidates[i].className = "candidate-response";
            }
        }
        // get all active responses
        let buttonActive = document.getElementsByClassName('is-active-button');
        // count actives 
        countAnswered = buttonActive.length;
        // store actives 
        allActives = buttonActive;
    }

    // count candidate response actives
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
    document.querySelector('#candidateCounter').innerHTML = `${questions} (${percentageAnswered}% answered)`;
    document.querySelector('#countAll').innerHTML = countAnswered; 

    // total for candidate-1
    document.querySelector('#candidate1').innerHTML = candidateA;
    document.querySelector('#percentage1').innerHTML = percentageA;

    // total for candidate-2
    document.querySelector('#candidate2').innerHTML = candidateB;
    document.querySelector('#percentage2').innerHTML = percentageB;

    // show answered responses progress on disabled results
    if (percentageAnswered === 100) {
        document.querySelector('#showResults').classList.remove('is-disabled-button');
        document.querySelector('#showResults').classList.add('is-abled-button');
        document.querySelector('#showResults').innerHTML = 'Show results';
    } else {
        document.querySelector('#showResults').classList.remove('is-abled-button');
        document.querySelector('#showResults').classList.add('is-disabled-button');
        document.querySelector('#showResults').innerHTML = `${countAnswered} out of ${questions} answered`;
    }
};

// 4 table 
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
                tableColumns[i].className = 'is-true';
                tableColumns[i].firstElementChild.innerHTML = "✔️";
            } else {
                tableColumns[i].className = '';
                tableColumns[i].className = 'is-false';
                tableColumns[i].firstElementChild.innerHTML = "✖️";
            }
        }
    }
};

// 5 show results
showPollResults = () => {
    document.querySelector('#pollResults').className = "u-show";
};

// search registration filter
searchStates = () => {
    event.preventDefault();
    let input = document.querySelector('#registrationInput');
    let filter = input.value.toUpperCase();
    let ul = document.querySelector('#registrationUL');
    let stateLists = document.querySelectorAll('#stateLink');

    // loop through the list and show matches 
    for (i = 0; i < stateLists.length; i++) {
        let listData = stateLists[i].dataset.state;
        let listValue = stateLists[i].firstElementChild.innerHTML.toUpperCase().slice(0,2);

        if (listValue.indexOf(filter) > -1) {
            stateLists[i].className = "u-show";
        } else {
            stateLists[i].className = "u-hide";
        }

        if (filter.length === 0) {
            stateLists[i].className = "u-hide";
        };
    }
};


