//establishes variables and default values
const tiles = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const main = document.getElementById("tile-area");
let noSelected = 0;
const firstTile = {symbol: 0, position: 99};
const secondTile = {symbol: 0, position: 99};
let score = 0;
let guesses = 0;
let gamesWon = 0;
let totGuesses = 0;
const stats = document.getElementById("table");
const average = document.getElementById("average-score");
const counter = document.createElement("span");
counter.id = "scoreboard";
const counter2 = document.createElement("span");
counter2.id = "guesses";
counter.innerHTML = "Pairs found: " + score; + "<br>"
counter2.innerText = "Guesses: " + guesses;
document.body.append(counter, counter2);

const statToggler = document.getElementById("menu");
statToggler.addEventListener("click", toggle);

function toggle() {
    let table = document.getElementById("table");
    let avg = document.getElementById("average-score");
    if (table.style.display === "none") {  
        table.style.display = "table";      
        avg.style.display = "block";
      } else {
        table.style.display = "none";
        avg.style.display = "none";
      }
}

//sorts tiles into a random order
function randomise() {
    for (let i = tiles.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = k;
}
}

//begins the game, displays tiles face down
randomise();
for (let i = 0; i < tiles.length; i++) {
    let tile = document.createElement("img");
    tile.src = "tile-blank.jpg";
    tile.classList.add("tile");
    tile.id = "t" + i;
    tile.style.gridArea = "t" + i;
    tile.addEventListener("click", turnTile);
    main.append(tile);
}

//flips tiles (max 2)  and runs comparison function if two are flipped
function turnTile(evt) {
    if (noSelected > 1) {
        return;
    }
    else{
        let selected = evt.target;
    console.log(selected);
    selected.src = "";
    console.log(selected.id);
    let tileNo = selected.id.slice (1, 3); 
    console.log(tileNo);

    if (noSelected === 0) {
        firstTile.position = parseInt(tileNo);
        console.log(firstTile.position);
        firstTile.symbol = tiles[firstTile.position];
        checkSymbol(firstTile.symbol, selected.id);
        noSelected++;
    }
    else if (noSelected === 1) {
        noSelected++;   // not actually necessary but more intuitively correct to have this line.
        secondTile.symbol = tiles[tileNo];
        checkSymbol(secondTile.symbol, selected.id);
        secondTile.position = parseInt(tileNo);
        setTimeout(() => compare(firstTile.symbol, secondTile.symbol), 600);
    }
    }
}
    
//displays the correct symbol for the selected tile
function checkSymbol(input, id) {
    switch (input) {
        case 1:
            document.getElementById(id).src = "Knot.png";
            break;
        case 2:
            document.getElementById(id).src = "Wheel-of-Taranis.png";
            break;
        case 3:
            document.getElementById(id).src = "Triquetra.png";
            break;
        case 4:
            document.getElementById(id).src = "Spiral.png";
            break;
        case 5:
            document.getElementById(id).src = "Solomons-Knot.png";
            break;
        case 6:
            document.getElementById(id).src = "Yule.png";
            break;
        case 7:
            document.getElementById(id).src = "Sailors-Knot.png";
            break;
        case 8:
            document.getElementById(id).src = "Lughnasadh.png";
    }
}

//check whether the symbols match
function compare(first, second) {
    if (first === second) {
        score++;
        counter.innerText = "Pairs found: " + score;
        if (score === 8) {setTimeout(() => endGame(), 600);}
    }
    else {
        document.getElementById("t" + firstTile.position).src = "tile-blank.jpg";
        document.getElementById("t" + secondTile.position).src = "tile-blank.jpg";
    }
    guesses++;
    counter2.innerText = "Guesses: " + guesses;
    noSelected = 0;
}

//restarts game, collects statistics
function endGame() {
    alert("You won!");
    // records statistics and resets variables (except guesses)
    gamesWon++;
    noSelected = 0;
    firstTile.symbol = 0;
    firstTile.position = 99;
    secondTile.symbol = 0;
    secondTile.position = 99;
    totGuesses += guesses;
    score = 0;
    // stats in table, resets guesses
    let newrow = document.createElement("tr");
    let gw = document.createElement("td");
    gw.innerText = gamesWon;
    let turns = document.createElement("td");
    turns.innerText = guesses;
    newrow.append(gw, turns);
    stats.append(newrow);
    guesses = 0;
    // average score beneath table
    let avg = Math.round((totGuesses / gamesWon) *10)/10;
    average.innerText = "Average guesses/game: " + avg;
    counter.innerText = "Pairs found: " + score;
    counter2.innerText = "Guesses: " + guesses;
    // flips all tiles back and randomises positions
    let tiles = document.getElementsByClassName("tile")
    for (let tile of tiles) {
        tile.src = "tile-blank.jpg";
    }
    randomise();
}