const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            expression = "";
            inputBox.value = "";
        } else if (value === "DEL") {
            expression = expression.slice(0, -1);
            inputBox.value = expression;
        } else if (value === "=") {
            inputBox.value = calculate(expression);
            expression = inputBox.value;
        } else {
            expression += value;
            inputBox.value = expression;
        }
    });
});

function calculate(expr) {
    const nums = [];
    const ops = [];
    const precedence = { "+":1, "-":1, "*":2, "/":2, "%":2 };

    function applyOp() {
        const b = nums.pop();
        const a = nums.pop();
        const op = ops.pop();
        switch(op) {
            case "+": nums.push(a + b); break;
            case "-": nums.push(a - b); break;
            case "*": nums.push(a * b); break;
            case "/": nums.push(a / b); break;
            case "%": nums.push(a % b); break;
        }
    }

    let i = 0;
    while (i < expr.length) {
        if (!isNaN(expr[i]) || expr[i] === ".") {
            let num = "";
            while (i < expr.length && (!isNaN(expr[i]) || expr[i] === ".")) {
                num += expr[i++];
            }
            nums.push(parseFloat(num));
        } else {
            while (ops.length && precedence[ops[ops.length-1]] >= precedence[expr[i]]) {
                applyOp();
            }
            ops.push(expr[i]);
            i++;
        }
    }

    while (ops.length) applyOp();

    return nums[0];
}