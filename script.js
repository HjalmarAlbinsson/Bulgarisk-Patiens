var currentCardDistribution = []

function addVariables(cardlist) {
    for (let i = 0; i < cardlist.length; i++) {
        currentCardDistribution.push(cardlist[i])
    }
    currentCardDistribution.sort()
    var root = document.querySelector(":root");
    let itemWidth = `${100/(document.getElementsByClassName("cardstack").length)}%`
    let numberOfCards = (document.getElementsByClassName("img").length)
    if (document.getElementsByClassName("cardstack").length >= 8){
        var numberOfStacksMargin = (document.getElementsByClassName("cardstack").length - 8)
    }
    else{
        var numberOfStacksMargin = 0
    }
    let numberOfStacks = (document.getElementsByClassName("cardstack").length)
    root.style.setProperty("--item-width", itemWidth)
    root.style.setProperty("--number-of-stacks", numberOfStacks)
    root.style.setProperty("--number-of-stacks-margin", numberOfStacksMargin)
    root.style.setProperty("--number-of-cards", numberOfCards)}

function getVal(check) {
    var cardDistribution = document.getElementById('carddistrubution').value;    
    const re = /\d+/g;
    values = cardDistribution.match(re);
    try {var values1 = values.map(Number)}
    catch{values1 = []}
    values1.reverse();
    if (check == false){
        addCards(fixcards(values1))
    } else {
        fixcards(values1)
    }
}

function fixcards(values){
    number = 0
    var cards = 0
    maxlimittext = ""
    stacklimittext = ""
    maxstacklimittext = ""
    let totalNumberOfCards = (document.getElementsByClassName("img").length)

    for (let i = 0; i <= values.length; i++){
        cards += values[i]
        if (values[i] == 0){
            values.splice(i, 1)
            i-=1
        }
        if (totalNumberOfCards + cards > 52){
            maxlimittext = "Card limit reached: (52)" 
            let overNumber = (cards+totalNumberOfCards)-52
            values[i] = values[i] - overNumber
            values = values.slice(0, i+1)
            document.getElementById("button").textContent = "Auto fix & Submit"
            break

        } else if (totalNumberOfCards < 52){
            document.getElementById('button').textContent = "Submit";  
        }
    } 
    document.getElementById("text").innerHTML = `${stacklimittext+" "+maxlimittext+" "+maxstacklimittext}`;
    if (values[0] == 0 && values.length == 1){
        document.getElementById('button').textContent = "- Full -"
        return
    } else {return [values, cards]}
}

function addCards(values) {
    let cards = values[1]
    values = values[0]
    if (document.getElementsByClassName("flex-container").length == 0) {
        var flexContainer = document.createElement('div');
        flexContainer.className = "flex-container"
        document.getElementById("flex-container-parent").appendChild(flexContainer)
    }

    for (let i = 0; i < values.length; i++){
        // Create the outer div element with class "cardstack"
        var cardstackDiv = document.createElement('div');
        cardstackDiv.className = 'cardstack';


        // Create the img element with src, alt, and class attributes

        for (j = 0; j < values[i]; j++) {
            var imgElement = document.createElement('img');
            imgElement.src = 'BaksidaKort.png';
            imgElement.className = "img"
            cardstackDiv.appendChild(imgElement)
        }

        // Return the created cardstack div element
        if (document.querySelector(".flex-container").children.length < 52) {
        var flexContainer = document.querySelector(".flex-container")
        flexContainer.appendChild(cardstackDiv)
        }
    }
    totalNumberOfCards = document.getElementsByClassName("img").length
    if (totalNumberOfCards >= 52) {
        document.getElementById('button').textContent = "- Full -"
    } else if (totalNumberOfCards+cards > 52) {
        document.getElementById('button').textContent = "Auto fix & Submit"
    } else {
        document.getElementById('button').textContent = "Submit"
    }
    addVariables(values)
}

function clearBoard() {
    document.getElementsByClassName("flex-container")[0].remove()
    document.getElementById("text").innerHTML = ""
    document.getElementById('button').textContent = "Submit"
}

numberOfCycles = 0
lastcardDistribution = currentCardDistribution
cardDistributionArray = [currentCardDistribution]
function play() {
    numberOfCycles += 1
    currentCardDistribution = currentCardDistribution.map(item => {
        return item -= 1 })
    
    addedstack = currentCardDistribution.length
    currentCardDistribution = currentCardDistribution.filter(function(value, index){
        return value > 0
    })
    currentCardDistribution.push(addedstack)

    console.log(currentCardDistribution)


    if (currentCardDistribution.toString() == lastcardDistribution.toString()) {
        console.log(`You won! after ${numberOfCycles} cycles`)
        numberOfCycles = 0
    }
    lastcardDistribution = currentCardDistribution

    stringCurrentCardDistribution = currentCardDistribution.map(item => {
        return item.toString() 
    })
    if (stringCurrentCardDistribution.includes(currentCardDistribution.toString)){
        console.log(`You Lost! after ${numberOfCycles} cycles`)
    }
    
    cardDistributionArray.push(currentCardDistribution)
}


function stats() {
    console.log(`Card distrubution: ${currentCardDistribution}`)
    console.log(`Repetition pattern: ${repititionPattern}`)
    console.log(`Repition lenght: ${repititionLength}`)
    console.log(`Number of cycles: ${numberOfCycles}`)
    console.log(`Score: ${score}`)
    console.log(`Card distrubution history: ${cardDistributionHistory}`)
}