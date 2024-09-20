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

  // Function to start the game by setting the random number and switching screens
  const startGame = () => {
    setTargetNumber(getRandomint({ min: minNumber, max: maxNumber }))
    setGuessesLeft(maxTries)
    setUserGuess('')
    setMessage('Start guessing...')
    setGameResult(null)
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

    if (userGuess === targetNumber) {
      setMessage('Congratulations! You guessed correctly!')
      setGameResult('win')
      setCurrentScreen('result')
    } else if (userGuess < targetNumber!) {
      setMessage('Too low! Try again.')
      setGuessesLeft(guessesLeft - 1)
    } else {
      setMessage('Too high! Try again.')
      setGuessesLeft(guessesLeft - 1)
    }

    if (guessesLeft - 1 <= 0) {
      setGameResult('loss')
      setCurrentScreen('result')
    }
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
            <p>😢 Game Over! Better luck next time! 😢</p>
          )}
          <Button size={Size.MEDIUM} variant={Variant.PRIMARY} onClick={() => setCurrentScreen('config')}>
            Play Again
          </Button>
        </section>
      )}
    </PageLayout>
  )
}
