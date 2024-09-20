'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/client/PageLayout'
import { Input } from '@repo/ui/src/input'
import { Button } from '@repo/ui/src/button'
import { Size } from '@repo/ui/src/size'
import { Variant } from '@repo/ui/src/variant'
import getRandomint from '@math/getRandomInt'

export default function RandomNumberGuesserGame() {
  // States for game configuration and gameplay
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [minNumber, setMinNumber] = useState(1)
  const [maxNumber, setMaxNumber] = useState(100)
  const [maxTries, setMaxTries] = useState(5)
  const [targetNumber, setTargetNumber] = useState<number | null>(null)
  const [userGuess, setUserGuess] = useState<number | ''>('')
  const [message, setMessage] = useState<string>('')
  const [guessesLeft, setGuessesLeft] = useState(maxTries)
  const [gameResult, setGameResult] = useState<string | null>(null)
  const [previousGuesses, setPreviousGuesses] = useState<{ guess: number; result: string }[]>([])
  const [showPreviousGuesses, setShowPreviousGuesses] = useState<boolean>(false)
  const [hotAndCold, setHotAndCold] = useState<boolean>(false)

  // Function to start the game by setting the random number and switching screens
  const startGame = () => {
    setTargetNumber(getRandomint({ min: minNumber, max: maxNumber }))
    setGuessesLeft(maxTries)
    setUserGuess('')
    setMessage('Start guessing...')
    setGameResult(null)
    setPreviousGuesses([])
    setCurrentScreen('game')
  }

  // Function to handle guess logic
  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent form submission from refreshing the page

    if (userGuess === '') {
      setMessage('Please enter a number!')
      return
    }

    if (guessesLeft <= 0) {
      setMessage('No more guesses left! Game over!')
      setGameResult('loss')
      setCurrentScreen('result')
      return
    }

    const result = userGuess === targetNumber ? 'correct' : userGuess < targetNumber! ? 'too low' : 'too high'

    setPreviousGuesses([...previousGuesses, { guess: userGuess, result }])

    if (userGuess === targetNumber) {
      setMessage('Congratulations! You guessed correctly!')
      setGameResult('win')
      setCurrentScreen('result')
    } else {
      setMessage(result === 'too low' ? 'Too low! Try again.' : 'Too high! Try again.')
      setGuessesLeft(guessesLeft - 1)
    }

    if (guessesLeft - 1 <= 0) {
      setGameResult('loss')
      setCurrentScreen('result')
    }
  }

  // Function to calculate color for Hot and Cold indicator
  const getColorForGuess = (guess: number) => {
    if (!targetNumber) return '#fff'
    const distance = Math.abs(guess - targetNumber)
    const maxDistance = maxNumber - minNumber
    const relativeDistance = distance / maxDistance
    // Interpolate between blue (far) and red (close)
    const red = Math.round(255 * (1 - relativeDistance))
    const blue = Math.round(255 * relativeDistance)
    return `rgb(${red}, 0, ${blue})`
  }

  return (
    <PageLayout>
      <h2 className="text-2xl font-semibold">Random Number Guesser</h2>

      {/* Render welcome, config, game, or result screen based on currentScreen */}
      {currentScreen === 'welcome' && (
        <section className="welcome-screen">
          <p>Welcome to the Random Number Guesser Game!</p>
          <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => setCurrentScreen('config')}>
            Start Game
          </Button>
        </section>
      )}

      {currentScreen === 'config' && (
        <section className="config-screen">
          <p>Configure your game settings:</p>
          <div>
            <label>Smallest Number:</label>
            <Input type="number" value={minNumber} onChange={(e) => setMinNumber(Number(e.target.value))} />
          </div>
          <div>
            <label>Largest Number:</label>
            <Input type="number" value={maxNumber} onChange={(e) => setMaxNumber(Number(e.target.value))} />
          </div>
          <div>
            <label>Max Tries:</label>
            <Input type="number" value={maxTries} onChange={(e) => setMaxTries(Number(e.target.value))} />
          </div>
          <br />
          <h3 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-600">More Settings!</h3>
          <div>
            <Input
              type="checkbox"
              value={showPreviousGuesses}
              onChange={(e) => setShowPreviousGuesses(e.target.checked)}
              className="mr-2"
            />
            <label>Show Previous Guesses</label>
          </div>
          <div>
            <Input
              type="checkbox"
              value={hotAndCold}
              onChange={(e) => setHotAndCold(e.target.checked)}
              className="mr-2 ml-6"
              disabled={!showPreviousGuesses}
            />
            <label>Enable Hot and Cold indicators</label>
          </div>
          <br />
          <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={startGame}>
            Start Game
          </Button>
        </section>
      )}

      {currentScreen === 'game' && (
        <section className="game-window">
          <p>{message}</p>
          <p>Guesses Left: {guessesLeft}</p>

          {/* Form for input and submit */}
          <form onSubmit={handleGuess}>
            <Input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(Number(e.target.value))}
              placeholder="Enter your guess"
            />

            {/* Button to submit the form */}
            <Button size={Size.MEDIUM} variant={Variant.PRIMARY}>
              Submit Guess
            </Button>
          </form>

          {/* Show previous guesses if the option is enabled */}
          {showPreviousGuesses && previousGuesses.length > 0 && (
            <section className="previous-guesses">
              <h3>Previous Guesses</h3>
              <ul>
                {previousGuesses.map(({ guess, result }, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: hotAndCold ? getColorForGuess(guess) : 'transparent',
                    }}
                  >
                    {guess} was {result}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Button to start a new game */}
          <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => setCurrentScreen('config')}>
            New Game
          </Button>
        </section>
      )}

      {currentScreen === 'result' && (
        <section className="result-screen">
          {gameResult === 'win' ? (
            <p>🎉 You Win! Congratulations! 🎉</p>
          ) : (
            <>
              <p>😢 Game Over! Better luck next time! 😢</p>
              <p>The correct number was: {targetNumber}</p>
            </>
          )}
          <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => setCurrentScreen('config')}>
            Play Again
          </Button>
        </section>
      )}
    </PageLayout>
  )
}
