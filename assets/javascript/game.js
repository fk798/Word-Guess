$(document).ready(function() {
    // Global Variables
    // ---------------------------------------------------

    var words = ["Manhattan", "Beijing", "Baltimore", "Shanghai"]

    var randomNumber
    var word
    var lettersRemaining
    var answer
    var guess
	var lettersGuessed
	var win = 0

    var gameState = false

    // Event listeners

    document.onkeyup = function(event) {
        if (gameState) {
            if (guess == 0) {
				gameState = false
			}
			else if (lettersRemaining.length == 0) {
				winState()
			}
			else {
				var letter = event.key.toUpperCase()
            	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				if (letters.includes(letter)) {
					if (word.includes(letter)) {
						for (i=0; i<word.length; i++) {
							if (word[i] == letter) {
								answer[i] = letter
								lettersRemaining = lettersRemaining.replace(letter, "")
							}
						}
					}
					else {
						if (lettersGuessed.includes(letter) == false) {
							guess--
							lettersGuessed.push(letter)
						}
					}
				}
			}
        }
        else {
            resetGameState()
        }

        $("#guess-number").text(guess)
		$("#current-word").text(function () {
			str = ""
			for (i=0; i<answer.length; i++) {
				str+=answer[i]
			}
			return str
		})
		$("#letters-guessed").text(lettersGuessed.join())
		$("#wins").text(win)
    }
    
    // Functions

    function resetGameState() {
        gameState = true
        randomNumber = Math.floor(Math.random()*words.length)
        word = words[randomNumber].toUpperCase()
        lettersRemaining = word
        answer = []
        for (i=0; i<word.length;i++) {
            answer.push("__")
        }
		guess = 10
		lettersGuessed = []

	}
	
	function winState() {
		gameState = false
		win++
	}

})