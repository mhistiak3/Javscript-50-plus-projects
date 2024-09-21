// Data
let datas = [...quizArray];
// global state
let quizNumber = 0;
let quizType = 0;
let rightWrongOption = [];

// Slect HTML
let quizsContent = document.getElementById("quizs");
let showBtn = document.getElementById("showBtn");
let nextBtn = document.getElementById("nextBtn");
let modal = document.getElementById("modal");
let modalContent = document.getElementById("modalContent");

// Events
nextBtn.addEventListener("click", changeQuiz);

// Start Quiz Function
function startQuiz(type) {
  quizType = type;
  datas[quizType];
  selectedQuiz(datas[quizType]);
  nextBtn.disabled = true;
}

// escape html
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Single Quiz Function
function selectedQuiz({ topic, questions }) {
  showBtn.classList.remove("d-none");

  let { question, choices } = questions[quizNumber];

  quizsContent.innerHTML = `
  <div class="card mt-4 p-4 shadow-lg border-0 rounded-3 bg-light">
    <div class='mb-3'>
      <span class='badge bg-success text-uppercase fw-bold p-2'>${topic}</span>
    </div>
    <h3 class="text-primary fw-bold">${escapeHTML(question)}</h3>
    <div class="row gy-3 mt-4">
      ${choices
        .map(
          (choice, index) => `
        <div class="col-12">
          <div class="option bg-white p-3 border rounded-3 shadow-sm d-flex align-items-center">
            <label class="w-100 d-flex align-items-center">
              <input type="radio" class="me-3 form-check-input" name="${topic}-${quizNumber}" onchange="quizOptionChange(${quizNumber},${index})">
              <span class="fw-normal text-dark">${escapeHTML(choice)}</span>
            </label>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  </div>
`;
}

// Change Quiz Function
function changeQuiz() {
  if (quizNumber > 8) {
    console.log(showModal());
  } else {
    quizNumber++;
  }
  nextBtn.disabled = !nextBtn.disabled;
  selectedQuiz(datas[quizType]);
}

// quiz option change
function quizOptionChange(quizNumber, selectedQuiz) {
  nextBtn.disabled = false;
  let userAnsware = datas[quizType].questions[quizNumber].choices[selectedQuiz];
  let correctAnsware = datas[quizType].questions[quizNumber].correctAnswer;

  if (!rightWrongOption[quizNumber]) {
    let obj = {
      number: quizNumber,
      type: quizType,
      user: userAnsware,
      correct: correctAnsware,
      isCorrect: userAnsware === correctAnsware ? true : false,
    };
    rightWrongOption.push(obj);
  }
  console.log(rightWrongOption);
}

// show result
function showModal() {
  modal.classList.remove("d-none");
  let htmlContent = "";
  htmlContent += rightWrongOption
    .map((option) => {
      return `
        <div class="col-12 p-3 mb-4 shadow-sm rounded-3 bg-light">
          <div class="mb-3">
            <span class="badge bg-secondary text-uppercase px-2 py-1">${
              datas[option.type].topic
            } Question-${option.number + 1}:</span>
          </div>
          <div class="answers">
            <div class="user-answer p-3 rounded-2 mb-2 ${
              option.isCorrect
                ? "bg-success text-white"
                : "bg-danger text-white"
            }">
              <strong>Your Answer: </strong> ${escapeHTML(option.user)}
            </div>
${
  option.isCorrect ? (
    ""
  ) : (
   ` <div class="correct-answer p-3 rounded-2 mb-2 bg-info text-dark">
      <strong>Correct Answer: </strong> ${escapeHTML(option.correct)}
    </div>`
  )
}
            

          </div>
         
        </div>`;
    })
    .join("");
  modalContent.innerHTML = htmlContent;
}
