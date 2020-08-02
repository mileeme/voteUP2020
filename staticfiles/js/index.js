
// poll response features 
const response = () => {
    // 1. initialize variables
    var responses = document.querySelectorAll('#candidateResponse'),
        questions = document.querySelectorAll('#question'),
        showResultsButton = document.querySelector('#showResults'),
        // response tally
        totalQuestions = questions.length,
        activeResponses = 0,
        totalAnswers = 0,
        percentageAnswered = 0,
        candidate1Name,
        candidate2Name,
        candidate1Count = 0,
        candidate1Percentage = 0,
        candidate2Count = 0,
        candidate2Percentage = 0

    // get candidate names
    getCandidateNames()

    // 2. add eventlisteners to elements

    // on click
    responses.forEach(response => {
        response.addEventListener('click', (e) => { 
            // variables 
            const targetResponse = e.target,
                targetValue = targetResponse.innerHTML,
                targetIdResponse = targetResponse.dataset.response, 
                targetIdCandidate = targetResponse.dataset.candidate

            // function calls 
            insertResponse(targetValue, targetIdResponse) 
            showResponseDetail(targetIdResponse, targetIdCandidate)
            countResponses(targetIdResponse, targetIdCandidate)
            updateResults(targetIdResponse, targetIdCandidate)

            e.preventDefault()
        }, false)
    })
    
    showResultsButton.addEventListener('click', (e) => { showResults() })

    // 3. functions 
    // get candidate names
    function getCandidateNames() {
        var candidateNames = Array.from(document.querySelectorAll('#candidateProfileName')),
            candidate1,
            candidate2

        // get name of candidates 
        candidateNames.forEach((name) => {
            if (name.dataset.id == 1) {
                candidate1 = name.innerHTML
            } else {
                candidate2 = name.innerHTML
            }
        })
        candidate1Name = candidate1
        candidate2Name = candidate2
    }

    /*
    * Survey results
    *****************/
    // display results
    function showResults() {
        var showPollResults = document.querySelector('#pollResults'),
            pollResultsHeight = showPollResults.scrollHeight

        // show results
        showPollResults.classList.replace('is-results-hide', 'is-results-show')
        showPollResults.style.setProperty('max-height', pollResultsHeight + 'px')
    }

    // update result changes
    function updateResults(targetIdResponse, targetIdCandidate) {

        var candidateWinners = document.querySelectorAll('#candidateWinnerName'),
            candidateProfiles = document.querySelectorAll('#candidateProfile'),
            matchPercentages = document.querySelectorAll('#matchPercentage'),
            candidateProfileImages = Array.from(document.querySelectorAll('#candidateProfileImage')),
            // slider
            responseMatches = Array.from(document.querySelectorAll('#responseMatch')),
            getMatches = Array.from(document.querySelectorAll('#getMatch'))
            
        // update name of winner in result heading
        candidateWinners.forEach((winner) => {
            if (candidate1Count > candidate2Count) {
                winner.innerHTML = candidate1Name
            } else {
                winner.innerHTML = candidate2Name
            }
        })

        // update candidate percentage match
        matchPercentages.forEach((match) => {
            if (match.dataset.candidate == 1) {
                match.innerHTML = candidate1Percentage + '% match'
            } else {
                match.innerHTML = candidate2Percentage + '% match'
            }
        })

        // update winner profile border highlight 
        candidateProfileImages.forEach((profile) => {
            if (candidate1Count > candidate2Count) {
                if (profile.dataset.profile == 1) {
                    profile.className = 'profile-img is-profile-active'
                } else {
                    profile.className = 'profile-img is-profile-disabled'
                }
            } else {
                if (profile.dataset.profile == 2) {
                    profile.className = 'profile-img is-profile-active'
                } else {
                    profile.className = 'profile-img is-profile-disabled'
                }
            }
        })

        // only show winner profile 
        candidateProfiles.forEach((profile) => {
            if (candidate1Count > candidate2Count) {
                if (profile.dataset.candidate != 1) {
                    profile.className = 'u-hide'
                } else {
                    profile.className = 'card-candidate-profile'
                }
            } else {
                if (profile.dataset.candidate !=2) {
                    profile.className = 'u-hide'
                } else {
                    profile.className = 'card-candidate-profile'
                }
            }
        })

        /*********************
        * slider for matches 
        **********************/
        
        // get all the responses
        responseMatches.forEach((response) => {
            if (response.dataset.response == targetIdResponse && response.dataset.candidate == targetIdCandidate) {
                if (targetIdCandidate == 1) {
                    response.parentElement.classList.remove('candidate2')
                    response.parentElement.classList.add('candidate1')
                } else {
                    response.parentElement.classList.remove('candidate1')
                    response.parentElement.classList.add('candidate2')
                }
            }
        })

        // get only matched responses 
        getMatches.forEach((match) => {
            if (candidate1Count > candidate2Count) {
                if (match.classList.contains('candidate1')) {
                    match.style.display = 'inherit'
                } else {
                    match.style.display = 'none'
                }
            } else {
                if (match.classList.contains('candidate2')) {
                    match.style.display = 'inherit'
                } else {
                    match.style.display = 'none'
                }
            }
        })
    }

    /*
    * poll
    *****************/
    // insert response to question
    function insertResponse(targetValue, targetIdResponse) {
        var questionSpans = document.querySelectorAll('#questionSpan')

        questionSpans.forEach((question) => {
            // if match, insert response
            if (question.dataset.question == targetIdResponse) {
                question.className = 'is-response'
                question.innerHTML = targetValue
            }
        })
    }

    // show detail of selected response 
    function showResponseDetail(targetIdResponse, targetIdCandidate) {
        var responseDetails = document.querySelectorAll('#responseDetail')

        responseDetails.forEach((detail) => {
            if (detail.dataset.response == targetIdResponse) {
                if (detail.dataset.candidate == targetIdCandidate) {
                    detail.classList.replace('is-invisible', 'is-visible')
                } else {
                    detail.classList.replace('is-visible', 'is-invisible')
                }
            }
        })
    }

    // count responses 
    function countResponses(targetIdResponse, targetIdCandidate) {
        let candidateA = 0,
            candidateB = 0,
            totalActives,
            allAnswers = 0

        responses.forEach((response) => {
            if (response.dataset.response == targetIdResponse) {
                // toggle active css class for response 
                if (response.dataset.candidate == targetIdCandidate) {
                    response.className = 'is-active-response'
                } else {
                    response.className = 'candidate-response'
                }
            }
            // count all active responses and candidates
            if (response.className == 'is-active-response') {
                totalActives = document.getElementsByClassName('is-active-response')
                if (response.dataset.candidate == '1') {
                    candidateA++
                } else {
                    candidateB++
                }
                allAnswers = totalActives.length
                allAnswers = candidateA + candidateB
                console.log(targetIdResponse)
                console.log(targetIdCandidate)
                console.log(`allanswers: ${allAnswers}`)
            }
        })

        // get totals
        activeResponses = totalActives
        totalAnswers = allAnswers
        candidate1Count = candidateA
        candidate2Count = candidateB
        percentageAnswered = (totalActives.length / totalQuestions) * 100
        candidate1Percentage = (candidateA / totalQuestions) * 100
        candidate2Percentage = (candidateB / totalQuestions) * 100
        // call button function
        updateResultsButton()
    }

    // update button innerHTML
    function updateResultsButton() {
        // update innerHTML
        if (totalAnswers >= 3 && totalAnswers < totalQuestions) {
            showResultsButton.innerHTML = `${totalAnswers} / ${totalQuestions} answered`
        } else if (totalAnswers == totalQuestions) {
            showResultsButton.classList.replace('is-disabled-button', 'is-abled-button')
            showResultsButton.innerHTML = 'View my match'
        }
    }
}

// slider
const slider = () => {
    var responses = document.querySelectorAll('#candidateResponse'),
        // slider = document.querySelector('#slider'),
        holder = document.querySelector('.holder'),
        slides = Array.from(document.querySelectorAll('#getMatch')),
        slideWidth,
        slidesCount,
        holderWidth,
        lastSlidePosition,
        lastIndex,
        touchStartX = undefined,
        touchMoveX = undefined,
        moveX = undefined,
        index = 0,
        longTouch = false,
        mouseMoving = false,
        prev = document.querySelector('#prev'),
        next = document.querySelector('#next')

    // mouse event
    holder.onmousedown = start

    // touch event 
    holder.addEventListener('touchstart', (event) => {start(event)}, false)
    holder.addEventListener('touchmove', (event) => {move(event)}, false)
    holder.addEventListener('touchend', (event) => {end(event)}, false)

    // click event 
    // prev.addEventListener('click', function (event) {end(event, 'prev')})
    // next.addEventListener('click', function (event) {end(event, 'next')})
    responses.forEach(response => {
        response.addEventListener('click', () => {updateSlides()})
    })

    function start(event) {
        if (event.type == 'touchstart') {
            event.preventDefault()

            // test for flick
            longTouch = false
            setTimeout(function () {
                holder.longTouch = true
            }, 250)

            // get the initial touch position
            touchStartX = event.touches[0].clientX
        } else if (event.type == 'mousedown') {
            mouseMoving = true
            touchStartX = event.clientX
            holder.onmousemove = move
            holder.onmouseup = end
        }
        // remove animation 
        holder.classList.remove('animate')
        
        // console.log(`width: ${slideWidth} slide count: ${slidesCount} last position: ${lastSlidePosition} holder width: ${holderWidth} last index: ${lastIndex} current index: ${index}`)
    }

    function move(event) {
        event.preventDefault()

        if (event.type == 'touchmove') {
            // get moving position
            touchMoveX = event.touches[0].clientX

            // calculate slider movement
            moveX = index * slideWidth + (touchStartX - touchMoveX)

            // limit slider from moving beyond the last slide
            if (moveX < lastSlidePosition) {
                holder.style.webkitTransform = 'translate3d(-' + moveX + 'px,0,0)'
            }
        } else if (mouseMoving) {
            touchMoveX = event.clientX
            // calculate slider movement
            moveX = index * slideWidth + (touchStartX - touchMoveX)
        }
    }

    function end(event, clickEvent) {
        event.preventDefault()
        // calculate the distance swiped
        var absMove = Math.abs(index * slideWidth - moveX)
        if (event.type == 'mouseup' || event.type == 'touchend') {
            if (absMove > 100 || longTouch == false) {
                if ((moveX > index * slideWidth) && index < lastIndex) {
                    index++
                } else if ((moveX < index * slideWidth) && index > 0) {
                    index--
                }
            }
            mouseMoving = false
            // move and animate the slide 
            holder.classList.add('animate')
            holder.style.webkitTransform = 'translate3d(-' + index * slideWidth + 'px,0,0)'
        }

        if (clickEvent == 'next' && index < lastIndex) {
            index++
        } else if (clickEvent == 'prev' && index > 0) {
            index--
        }
        holder.classList.add('animate')
        holder.style.webkitTransform = 'translate3d(-' + index * slideWidth + 'px,0,0)'
    }

    function updateSlides() {
        var slidesInherit = slides.filter(slide => (slide.style.display == 'inherit'))

        slidesCount = slidesInherit.length
        slideWidth = slidesInherit[0].offsetWidth 
        holderWidth = slideWidth * slidesCount 
        lastSlidePosition = holderWidth - slideWidth 
        lastIndex = slidesCount - 1
    }
}

// check registration 
const registration = () => {
    var input, filter, ul, lists, queryValue;
        input = document.querySelector('#registrationInput'),
        filter = input.value.toUpperCase(),
        ul = document.querySelector('#registrationUL'),
        lists = ul.querySelectorAll('#registrationState')

    // keyup
    input.addEventListener('keyup', (event) => { checkRegistration(event) })

    function checkRegistration(e) {
        lists.forEach(list => {
            queryValue = list.firstElementChild.innerHTML

            if(queryValue.toUpperCase().indexOf(filter) > -1) {
                list.style.display = ''
            } else {
                list.style.display = 'none'
            }
        })
    }
}

// page animation 
const animateOnScroll = () => {
    // scroll animation
    // var scroll = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) },
    //     scrollAnimate = document.querySelectorAll('#scrollAnimate')

    // loop()

    // // loop animation
    // function loop() {
    //     scrollAnimate.forEach(element => {
    //         if (isInViewport(element)) {
    //             element.classList.add('is-heading-visible')
    //         } else {
    //             element.classList.remove('is-heading-visible')
    //         }
    //     })
    //     scroll(loop)
    // }

    // determine if element is in viewport
    // function isInViewport(element) {
    //     var rect = element.getBoundingClientRect();
    //         html = document.documentElement;
    //     return (
    //         rect.top >= 0 &&
    //         rect.left >= 0 &&
    //         rect.bottom <= (window.innerHeight || html.clientHeight) &&
    //         rect.right <= (window.innerWidth || html.clientWidth)
    //     );
    // }
}

// buttons 
const buttonRipple = () => {

    const button = document.querySelector('#showResults')

    // result button
    button.addEventListener('click', (e) => {

        let ripple = document.createElement('span'), 
            rect = button.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top
        
        ripple.setAttribute('class', 'button-ripple')
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'

        button.appendChild(ripple)

        setTimeout(() => {
            ripple.remove()
        }, 800)
    })
}

// date counter 
const countDown = () => {
    var dateCountdown = document.querySelector('#dateCountdown'),
        oneDay = 24 * 60 * 60 * 1000,
        now = new Date(),
        endDate = new Date(2020, 10, 3),
        difference = endDate - now,
        daysLeft = Math.floor(difference / oneDay)
    // console.log(`now: ${now}, endDate: ${endDate}, difference: ${difference}, days left: ${daysLeft}`)

    // insert counter
    if (daysLeft > 0) {
        dateCountdown.innerHTML = daysLeft + ' days till election';    
    } else if (daysLeft == 1) {
        dateCountdown.innerHTML = 'Go vote tomorrow!';
    } else if (daysLeft == 0) {
        dateCountdown.innerHTML = 'Go vote today!'
    } else {
        dateCountdown.style.display = 'none'
    }
}
