const input = document.getElementById("input");
const tmp = document.getElementById("tmp");
const historyList = document.getElementById("history-list");
const historyWrap = document.getElementById("history-wrap"); // History section wrapper
const toggleHistoryButton = document.getElementById("toggle-history");
const clearHistoryButton = document.getElementById("clear-history");

// Function to update the history in localStorage
const updateHistory = (history) => {
    localStorage.setItem('history', JSON.stringify(history));
};

// Function to render the history list from localStorage
const renderHistory = () => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML = ''; // Clear existing list before rendering
    history.forEach((calc) => {
        const li = document.createElement("li");
        li.textContent = calc;
        historyList.appendChild(li);
    });
};

// Initial render of history when page loads
renderHistory();

// Toggle history visibility
toggleHistoryButton.addEventListener("click", () => {
    if (historyWrap.style.display === "none" || historyWrap.style.display === "") {
        historyWrap.style.display = "block"; // Show history section
        toggleHistoryButton.innerText = "Hide History"; // Change button text
    } else {
        historyWrap.style.display = "none"; // Hide history section
        toggleHistoryButton.innerText = "Show History"; // Change button text
    }
});

// Clear history
clearHistoryButton.addEventListener("click", () => {
    localStorage.removeItem('history'); // Remove history from localStorage
    historyList.innerHTML = ''; // Clear the UI
    historyWrap.style.display = "none"; // Optionally hide the history after clearing
    toggleHistoryButton.innerText = "Show History"; // Reset the toggle button text
});

// Function to clear the input and temporary screen
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
        // Limit input length
        if (input.innerText.length > 19) return alert("Input exceeds limit");

        input.innerText += element.innerText;
    });
});

document.getElementById("dot").addEventListener("click", () => {
    // Prevent adding multiple dots
    if (input.innerText.includes(".")) return;

    input.innerText += ".";
});

document.getElementById("sign").addEventListener("click", () => {
    // Toggle the sign of the current number
    if (input.innerText.startsWith("-")) {
        input.innerText = input.innerText.slice(1);
    } else {
        input.innerText = `-${input.innerText}`;
    }
});

// Handle operations (divide, multiply, subtract, add)
document.querySelectorAll(".amt").forEach((element) => {
    element.addEventListener("click", () => {
        if (input.innerText) {
            if (tmp.innerText) {
                tmp.innerText = `${tmp.innerText} ${input.innerText} ${element.innerText}`;
            } else {
                tmp.innerText = `${input.innerText} ${element.innerText}`;
            }
        } else if (tmp.innerText.slice(-1).match(/-|\+|\*|\//)) {
            // Replace the last operator if necessary
            let string = tmp.innerText.slice(0, -1);
            string += element.innerText;
            tmp.innerText = string;
        }

        empty(input);
    });
});

document.getElementById("result").addEventListener("click", () => {
    if (input.innerText) {
        // Perform the calculation and store the result
        const result = eval(tmp.innerText + input.innerText);
        input.innerText = result;

        // Save the calculation in history
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(`${tmp.innerText} ${input.innerText} = ${result}`);

        // Limit history to 5 entries
        if (history.length > 5) {
            history.shift(); // Remove the first item if history exceeds 5 items
        }

        // Update history in localStorage and re-render it
        updateHistory(history);
        renderHistory();

        // Clear the temporary screen
        empty(tmp);
    }
});
