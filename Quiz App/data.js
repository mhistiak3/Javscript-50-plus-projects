const quizArray = [
  {
    topic: "HTML",
    questions: [
      {
        question: "What does HTML stand for?",
        choices: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyper Tool Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
        
      },
      {
        question: "What does the 'doctype' declaration do?",
        choices: [
          "Defines the document type",
          "Defines the encoding of the document",
          "Defines the root element of the document",
          "Defines the language of the document",
        ],
        correctAnswer: "Defines the document type",
      },
      {
        question: "What is the correct way to add a comment in HTML?",
        choices: [
          "<!-- This is a comment -->",
          "// This is a comment",
          "# This is a comment",
          "' This is a comment",
        ],
        correctAnswer: "<!-- This is a comment -->",
      },
      {
        question: "What is the purpose of the <meta> tag in HTML?",
        choices: [
          "To define a paragraph of text",
          "To link to an external stylesheet",
          "To specify metadata about the document",
          "To create a navigation menu",
        ],
        correctAnswer: "To specify metadata about the document",
      },
      {
        question: "What is the correct HTML element for the largest heading?",
        choices: ["<h1>", "<h6>", "<head>", "<header>"],
        correctAnswer: "<h1>",
      },
      {
        question: "What does the <canvas> element in HTML5 allow for?",
        choices: [
          "Creating 3D graphics",
          "Drawing graphics using JavaScript",
          "Embedding videos",
          "Playing audio files",
        ],
        correctAnswer: "Drawing graphics using JavaScript",
      },
      {
        question: "What is the correct HTML for creating a hyperlink?",
        choices: [
          "<a href='http://www.example.com'>Example</a>",
          "<link src='http://www.example.com'>Example</link>",
          "<href>http://www.example.com</href>",
          "<link>http://www.example.com</link>",
        ],
        correctAnswer: "<a href='http://www.example.com'>Example</a>",
      },
      {
        question:
          "Which HTML element is used to specify a footer for a document or section?",
        choices: ["<footer>", "<end>", "<bottom>", "<summary>"],
        correctAnswer: "<footer>",
      },
      {
        question:
          "Which attribute is used to provide a unique identifier for an HTML element?",
        choices: ["class", "id", "name", "style"],
        correctAnswer: "id",
      },
      {
        question: "In HTML, which element is used to define a navigation menu?",
        choices: ["<nav>", "<navigation>", "<menu>", "<navbar>"],
        correctAnswer: "<nav>",
      },
    ],
  },
  {
    topic: "CSS",
    questions: [
      {
        question: "What does CSS stand for?",
        choices: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
      },
      {
        question: "What is the 'box-model' in CSS?",
        choices: [
          "It describes how elements are rendered on the web page",
          "It defines the layout of elements using boxes",
          "It sets the default styling for all elements",
          "It specifies the size of the viewport",
        ],
        correctAnswer: "It defines the layout of elements using boxes",
      },
      {
        question:
          "What is the CSS property used to control the stacking order of elements?",
        choices: ["z-index", "position", "display", "float"],
        correctAnswer: "z-index",
      },
      {
        question:
          "Which CSS property is used to set the text color of an element?",
        choices: ["font-color", "color", "text-color", "foreground-color"],
        correctAnswer: "color",
      },
      {
        question:
          "What is the default value of the 'position' property in CSS?",
        choices: ["static", "relative", "absolute", "fixed"],
        correctAnswer: "static",
      },
      {
        question:
          "Which CSS property is used to add shadow effects to elements?",
        choices: ["text-shadow", "box-shadow", "shadow", "element-shadow"],
        correctAnswer: "box-shadow",
      },
      {
        question: "What is the purpose of the 'clearfix' class in CSS?",
        choices: [
          "To clear floats and prevent collapsing of parent elements",
          "To add rounded corners to elements",
          "To create a transparent background",
          "To make text bold and italic",
        ],
        correctAnswer:
          "To clear floats and prevent collapsing of parent elements",
      },
      {
        question: "What does the CSS property 'overflow: hidden' do?",
        choices: [
          "It hides the overflow content of an element",
          "It makes an element's overflow visible",
          "It adds a hidden border around an element",
          "It hides the element completely",
        ],
        correctAnswer: "It hides the overflow content of an element",
      },
      {
        question:
          "What is the CSS property used to set the spacing between lines of text?",
        choices: [
          "letter-spacing",
          "line-height",
          "word-spacing",
          "text-spacing",
        ],
        correctAnswer: "line-height",
      },
      {
        question:
          "Which CSS property is used to control the order of flex items?",
        choices: ["flex-direction", "flex-order", "order", "flex-align"],
        correctAnswer: "order",
      },
    ],
  },
  {
    topic: "JavaScript",
    questions: [
      {
        question: "Which company developed JavaScript?",
        choices: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"],
        correctAnswer: "Netscape",
      },
      {
        question: "What is a closure in JavaScript?",
        choices: [
          "A function with no return value",
          "A way to encapsulate private variables",
          "A built-in method for array manipulation",
          "A type of loop",
        ],
        correctAnswer: "A way to encapsulate private variables",
      },
      {
        question: "What does the 'this' keyword refer to in JavaScript?",
        choices: [
          "The current function",
          "The global object",
          "The calling object",
          "The prototype object",
        ],
        correctAnswer: "The calling object",
      },
      {
        question:
          "What is the correct syntax to include an external JavaScript file named 'script.js'?",
        choices: [
          "<script src='script.js'></script>",
          "<script src='script.js'></script>",
          "<script href='script.js'></script>",
          "<include src='script.js'></include>",
          "<link src='script.js'></link>",
        ],
        correctAnswer: "<script src='script.js'></script>",
      },
      {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["Boolean", "String", "Number", "Character"],
        correctAnswer: "Character",
      },
      {
        question:
          "What is the output of the following code? console.log(1 + '2' + '2');",
        choices: ["122", "32", "14", "NaN"],
        correctAnswer: "122",
      },
      {
        question: "What does the '=== operator' do in JavaScript?",
        choices: [
          "Checks for equality of value and type",
          "Checks for equality of value only",
          "Assigns a value to a variable",
          "Performs bitwise comparison",
        ],
        correctAnswer: "Checks for equality of value and type",
      },
      {
        question:
          "Which function is used to parse a string to an integer in JavaScript?",
        choices: [
          "parseInt()",
          "parseFloat()",
          "toInteger()",
          "convertToInt()",
        ],
        correctAnswer: "parseInt()",
      },
      {
        question: "What is the purpose of the 'new' keyword in JavaScript?",
        choices: [
          "To create a new object instance",
          "To start a new function",
          "To declare a new variable",
          "To define a new class",
        ],
        correctAnswer: "To create a new object instance",
      },
      {
        question:
          "What is the JavaScript function that is used to generate random numbers?",
        choices: ["random()", "Math.random()", "rand()", "generateRandom()"],
        correctAnswer: "Math.random()",
      },
      {
        question: "What does the 'typeof' operator in JavaScript return?",
        choices: [
          "The data type of a variable",
          "The value of a variable",
          "The memory address of a variable",
          "The length of a variable",
        ],
        correctAnswer: "The data type of a variable",
      },
      {
        question:
          "Which method is used to add an element to the end of an array?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
      },
    ],
  },
];
