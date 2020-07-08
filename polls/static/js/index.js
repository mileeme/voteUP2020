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

    // 2. add eventlisteners to elements
    document.addEventListener('DOMContentLoaded', () => {
        getCandidateNames()
    })
    responses.forEach(response => {
        response.addEventListener('click', e => { 
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
    showResultsButton.addEventListener('click', function() { showResults() })

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
        // console.log(candidate1)
        // console.log(candidate1Name)
    }

    /*
    * Survey results
    *****************/
    // display results
    function showResults() {
        var showPollResults = document.querySelector('#pollResults'),
            // resultsHeading = document.querySelector('#resultsHeading'),
            pollResults = document.querySelector('.is-results-hide'),
            pollResultsHeight = pollResults.scrollHeight

        // show results
        showPollResults.classList.replace('is-results-hide', 'is-results-show')
        showPollResults.style.setProperty('max-height', pollResultsHeight + 'px')
        console.log(showPollResults)

        // resultsHeading.scrollIntoView()
    }

    // update result changes
    function updateResults(targetIdResponse, targetIdCandidate) {

        var candidateWinners = document.querySelectorAll('#candidateWinnerName'),
            candidateProfiles = document.querySelectorAll('#candidateProfile'),
            matchPercentages = document.querySelectorAll('#matchPercentage'),
            candidateProfileImages = Array.from(document.querySelectorAll('#candidateProfileImage')),
            // carousel
            responseMatches = Array.from(document.querySelectorAll('#responseMatch')),
            // responseNotMatches = Array.from(document.querySelectorAll('#responseMatch')),
            getMatches = Array.from(document.querySelectorAll('#getMatch')),
            getNotMatches = Array.from(document.querySelectorAll('#getNotMatch'))
            // responseMatchColumns = Array.from(document.querySelectorAll('#responseMatchColumn')),
            
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
        * carousel for matches 
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
                // console.log(response)
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

        /*********************
        * carousel for not matched
        **********************/

        // get only non-matched responses 
        getNotMatches.forEach((match) => {
            if (candidate1Count > candidate2Count) {
                if (match.classList.contains('candidate1')) {
                    match.style.display = 'none'
                } else {
                    match.style.display = 'inherit'
                }
            } else {
                if (match.classList.contains('candidate2')) {
                    match.style.display = 'none'
                } else {
                    match.style.display = 'inherit'
                }
            }
        })
        
        // update result slides
        // responseMatches.forEach((match) => {
        //     if (match.dataset.response == targetIdResponse) {
        //         if (match.dataset.candidate == targetIdCandidate) {
        //             // match.className = 'result-match-item'
        //             match.firstElementChild.innerHTML = '✔️'
        //         } else {
        //             match.firstElementChild.innerHTML = '✖️'
        //             // console.log(match)
        //         }
        //     }
        // })

        // update result table columns
        // responseMatchColumns.forEach((match) => {
        //     if (match.dataset.response == targetIdResponse) {
        //         if (match.dataset.candidate == targetIdCandidate) {
        //             // match.className = 'result-match-item'
        //             match.firstElementChild.innerHTML = '✔️'
        //         } else {
        //             match.firstElementChild.innerHTML = '✖️'
        //         }
        //     }
        // })
    }

    /*
    * Survey
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
                totalActives = document.querySelectorAll('.is-active-response')
                if (response.dataset.candidate == '1') {
                    candidateA++
                } else {
                    candidateB++
                }
                allAnswers = totalActives.length
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
            showResultsButton.innerHTML = 'See my match results'
        }
    }
}

// touch enabled slider 
const carousel = () => {
    // 1. variables for the slider
    var responses = document.querySelectorAll('#candidateResponse'),
        slides = document.querySelector('#slides'),
        slidesArray = Array.from(slides.querySelectorAll('#getMatch')),
        slidesCount,
        slideWidth,
        slidesArrayWidth,
        slidesArrayLeft,
        startX,
        startY,
        distX,
        distY,
        posInitial,
        posFinal,
        threshold = 100, //required min X-distance to be considered swipe
        restraint = 200, // Y-height boundary to be considered a horizontal swipe
        index = 0
        // navigation
        prev = document.querySelector('#prev'),
        next = document.querySelector('#next'),
        navDots = document.querySelector('#navDots'),
        // dotsArray

    // 2. eventlisteners
    // mouse
    slides.onmousedown = touchstart

    // touch for chrome, firefox, android
    slides.addEventListener('touchstart', touchstart, false)
    slides.addEventListener('touchmove', touchmove, false)
    slides.addEventListener('touchend', touchend, false)

    // click events 
    responses.forEach(response => { 
        response.addEventListener('click', (e) => { 
            e.preventDefault()
            updateSlides() 
        }) 
    })
    
    prev.addEventListener('click', (e) => { 
        e.preventDefault()
        shiftSlide('prev') 
    })
    next.addEventListener('click', (e) => {
        e.preventDefault() 
        shiftSlide('next')
    })
    // navDots.addEventListener('click', e => { 
    //     e.preventDefault
    //     clickNav(e) 
    // })

    // transition events 
    slides.addEventListener('transitionend', checkIndex, { passive: true })

    // 3. touchstart function
    function touchstart(e) {
        e.preventDefault()
        // get the initial left position of the slide 
        posInitial = slides.offsetLeft // positive number

        // if touch detected
        if (e.type == 'touchstart') {
            // gets touch x position inside element
            startX = e.touches[0].pageX
            startY = e.touches[0].pageY
            document.querySelector('#testTouch1').innerHTML = startX
        } else {
            // for mouse event
            startX = e.pageX
            document.onmouseup = touchend
            document.onmousemove = touchmove
        }
    }

    // 4. touch move function
    function touchmove(e) {
        e.preventDefault()
        if (e.type == 'touchmove') {
            // get distanced moved 
            distX = e.targetTouches[0].pageX - startX
            distY = e.targetTouches[0].pageY - startY
            document.querySelector('#testTouch2').innerHTML = distX

        } else {
            // get mouse event
            distX = e.pageX - startX
        }
        // set new left position of slide 
        // based on distance of touch moved
        slides.style.left = (posInitial + distX) + 'px'
        // console.log(`slides left: ${slides.style.left}`)
    }

    // 5. end of touch/mousedown - either, call function or stay put
    function touchend(e) {
        e.preventDefault()
        if (e.type == 'touchend') {
            posFinal = slides.offsetLeft
        }
        // check that distance move beyond threshold
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
            // check whether wipe was in pos or neg direction 
            if (Math.sign(distX) == 1) {
                // if positive, direction is prev
                shiftSlide('prev', 'drag')
                document.querySelector('#testTouch3').innerHTML = "prev"
            } else {
                // if negative, direction is next
                shiftSlide('next', 'drag')
                document.querySelector('#testTouch4').innerHTML = "next"

            }
        } else {
            // if didn't meet the threshold than stay put 
            slides.style.left = posInitial + 'px'
        }      
        document.onmouseup = null
        document.onmousemove = null
    }
    // 6. function to move slide 
    function shiftSlide(dir, action) {
        // add css transition 
        slides.classList.add('shifting')
        // remove active css class during transition
        // dotsArray[index].classList.remove('dot-active')
        // transition to next slide
        // if a click event, set posInitial to current click position
        if (!action) { posInitial = slides.offsetLeft }
        if (dir == 'next') {
            slides.style.left = (posInitial - slideWidth) + 'px'
            index++
        } else if (dir == 'prev') {
            slides.style.left = (posInitial + slideWidth) + 'px'
            index--
        } 
        document.querySelector('#testTouch5').innerHTML = slides.style.left
    }
    // 7. navigation 
    // function clickNav(e) {
    //     const targetDot = e.target.closest('a')
    //     if (!targetDot) return;
    //     // make node list into array
    //     const dots = Array.from(dotsArray)
    //     // loop through array and find index of targetDot
    //     const targetIndex = dots.findIndex(dot => dot === targetDot)

    //     // add css transition 
    //     slides.classList.add('shifting')
    //     // remove active css class during transition
    //     dotsArray[index].classList.remove('dot-active')
    //     // transition to slide 
    //     slides.style.left = -(slideWidth) * (targetIndex + 1) + 'px'
    //     index = targetIndex
    // }

    // update slides
    function updateSlides() {
        var slidesInherit = slidesArray.filter(slide => (slide.style.display == 'inherit'))

        slidesCount = slidesInherit.length
        slideWidth = slidesInherit[0].offsetWidth
        slidesArrayWidth = slideWidth * slidesCount
        slidesArrayLeft = slidesArrayWidth - slideWidth
    }

    // 8. check index 
    function checkIndex() {
        slides.classList.remove('shifting')
        
        // set first slide boundary 
        if (index == -1) {
            slides.style.left = 0 + 'px'
            index = 0
         // set last slide boundary 
        } else if (index == slidesCount) {
            slides.style.left = -slidesArrayLeft + 'px'
            index = slidesCount - 1
        }
        document.querySelector('#testTouch6').innerHTML = index
        // add active class to nav when on the slide 
        // dotsArray[index].classList.add('dot-active')
    }
}

// check registration 
const registration = () => {
    var input, filter, ul, lists, queryValue;
        input = document.querySelector('#registrationInput'),
        filter = input.value.toUpperCase(),
        ul = document.querySelector('#registrationUL'),
        lists = ul.querySelectorAll('#registrationState')

    input.addEventListener('keyup', function (e) { checkRegistration(e) })

    function checkRegistration(e) {
        lists.forEach(list => {
            queryValue = list.firstElementChild.innerHTML

            if(queryValue.toUpperCase().indexOf(filter) > -1) {
                list.style.display = ''
            } else {
                list.style.display = 'none'
            }

            if (queryValue.toUpperCase === filter) {
                console.log(list.firstElementChild)

                if (e.keyCode === 13) {
                    list.firstElementChild.click()
                }
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
    // variables
    const buttons = document.querySelectorAll('#showResults'),
        profileButton = document.querySelectorAll('#profileButton'),
        registrationLinks = document.querySelectorAll('#registrationLink')

    // result button
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            let rect = button.getBoundingClientRect(),
                x = e.pageX - rect.left,
                y = e.pageY - rect.top,
                ripple = document.createElement('span')
            
            ripple.setAttribute('class', 'button-ripple')
            ripple.style.left = x + 'px'
            ripple.style.top = y + 'px'

            button.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 400)
        })
    })

    // profile button
    profileButton.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log(button)
            let rect = button.getBoundingClientRect(),
                x = e.pageX - rect.left,
                y = e.pageY - rect.top,
                ripple = document.createElement('span')

            ripple.setAttribute('class', 'button-profile-ripple')
            ripple.style.left = x + 'px'
            ripple.style.top = y + 'px'

            button.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 400)
        })
    })
}
animateOnScroll()
response()
carousel()
buttonRipple()
registration()