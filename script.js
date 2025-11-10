const quizData = [
{
    question: "Any of various floor coverings capable of springing back to the original form after being bent or compressed, available in either tile or sheet form and set in mastic over a suitable underlayment.",
    answer: "RESILIENT FLOORING"
  },
  {
    question: "Material, esp. a nonfabric material, such as vinyl or ceramic tile, used to cover a floor.",
    answer: "FLOOR COVERING"
  },
  {
    question: "Any of various pasty substances used as a sealant, adhesive, or protective coating.",
    answer: "MASTIC"
  },
  {
    question: "A material, such as plywood or hardboard, laid over a subfloor to provide a smooth, even base for resilient flooring, carpet, or other nonstructural flooring.",
    answer: "UNDERLAYMENT"
  },
  {
    question: "A heavy woven, knitted, needle-tufted, or felted fabric for covering a floor.",
    answer: "CARPET"
  },
  {
    question: "Carpet made by simultaneously interweaving the backing and pile yarns on a loom.",
    answer: "WOVEN CARPET"
  },
  {
    question: "Carpet made by mechanically stitching pile yarn through a primary fabric backing and bonded with latex to a secondary backing.",
    answer: "TUFTED CARPET"
  },
  {
    question: "Carpet made by looping the backing, stitching, and pile yarns with three sets of needles.",
    answer: "KNITTED CARPET"
  },
  {
    question: "Carpet made by heat-fusing face yarns to a vinyl backing supported by other materials.",
    answer: "FUSION-BONDED CARPET"
  },
  {
    question: "Carpet made by propelling short strands of pile fiber electrostatically against an adhesive-coated backing.",
    answer: "FLOCKED CARPET"
  },
  {
    question: "Carpet made by punching carpet fibers back and forth through a woven polypropylene sheet with barbed needles to form a felted fiber mat.",
    answer: "NEEDLEPUNCHED CARPET"
  },
  {
    question: "A flooring unit made of carpeting material.",
    answer: "CARPET TILE"
  },
  {
    question: "The upright tufts of yarn forming the surface of a carpet or fabric.",
    answer: "PILE"
  },
  {
    question: "A carpet texture created by weaving, tufting, or knitting the pile yarn into loops.",
    answer: "LOOP PILE"
  },
  {
    question: "A carpet texture created by cutting each loop of pile yarn, producing a range of textures from informal shags to short, dense velvets.",
    answer: "CUT PILE"
  },
  {
    question: "The foundation material securing the pile yarns of a carpet and providing it with stiffness, strength, and dimensional stability.",
    answer: "BACKING"
  },
  {
    question: "A pad of cellular rubber or felted animal hair, over which carpet is installed, to increase resilience, improve durability, and reduce impact sound transmission. Also called carpet cushion.",
    answer: "CARPET PAD"
  },
  {
    question: "Concurrent forces having the same line of action, the vector sum of which is the algebraic sum of the magnitudes of the forces, acting along the same line of action.",
    answer: "COLLINEAR FORCES"
  },
  {
    question: "Forces that operate in a single plane.",
    answer: "COPLANAR FORCES"
  },
  {
    question: "Forces having lines of action intersecting at a common point, the vector sum of which can be found by applying the parallelogram law.",
    answer: "CONCURRENT FORCES"
  },
  {
    question: "The proposition that the vector sum of two concurrent forces can be described by the diagonal of a parallelogram having adjacent sides that represent the two force vectors being added.",
    answer: "PARALLELOGRAM LAW"
  },
  {
    question: "A single vector equivalent to and producing the same effect on a body as the application of two or more given vectors. Also called resultant.",
    answer: "VECTOR SUM"
  },
  {
    question: "A graphic technique for finding the vector sum of two concurrent forces by displacing one force vector parallel to itself until its tail coincides with the head of the other and completing the triangle with a vector that represents the resultant force.",
    answer: "TRIANGLE METHOD"
  },
  {
    question: "A graphic technique for finding the vector sum of a coplanar system of several concurrent forces by drawing to scale each force vector in succession, with the tail of each at the head of the preceding one, and completing the polygon with a vector that represents the resultant force, extending from the tail of the first to the head of the last vector.",
    answer: "POLYGON METHOD"
  },
  {
    question: "Nonconcurrent forces having parallel lines of action.",
    answer: "PARALLEL FORCES"
  },
  {
    question: "Forces having lines of action that do not intersect at a common point, the vector sum of which is a single force that would cause the same translational motion of a body as the net of original forces.",
    answer: "NONCONCURRENT FORCES"
  },
  {
    question: "The point at which the entire weight of a body may be considered concentrated so that, if supported at this point, the body would remain in equilibrium in any position; coincident with the center of mass in a uniform gravitational field.",
    answer: "CENTER OF GRAVITY"
  }
];
let quizOrder = [];
let currentAnswers = [];
let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuiz() {
    // If quizOrder is not set, initialize and shuffle
    if (!quizOrder.length) {
        quizOrder = Array.from({length: quizData.length}, (_, i) => i);
        shuffleArray(quizOrder);
    }
    if (!currentAnswers.length || currentAnswers.length !== quizData.length) {
        currentAnswers = new Array(quizData.length).fill("");
    }
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizOrder.forEach((qIdx, index) => {
        const question = quizData[qIdx];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        if (index === 0) questionDiv.classList.add('active');

        questionDiv.innerHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="identification-input" style="display:flex;gap:8px;align-items:center;">
                <input type="text" id="input-${index}" data-q="${index}" autocomplete="off" placeholder="Type your answer..." value="${currentAnswers[index] || ''}" oninput="handleInput(${index})" />
                <button type="button" class="send-btn" id="send-${index}" onclick="sendAnswer(${index})" aria-label="Send answer" style="background:none;border:none;cursor:pointer;padding:0 6px;display:flex;align-items:center;">
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='none' viewBox='0 0 24 24'><path fill='var(--accent)' d='M2.01 21 23 12 2.01 3 2 10l15 2-15 2z'/></svg>
                </button>
            </div>
            <div class="feedback" id="feedback-${index}" aria-live="polite"></div>
        `;
        quizContainer.appendChild(questionDiv);
    });
    // Restore any previous answers (when resetting or revisiting)
    quizOrder.forEach((qIdx, index) => {
        if (currentAnswers[index] && currentAnswers[index] !== "") {
            const input = document.getElementById(`input-${index}`);
            if (input) input.value = currentAnswers[index];
        }
    });
    // Hide score page if visible
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';
    updateNavigation();
}

// For identification: handle input and update answer
function handleInput(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    currentAnswers[questionIndex] = input.value;
    // Remove feedback and enable input until send is pressed
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    feedbackEl.textContent = '';
    input.classList.remove('correct', 'wrong');
    updateNavigation();
}

function sendAnswer(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    const qIdx = quizOrder[questionIndex];
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
    if (userAnswer !== "") {
        input.disabled = true;
        if (userAnswer === correctAnswer) {
            feedbackEl.textContent = 'Correct!';
            feedbackEl.style.color = '#2e7d32';
            input.classList.add('correct');
        } else {
            feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
            feedbackEl.style.color = '#c62828';
            input.classList.add('wrong');
        }
        setTimeout(() => {
            if (questionIndex < quizData.length - 1) {
                const questions = document.querySelectorAll('.question-container');
                questions[questionIndex].classList.remove('active');
                currentQuestion = questionIndex + 1;
                questions[currentQuestion].classList.add('active');
                updateNavigation();
                // Focus the next input if not already answered
                const nextInput = document.getElementById(`input-${currentQuestion}`);
                if (nextInput && !nextInput.disabled) nextInput.focus();
            }
            // Always update navigation after answer, so submit button logic is correct
            updateNavigation();
        }, 500);
    } else {
        feedbackEl.textContent = '';
        updateNavigation();
    }
}

function checkAnswers() {
    let score = 0;
    const questions = document.querySelectorAll('.question-container');

    questions.forEach((question, index) => {
        const input = question.querySelector('input[type="text"]');
        const userAnswer = (input ? input.value.trim().toLowerCase() : "");
        const qIdx = quizOrder[index];
        const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
        input.disabled = true;
        const feedbackEl = document.getElementById(`feedback-${index}`);
        if (userAnswer === correctAnswer) {
            score++;
            feedbackEl.textContent = 'Correct!';
            feedbackEl.style.color = '#2e7d32';
        } else {
            feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
            feedbackEl.style.color = '#c62828';
        }
    });

    // Hide all questions
    questions.forEach(q => q.style.display = 'none');

    // Show score page
    let scorePage = document.getElementById('scorePage');
    if (!scorePage) {
        scorePage = document.createElement('div');
        scorePage.id = 'scorePage';
        scorePage.className = 'score-page';
        document.getElementById('quiz').appendChild(scorePage);
    }
    scorePage.style.display = 'flex';

    const percentage = (score / quizData.length) * 100;
    scorePage.style.backgroundColor = percentage >= 70 ? '#c8e6c9' : '#ffcdd2';
    let extraMsg = '';
    if (percentage === 100) {
        extraMsg = 'iloveyoumoree baby koo galing galing talaga';
    } else if (percentage > 80) {
        extraMsg = 'kunti nalang ma perfect mo po yan baby ko';
    } else if (percentage >= 75) {
        extraMsg = 'galing naman ng baby kooo';
    } else if (percentage >= 50) {
        extraMsg = 'kaya mo yan baby';
    }
    scorePage.innerHTML = `<div style="font-weight:700;font-size:1.2rem;margin-bottom:8px;">Your score: ${score}/${quizData.length} (${percentage.toFixed(2)}%)</div>`
        + (extraMsg ? `<div class="encouragement">${extraMsg}</div>` : '')
        + `<button class="retry-btn" onclick="resetQuiz()" style="margin-top:18px;display:inline-block;">Try Again</button>`;

    // Hide navigation
    document.querySelector('.submit-btn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}


function updateNavigation() {
  const prevBtn = document.getElementById('prevBtn');
  const submitBtn = document.querySelector('.submit-btn');
  const counter = document.getElementById('questionCounter');
  const progress = document.getElementById('progress');

  prevBtn.disabled = currentQuestion === 0;

  // Only show submit button on last question and only enable if last input is disabled (answer submitted)
  let showSubmit = false;
  let enableSubmit = false;
  if (currentQuestion === quizData.length - 1) {
    const lastInput = document.getElementById(`input-${currentQuestion}`);
    if (lastInput) {
      showSubmit = true;
      enableSubmit = lastInput.disabled && lastInput.value.trim() !== "";
    }
  }
  if (showSubmit) {
    submitBtn.style.display = 'block';
    submitBtn.disabled = !enableSubmit;
  } else {
    submitBtn.style.display = 'none';
  }

  counter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  progress.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
  // Hide next button if present
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.style.display = 'none';
  prevBtn.style.display = 'block';
}

function resetQuiz() {
    // Shuffle question order for new try
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    currentQuestion = 0;
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    createQuiz();

    // Hide score page if present
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';

    document.querySelector('.submit-btn').style.display = 'none';
    // Hide all retry buttons except the one on score page
    document.querySelectorAll('.retry-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('prevBtn').style.display = 'block';
    updateNavigation();
}

// Initialize the quiz when the page loads
window.onload = function() {
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    createQuiz();
};
