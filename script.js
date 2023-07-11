// Get the element from DOM
const cols = document.querySelectorAll(".col");

// Set random colors to the elements | block , btn , element
function setRandomColors() {
    cols.forEach(elem => {
        const isLocked = elem.querySelector("i").classList.contains("fa-lock");
        const text = elem.querySelector("h2");
        const btn = elem.querySelector("button");
        // generate random color using chroma hex generator
        const color = chroma.random();

        if(isLocked){
            return;
        };

        text.textContent = color;
        elem.style.background = color;

        setTextColor(text,color);
        setTextColor(btn,color);
    })
}

// set the color of the text depending of background color
function setTextColor(text,color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? `black` : `white`;
}


// function that copy text from h2 to clipboard
function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

// first time color generated
setRandomColors()


// generate colors on Space keyboard
document.addEventListener("keydown", event => {
    event.preventDefault();
    if(event.code == "Space") setRandomColors();
})

// block the possibility to change the color of the block element
document.addEventListener("click", event => {
    const type = event.target.dataset.type;

    if(type === "lock") {
        const node = event.target.tagName.toLowerCase() === "i" ? event.target
            : event.target.children[0]

        node.classList.toggle("fa-lock-open");
        node.classList.toggle("fa-lock");
    } else if (type === "copy") {
        copyToClipboard(event.target.textContent);
    }
})
