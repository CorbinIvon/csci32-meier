'use client'
import React, { useState, useEffect } from 'react'
import PageLayout from '@/components/client/PageLayout'
import { Input } from '@package/ui/src/input'
import { Button } from '@package/ui/src/button'
import { Size } from '@package/ui/src/size'
import { Variant } from '@package/ui/src/variant'
import getRandomint from '@math/getRandomInt'
import gifs from './gifs'

export default function RandomNumberGuesserGame() {
  // States for game configuration and gameplay
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [transitioning, setTransitioning] = useState(false)
  const [minNumber, setMinNumber] = useState(1)
  const [maxNumber, setMaxNumber] = useState(100)
  const [maxTries, setMaxTries] = useState(5)
  const [targetNumber, setTargetNumber] = useState<number | null>(null)
  const [userGuess, setUserGuess] = useState<number | ''>('')
  const [message, setMessage] = useState<string>('Start guessing...')
  const [guessesLeft, setGuessesLeft] = useState(maxTries)
  const [gameResult, setGameResult] = useState<string | null>(null)
  const [previousGuesses, setPreviousGuesses] = useState<{ guess: number; result: string }[]>([])
  const [showPreviousGuesses, setShowPreviousGuesses] = useState<boolean>(false)
  const [hotAndCold, setHotAndCold] = useState<boolean>(false)
  const [showGuessSuggestions, setShowGuessSuggestions] = useState<boolean>(true)
  const [lowestGuess, setLowestGuess] = useState<number>(minNumber)
  const [highestGuess, setHighestGuess] = useState<number>(maxNumber)

  // Transition Helper: Handle smooth transitions between screens
  const changeScreenWithTransition = (newScreen: string) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentScreen(newScreen)
      setTransitioning(false)
    }, 350)
  }

  // Function to start the game by setting the random number and switching screens
  const startGame = () => {
    setTargetNumber(getRandomint({ min: minNumber, max: maxNumber }))
    setGuessesLeft(maxTries)
    setUserGuess('')
    setMessage('Start guessing...')
    setGameResult(null)
    setPreviousGuesses([])
    setLowestGuess(minNumber)
    setHighestGuess(maxNumber)
    changeScreenWithTransition('game')
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
      changeScreenWithTransition('result')
      return
    }

    const guessNumber = Number(userGuess)
    let result: string = ''
    let recommendation: number = 0

    if (guessesLeft - 1 <= 0) {
      setGameResult('loss')
      changeScreenWithTransition('result')
    }

    if (guessNumber === targetNumber) {
      setMessage('Congratulations! You guessed correctly!')
      setGameResult('win')
      changeScreenWithTransition('result')
    } else if (guessNumber < targetNumber!) {
      result = 'too low'
      recommendation = Math.floor((guessNumber + highestGuess) / 2) // Recommend between the guess and highest guess
      setMessage(`Too low!` + (showGuessSuggestions ? ` Try guessing ${recommendation}.` : ''))
      setLowestGuess(Math.max(lowestGuess, guessNumber))
    } else {
      result = 'too high'
      recommendation = Math.floor((guessNumber + lowestGuess) / 2) // Recommend between the guess and lowest guess
      setMessage(`Too high!` + (showGuessSuggestions ? ` Try guessing ${recommendation}.` : ''))
      setHighestGuess(Math.min(highestGuess, guessNumber))
    }

    setPreviousGuesses([...previousGuesses, { guess: guessNumber, result }])
    setGuessesLeft(guessesLeft - 1)
  }

  // Class for handling the shrinking and expanding effect
  const transitionClasses = transitioning
    ? 'transform scale-0 transition-all duration-500'
    : 'transform scale-100 transition-all duration-500'

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

  function getGameWindowStyle() {
    const baseWindowStyle = `${transitionClasses} p-8 rounded shadow-xl`
    switch (currentScreen) {
      case 'welcome':
      case 'config':
        return `${baseWindowStyle} bg-white `
      case 'game':
        return guessesLeft > 1 ? `${baseWindowStyle} bg-white` : `${baseWindowStyle} bg-red-50`
      case 'result':
        return gameResult === 'win' ? `${baseWindowStyle} bg-green-600` : `${baseWindowStyle} bg-red-400`
    }
    return `${baseWindowStyle} `
  }

  const gameWindow = getGameWindowStyle()
  return (
    <PageLayout className="w-full">
      <div
        className="min-h-screen flex justify-center items-center bg-gray-200"
        style={{ minHeight: `calc(100vh - 130px)` }}
      >
        <div className={gameWindow}>
          <h2 className="text-2xl font-semibold">Random Number Guesser</h2>
          {/* Render welcome, config, game, or result screen based on currentScreen */}
          {currentScreen === 'welcome' && (
            <section className="welcome-screen">
              <p>Welcome to the Random Number Guesser Game!</p>
              <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => changeScreenWithTransition('config')}>
                Start Game
              </Button>
            </section>
          )}

          {currentScreen === 'config' && (
            <section className="config-screen">
              <p>Configure your game settings:</p>
              <div>
                <label>Smallest Number:</label>
                <br />
                <Input
                  type="number"
                  name="minNumber"
                  id="minNumber"
                  value={minNumber}
                  onChange={(e) => setMinNumber(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Largest Number:</label>
                <br />
                <Input
                  type="number"
                  name="maxNumber"
                  id="maxNumber"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Max Tries:</label>
                <br />
                <Input
                  type="number"
                  name="maxTries"
                  id="maxTries"
                  value={maxTries}
                  onChange={(e) => setMaxTries(Number(e.target.value))}
                />
              </div>
              <br />
              <h3 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-600">More Settings!</h3>
              <div>
                <Input
                  type="checkbox"
                  name="showGuessSuggestions"
                  id="showGuessSuggestions"
                  value={showGuessSuggestions}
                  onChange={(e) => setShowGuessSuggestions(e.target.checked)}
                  className="mr-2"
                />
                <label>Show Guess Suggestions</label>
                <Input
                  type="checkbox"
                  name="showPreviousGuesses"
                  id="showPreviousGuesses"
                  value={showPreviousGuesses}
                  onChange={(e) => setShowPreviousGuesses(e.target.checked)}
                  className="mr-2"
                />
                {showPreviousGuesses && (
                  <Input
                    type="checkbox"
                    name="hotAndCold"
                    id="hotAndCold"
                    value={hotAndCold}
                    onChange={(e) => setHotAndCold(e.target.checked)}
                    className="mr-2 ml-6"
                  />
                )}
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
              {guessesLeft > 1 ? <p>Guesses Left: {guessesLeft}</p> : <p>FINAL GUESS (Make it count)</p>}

              {/* Form for input and submit */}
              <form onSubmit={handleGuess}>
                <Input
                  type="number"
                  name="userGuess"
                  id="userGuess"
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
              <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => changeScreenWithTransition('config')}>
                New Game
              </Button>
            </section>
          )}

          {currentScreen === 'result' && (
            <section className="result-screen">
              {gameResult === 'win' ? (
                <>
                  <p>🎉 You Win! Congratulations! 🎉</p>
                  <iframe
                    src={`https://giphy.com/embed/${gifs.win[getRandomint({ min: 0, max: gifs.win.length - 1 })]}`}
                    allowFullScreen
                    className="p-4"
                  />
                </>
              ) : (
                <>
                  <p>😢 Game Over! Better luck next time! 😢</p>
                  <p>The correct number was: {targetNumber}</p>
                  <iframe
                    src={`https://giphy.com/embed/${gifs.lose[getRandomint({ min: 0, max: gifs.lose.length - 1 })]}`}
                    allowFullScreen
                    className="p-4"
                  />
                </>
              )}
              <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => changeScreenWithTransition('config')}>
                Play Again
              </Button>
            </section>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
