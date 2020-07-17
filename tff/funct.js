var inputElement = document.getElementById("typer_input");
var codeElement = document.getElementById("viewer-code")
var body = document.getElementsByTagName("body");
var BreakException = {};

window.onload = getSnippet();
inputElement.addEventListener('input', () => {
    const codeComparing = codeElement.innerText.split('');
    const comparing = inputElement.value.split('');
    console.log("changed");
    var wrong = null;
    try {
        comparing.forEach((char, i) => {
            if (codeComparing[i] != char) {
                document.body.classList.remove("correct");
                document.body.classList.add("incorrect");
                throw BreakException;
            } else {
                document.body.classList.add("correct");
                document.body.classList.remove("incorrect");

            }

        })
    } catch (e) {
        if (e !== BreakException) throw e;
    };
})

var sel = document.getElementById('lang-select');

 sel.addEventListener("change", getSnippet);