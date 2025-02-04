// Array of predefined RGB colors
const colors = [
    "rgb(255, 255, 0)",   
    "rgb(255, 192, 203)", 
    "rgb(0, 0, 255)",     
    "rgb(255, 0, 0)",     
    "rgb(128, 0, 128)",   
    "rgb(0, 128, 0)"      
];

let targetColor; 
let score = 0;   


// Function to generate shades of a given base color
function generateShades(baseRgb) { 
    let shades = [];
    let adjustments = [-100, -50, -40, 30, 60, 100];

    for (let amount of adjustments) {
        let shade = adjustColorBrightness(baseRgb, amount);
        shades.push(shade);
    }

    
    if (!shades.includes(baseRgb)) {
        shades[Math.floor(Math.random() * shades.length)] = baseRgb;
    }

    return shades;
}


// Function to adjust the brightness of an RGB color
function adjustColorBrightness(rgb, amount) {
    let rgbValues = rgb.match(/\d+/g).map(Number);
    let [r, g, b] = rgbValues.map(value => 
        Math.min(255, Math.max(0, value + amount)) 
    );

    return `rgb(${r}, ${g}, ${b})`;
}

// Main function to start the game
function setupGame() {
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    targetColor = colors[randomIndex];
    
   
    document.getElementById("colorBox").style.backgroundColor = targetColor;

   
    let shades = generateShades(targetColor);

   
    const buttons = document.querySelectorAll(".color-btn");
    let shuffledColors = shades.sort(() => Math.random() - 0.5);

    buttons.forEach((button, index) => {
        button.style.backgroundColor = shuffledColors[index];  
        button.setAttribute("data-color", shuffledColors[index]); 
        button.onclick = checkGuess; 
    });
}


// Function to check if the guess is correct
function checkGuess(event) {
    let selectedColor = event.target.getAttribute("data-color");
    const statusElement = document.getElementById("gameStatus");

    
    const normalize = (color) => color.replace(/\s/g, "").toLowerCase();

    if (normalize(selectedColor) === normalize(targetColor)) {
        document.body.classList.add("correct-answer");
        statusElement.innerHTML = "✅ Great job! Keep going!";

        setTimeout(() => {
            document.body.classList.remove("correct-answer");
            updateScore();
            setupGame();
            statusElement.innerHTML = "";
        }, 1500);
    } else {
        event.target.classList.add("wrong-answer");
        statusElement.innerHTML = "😢 Oops! Not quite. Try again!";

        setTimeout(() => {
            event.target.classList.remove("wrong-answer");
            statusElement.innerHTML = "";
        }, 1500);
    }
}

// Function to update score
function updateScore() {
    score++; 
    document.getElementById("score").textContent = "Score: " + score;
}


// Function to reset the game
function resetGame() {
    score = 0; 
    document.getElementById("score").textContent = "Score: 0"; 
    setupGame(); 
}


document.getElementById("newGameButton").addEventListener("click", resetGame);


window.onload = setupGame;
