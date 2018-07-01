$(document).ready(function() {
    // Global Variables
    // ---------------------------------------------------

    var words = [["Seoul", "assets/images/Seoul.jpg"], ["Tokyo", "assets/images/Tokyo.jpg"], ["Istanbul", "assets/images/Istanbul.jpg"], ["KualaLumpur", "assets/images/Kuala-Lumpur.jpg"], ["Singapore", "assets/images/Singapore.jpg"], ["NewYork", "assets/images/New-York.jpg"], ["SanFrancisco", "assets/images/San-Francisco.jpg"], ["WashingtonDC", "assets/images/Washington-DC.jpg"], ["Austin", "assets/images/Austin.jpg"], ["Boston", "assets/images/Boston.jpg"], ["Paris", "assets/images/Paris.jpg"], ["London", "assets/images/London.jpg"], ["Vienna", "assets/images/Vienna.jpg"], ["Amsterdam", "assets/images/Amsterdam.jpg"], ["Stockholm", "assets/images/Stockholm.jpg"]] // List of words

    var randomNumber // The index for the list of words
    var word // Pull the word from the list
    var lettersRemaining // What letters are remaining
    var answer // The player's correct answers so far
    var guess // How many guesses the user has left
	var lettersGuessed // What letters has the user guessed
	var win = 0 // How many wins so far

    var gameState = false // The game state - currently not running

    // Event listeners

    document.onkeyup = function(event) {

		// Game state
		if (gameState == false) { // If game is over
			resetGameState()
		}

        if (gameState) { // If the game is still going on
            if (guess == 0) { // If the guess is 0, then it's a loss
				lossState()
			}
			else if (lettersRemaining.length == 0) { // If there are no more letters to choose, then it's a win
				displayWin()
				winState()
			}
			else { // If the game is still going on
				var letter = event.key.toUpperCase()
            	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				if (letters.includes(letter)) { // Is the key pressed a letter?
					if (word.includes(letter)) { // Is the letter in the word?
						for (i=0; i<word.length; i++) { // Go through letters in word and get index of letters and put them in answer, and then remove the letter in lettersRemaining
							if (word[i] == letter) {
								answer[i] = letter
								lettersRemaining = lettersRemaining.replace(letter, "")
							}
						}
					}
					else { // If the letter is not in the word
						if (lettersGuessed.includes(letter) == false) { // If the letter has not been guessed yet
							guess--
							lettersGuessed.push(letter)
						}
					}
				}
			}
        }
		
		display()

    }
    
    // Functions

	// Game states
    function resetGameState() {
        gameState = true
        randomNumber = Math.floor(Math.random()*words.length)
		word = words[randomNumber][0].toUpperCase()
		img = words[randomNumber][1]
        lettersRemaining = word
        answer = []
        for (i=0; i<word.length;i++) {
			if (word[i] != " ") {
				answer.push("_")
			}
			else {
				answer.push("  ")
			}
        }
		guess = 10
		lettersGuessed = []
		$("#correct-word").text("")
	}
	
	function winState() {
		gameState = false
		win++
		resetGameState()
	}
	
	function lossState() {
		gameState = false
		resetGameState()
	}

	// All the things that will be displayed on the screen
	function display() {
		$("#guess-number").text(guess)
		$("#current-word").text(answer.join(" "))
		$("#letters-guessed").text(lettersGuessed.join())
		$("#wins").text(win)
		$("#img").attr("src", img)
		if (guess == 0) {
			displayCorrectWord()
		}
		else if (lettersRemaining == 0) {
			displayWin()
		}
	}
	function displayCorrectWord() {
		$("#correct-word").text("Oh no! The correct word is " + word)
		$("#correct-word").css("color", "red")
	}
	function displayWin() {
		$("#correct-word").text("Correct!")
		$("#correct-word").css("color", "green")
	}
})