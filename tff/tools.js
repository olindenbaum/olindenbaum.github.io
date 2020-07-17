folderMap = { "0": "python", "1": "C" }
pythonfiles = ['add-number-0.txt', 'add-number-1.txt', 'add-number-2.txt', 'area-triangle-0.txt', 'armstrong-interval-0.txt', 'armstrong-number-0.txt', 'armstrong-number-1.txt', 'ascii-character-0.txt', 'calculator-0.txt', 'celsius-fahrenheit-0.txt', 'conversion-binary-octal-hexadecimal-0.txt', 'factor-number-0.txt', 'factorial-0.txt', 'fibonacci-sequence-0.txt', 'hcf-0.txt', 'hcf-1.txt', 'hello-world-0.txt', 'km-mile-0.txt', 'lcm-0.txt', 'lcm-1.txt', 'leap-year-0.txt', 'multiplication-table-0.txt', 'number-divisible-0.txt', 'odd-even-0.txt', 'positive-negative-zero-0.txt', 'positive-negative-zero-1.txt', 'power-anonymous-0.txt', 'prime-number-0.txt', 'prime-number-intervals-0.txt', 'quadratic-roots-0.txt', 'shuffle-card-0.txt', 'square-root-0.txt', 'square-root-1.txt', 'sum-natural-number-0.txt', 'swap-variables-0.txt', 'swap-variables-1.txt'];
cfiles = ['add-numbers-0.txt', 'alphabet-0.txt', 'ASCII-value-character-0.txt', 'even-odd-0.txt', 'even-odd-1.txt', 'factorial-0.txt', 'largest-number-three-0.txt', 'largest-number-three-1.txt', 'largest-number-three-2.txt', 'leap-year-0.txt', 'multiplication-table-0.txt', 'multiplication-table-1.txt', 'negative-positive-zero-0.txt', 'negative-positive-zero-1.txt', 'print-integer-0.txt', 'print-sentence-0.txt', 'product-numbers-0.txt', 'remainder-quotient-0.txt', 'sizeof-operator-example-0.txt', 'sum-natural-numbers-0.txt', 'sum-natural-numbers-1.txt', 'sum-natural-numbers-2.txt', 'swapping-0.txt', 'swapping-1.txt', 'vowel-consonant-0.txt'];

function getSnippet() {
    let directory, items;
    let lang = getSelectedLanguage();
    if (lang == 0) {
        directory = "python";
        items = pythonfiles;
    }
    else if (lang == 1) {
        directory = "C";
        items = cfiles;
    }
    var item = items[Math.floor(Math.random() * items.length)];

    var typer = document.getElementById("viewer-code");
    var req = new XMLHttpRequest();
    req.onload = function () {
        typer.innerText = this.responseText;
    };
    req.open('GET', './' + directory + '/' + item);
    req.send();

    var inp = document.getElementById("typer_input");
    inp.value = null;

}

function getSelectedLanguage(){
    return document.getElementById("lang-select").selectedIndex;
}