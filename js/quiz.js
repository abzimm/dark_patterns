const questionState = {
    value: 0,
    increment() {
        this.value++;
    },
};

const quizActive = {
    value: true,
    deactivate() {
        this.value = false;
    },
};

const userStats = [0, 0, 0, 0, 0, 0];
let tempStats = [...userStats];

const questionText = ["How much time do you spend online?", "It's snack time. What are you eating?"]; // (unchanged)

const answerText = [["Playing Neopets",
    "Playing Kingdom of Loathing",
    "Trolling chatrooms",
    "Playing Quake or Doom",
    "I didn't have the internet",
    "Watching flash videos"],

//question 2 answers
["Yowie",
    "Curly Wurlys and Chomps",
    "Mamee Noodles",
    "Fruit",
    "Sunnyboys",
    "Fruit rollups"]] // (unchanged)

const answerValues = [[

    [3, 0, 1, 0, 2, 0],
    [0, 0, 0, 1, 2, 3],
    [0, 3, 0, 2, 1, 0],
    [0, 2, 0, 3, 0, 1],
    [2, 1, 3, 0, 0, 0],
    [1, 0, 2, 0, 3, 0]
],

//question 2 answer values
[[0, 3, 0, 2, 0, 1],
[2, 0, 0, 0, 3, 1],
[0, 2, 0, 0, 1, 3],
[2, 0, 3, 1, 0, 0],
[1, 0, 0, 3, 2, 0],
[3, 0, 1, 0, 2, 0]
]
]; // (unchanged)

const elements = {
    results: document.getElementById("results"),
    quiz: document.getElementById("quiz"),
    printResult: document.getElementById("topScore"),
    buttonElement: document.getElementById("button"),
};

elements.buttonElement.addEventListener("click", changeState);

function changeState() {
    updatePersonality();
    if (quizActive.value) {
        initText(questionState.value);
        questionState.increment();
        disableButton("Please select an answer");
    } else {
        setCustomPage();
    }
}

function initText(question) {
    let answerSelection = "";
    for (const answer of answerText[question]) {
        answerSelection += `<li><input type='radio' name='question${question + 1}' onClick='setAnswer(${answerText[question].indexOf(answer)})' id='${answer}'><label for='${answer}'>${answer}</label></li>`;
    }
    document.getElementById("questions").innerHTML = questionText[question];
    document.getElementById("answers").innerHTML = answerSelection;
}

function setAnswer(input) {
    clearTempStats();
    tempStats = answerValues[questionState.value - 1][input];
    if (questionState.value < questionText.length) {
        updateButton("Continue", false, 1);
    } else {
        quizActive.deactivate();
        updateButton("Display your custom website", false, 1);
    }
}

function clearTempStats() {
    tempStats = Array(userStats.length).fill(0);
}

function updatePersonality() {
    for (let i = 0; i < userStats.length; i++) {
        userStats[i] += tempStats[i];
    }
}

function setCustomPage() {
    const highestStatPosition = userStats.indexOf(Math.max(...userStats));
    displayCustomPage(highestStatPosition);
    elements.quiz.style.display = "none";
}

function displayCustomPage(personality) {
    const { results, printResult, buttonElement } = elements;
    const styles = {
        cute: { display: "inline-block", background: "url('...')", cursor: "url(...), auto" },
        spooky: { display: "inline-block", background: "url('...')", cursor: "url(...), auto" },
        // Add styles for other personalities
    };

    if (styles[personality]) {
        const { display, ...styleProperties } = styles[personality];
        results.style.display = display;
        results.classList.add(personality);
        Object.assign(document.body.style, styleProperties);
        printResult.innerText = personality;
    } else {
        document.getElementById("error").style.display = "inline-block";
    }
}

function disableButton(text) {
    updateButton(text, true, 0.7);
}

function updateButton(text, disabled, opacity) {
    const { buttonElement } = elements;
    buttonElement.innerHTML = text;
    buttonElement.disabled = disabled;
    buttonElement.style.opacity = opacity;
}
