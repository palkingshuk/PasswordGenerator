let sliderLength = document.querySelector('[lengthDisplay]')
const slider = document.querySelector(".slider")
const symbols = ['!', "!", '#', '$', '%', '^', '&', '*', '?']

function handleSlider() {
    slider.value = passwordLength;
    sliderLength.innerText = passwordLength;
    const min = slider.min;
    const max = slider.max;


    slider.style.backgroundSize = ((passwordLength-min)*100 /(max-min))+"% 100%";
    
}

let passwordLength = 10;
handleSlider();

slider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min)
}


function generateNum() {
    return getRandomInt(0, 9)
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInt(97, 122))
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInt(65, 90))
}

function generateSymbols() {
    return symbols[getRandomInt(0, symbols.length)]
}

const indicator = document.querySelector(".indicator")

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

setIndicator("#ccc");

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const number = document.querySelector('#number');
const symbol = document.querySelector('#symbol');
// checkStrength();
let hasUpper = false;
let hasLower = false;
let hasNumber = false;
let hasSymbol = false;

function checkStrength() {


    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (number.checked) hasNumber = true;
    if (symbol.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
    // const checkArr = [hasLower, hasNumber, hasSymbol, hasUpper]
    // for (let ele in checkArr) {
    //     if(ele == true) checkCount++;
    // }
    // console.log(checkArr)
    // console.log(checkCount)
    // if(passwordLength < checkCount) 
    // {
    //     passwordLength = checkCount
    //     handleSlider();
    // }
}

let copyMessage = document.querySelector(".copyMessage");
let copyBtn = document.querySelector(".copyBtn");
let passwordDisplay = document.querySelector("input[passwordDisplay]");
let password = ""
// passwordDisplay.value = "My Name is Kingshuk";

// Why we use it - https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMessage.innerText = "Copied"
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMessage.innerText = "Failed";
    }

    copyMessage.classList.add('active');

    setTimeout(() => {
        copyMessage.classList.remove('active');
    }, 2000)
}

let checkBoxes = document.querySelectorAll('input[type=checkbox]')
// console.log(checkBoxes)
let checkCount = 0;
function handleCheckbox()
{
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if(checkbox.checked)    
            checkCount++;
    });
    if(passwordLength < checkCount)
    {
        passwordLength = checkCount
        handleSlider()
    }

}

// console.log(checkCount)
checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckbox)
})
// Generate Password
// const passwordDisplay = document.querySelector("#password-display")
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function generatePassword()
{
    
    if(checkCount === 0)  return;
    password = "";
    let funcArr = []
    if(uppercase.checked)   funcArr.push(generateUpperCase)
    if(lowercase.checked)   funcArr.push(generateLowerCase)
    if(symbol.checked)   funcArr.push(generateSymbols)
    if(number.checked)   funcArr.push(generateNum)

    for(let i = 0 ; i < funcArr.length ; i++)
    {
        password += funcArr[i]();
    }

    for(let i = 0 ; i < passwordLength - funcArr.length ; i++)
    {
        let randIndex =  getRandomInt(0,funcArr.length)
        password += funcArr[randIndex]();
    }

    password = shuffle(Array.from(password));
    passwordDisplay.value = password
    checkStrength();
}