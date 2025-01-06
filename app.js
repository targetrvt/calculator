const input = document.getElementById("input");
const tmp = document.getElementById("tmp");
const historyList = document.getElementById("history-list");
const historyWrap = document.getElementById("history-wrap");
const toggleHistoryButton = document.getElementById("toggle-history");
const clearHistoryButton = document.getElementById("clear-history");

const updateHistory = (history) => {
    localStorage.setItem('history', JSON.stringify(history));
};

const renderHistory = () => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML = '';
    history.forEach((calc) => {
        const li = document.createElement("li");
        li.textContent = calc;
        historyList.appendChild(li);
    });
};

renderHistory();

toggleHistoryButton.addEventListener("click", () => {
    if (historyWrap.style.display === "none" || historyWrap.style.display === "") {
        historyWrap.style.display = "block";
        toggleHistoryButton.innerText = "Hide History";
    } else {
        historyWrap.style.display = "none";
        toggleHistoryButton.innerText = "Show History";
    }
});

clearHistoryButton.addEventListener("click", () => {
    localStorage.removeItem('history');
    historyList.innerHTML = '';
    historyWrap.style.display = "none";
    toggleHistoryButton.innerText = "Show History";
});

const empty = (element) => {
    element.innerText = "";
};

document.getElementById("all-clear").addEventListener("click", () => {
    empty(input);
    empty(tmp);
});

document.getElementById("clear").addEventListener("click", () => {
    empty(input);
});

document.querySelectorAll(".number").forEach((element) => {
    element.addEventListener("click", () => {
        if (input.innerText.length > 19) return alert("Input exceeds limit");
        input.innerText += element.innerText;
    });
});

document.getElementById("dot").addEventListener("click", () => {
    if (input.innerText.includes(".")) return;
    input.innerText += ".";
});

document.getElementById("sign").addEventListener("click", () => {
    if (input.innerText.startsWith("-")) {
        input.innerText = input.innerText.slice(1);
    } else {
        input.innerText = `-${input.innerText}`;
    }
});

document.querySelectorAll(".amt").forEach((element) => {
    element.addEventListener("click", () => {
        if (input.innerText) {
            if (tmp.innerText) {
                tmp.innerText = `${tmp.innerText} ${input.innerText} ${element.innerText}`;
            } else {
                tmp.innerText = `${input.innerText} ${element.innerText}`;
            }
        } else if (tmp.innerText.slice(-1).match(/-|\+|\*|\//)) {
            let string = tmp.innerText.slice(0, -1);
            string += element.innerText;
            tmp.innerText = string;
        }
        empty(input);
    });
});

document.getElementById("result").addEventListener("click", () => {
    if (input.innerText) {
        const equation = `${tmp.innerText} ${input.innerText}`;
        const result = eval(tmp.innerText + input.innerText); // Be cautious with eval!

        input.innerText = result;

        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(`${equation} = ${result}`);

        if (history.length > 5) {
            history.shift();
        }

        updateHistory(history);
        renderHistory();

        empty(tmp);
    }
});

// Add event listeners for extra buttons
document.getElementById("percent").addEventListener("click", () => {
    if (input.innerText) {
        const percentValue = parseFloat(input.innerText) / 100;
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(`${input.innerText}% = ${percentValue}`);
        updateHistory(history);
        renderHistory();

        input.innerText = percentValue;
    }
});

document.getElementById("square").addEventListener("click", () => {
    if (input.innerText) {
        const squareValue = Math.pow(parseFloat(input.innerText), 2);
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(`${input.innerText}² = ${squareValue}`);
        updateHistory(history);
        renderHistory();

        input.innerText = squareValue;
    }
});

document.getElementById("sqrt").addEventListener("click", () => {
    if (input.innerText) {
        const sqrtValue = Math.sqrt(parseFloat(input.innerText));
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(`√${input.innerText} = ${sqrtValue}`);
        updateHistory(history);
        renderHistory();

        input.innerText = sqrtValue;
    }
});

document.getElementById("open-bracket").addEventListener("click", () => {
    input.innerText += "(";
});

document.getElementById("close-bracket").addEventListener("click", () => {
    input.innerText += ")";
});

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const calculatorContent = document.getElementById("calculator-content");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    calculatorContent.classList.toggle("open");

    if (sidebar.classList.contains("open")) {
        sidebarToggle.innerText = "⟵"; // Change icon to indicate closing
    } else {
        sidebarToggle.innerText = "☰"; // Change icon to indicate opening
    }
});
