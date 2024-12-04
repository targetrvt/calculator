const input = document.getElementById("input");

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
        if (input.innerText.length > 19)
            return alert("Kļūda");

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
        input.innerText = eval(tmp.innerText + input.innerText);
        empty(tmp);
    }
});
