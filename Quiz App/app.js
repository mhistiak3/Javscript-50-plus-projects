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

  quizsContent.innerHTML = ` <div class="card mt-4 p-4">
  <div class='mb-2'><span class='bg-success p-1 rounded-1 text-white'>${topic}</span></div>
          <h3>${escapeHTML(question)}</h3>
          <div class="row gy-3 mt-2">
            <div class="col-12">
             <div class="bg-dark text-white p-2 px-3 rounded-2">
             <label> <input type="radio" class="me-2 form-check-input" name="${topic}-${quizNumber}" onchange="quizOptionChange(${quizNumber},0)">
               <span>${escapeHTML(choices[0])}</span></label>
             </div>
            </div>
            <div class="col-12">
             <div class="bg-dark text-white p-2 px-3 rounded-2">
              <label>
              <input type="radio" class="me-2 form-check-input" name="${topic}-${quizNumber}" onchange="quizOptionChange(${quizNumber},1)">
               <span>${escapeHTML(choices[1])}</span> </label>
             </div>
            </div>
            <div class="col-12">
             <div class="bg-dark text-white p-2 px-3 rounded-2">
              <label>
              <input type="radio" class="me-2 form-check-input" name="${topic}-${quizNumber}" onchange="quizOptionChange(${quizNumber},2)">
               <span>${escapeHTML(choices[2])}</span> </label>
             </div>
            </div>
            <div class="col-12">
             <div class="bg-dark text-white p-2 px-3 rounded-2"> <label>
              <input type="radio" class="me-2 form-check-input" name="${topic}-${quizNumber}" onchange="quizOptionChange(${quizNumber},3)">
               <span>${escapeHTML(choices[3])}</span> </label>
             </div>
            </div>
          
          </div>
        </div>`;
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
      return `<div class="col-12">
              <div class="mb-2">
                <span class="bg-dark text-white rounded-1 p-1">${
                  datas[option.type].topic
                } Question-${option.number + 1}:</span>
              </div>
              <h5>Your Answare: ${escapeHTML(option.user)}</h5>
              <h5>Correct Answare: ${escapeHTML(option.correct)}</h5>
              <button class="btn btn-${
                option.isCorrect ? "success" : "danger"
              }">Your answare is 
              ${option.isCorrect ? "Correct" : "Wrong"}</button>
              <hr>
            </div>`;
    })
    .join("");
  modalContent.innerHTML = htmlContent;
}
