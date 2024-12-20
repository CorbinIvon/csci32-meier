'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/client/PageLayout'
import { Input } from '@package/ui/src/input'
import { Button } from '@package/ui/src/button'
import { Size } from '@package/ui/src/size'
import { Variant } from '@package/ui/src/variant'

const Csci32AssignmentWeek4 = () => {
  const [inputValueName, setInputValueName] = useState('')
  const [inputValueFavoriteAnimal, setInputValueFavoriteAnimal] = useState('')
  const [inputValueHighestScore, setInputValueHighestScore] = useState('')

  return (
    <PageLayout>
      <h2 className="text-2xl font-semibold">Week 4 - Input Component and Random Number Guesser</h2>
      <p>
        This week I&apos;ve created an input component that can be used to take user input. Below are the examples of
        the input component.
      </p>
      <section>
        <br />
        <hr />
        <br />
        <h3 className="text-xl font-semibold">Input Component</h3>
        <p>Go ahead and try out the input component below.</p>
        <br />
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              size={Size.MEDIUM}
              variant={Variant.PRIMARY}
              placeholder="Enter your name"
              name="name"
              id="name"
              value={inputValueName}
              onChange={(e) => setInputValueName(e.target.value)}
            />
            <Button
              size={Size.MEDIUM}
              variant={Variant.PRIMARY}
              onClick={() => alert(`The name you typed: ${inputValueName}`)}
            >
              Name
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              size={Size.MEDIUM}
              variant={Variant.SECONDARY}
              placeholder="Enter your favorite animal"
              name="favAnimal"
              id="favAnimal"
              value={inputValueFavoriteAnimal}
              onChange={(e) => setInputValueFavoriteAnimal(e.target.value)}
            />
            <Button
              size={Size.MEDIUM}
              variant={Variant.SECONDARY}
              onClick={() => alert(`Your favorite animal: ${inputValueFavoriteAnimal}`)}
            >
              Favorite Animal
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              size={Size.MEDIUM}
              variant={Variant.TERTIARY}
              placeholder="Enter your highest score"
              name="highestScore"
              id="highestScore"
              value={inputValueHighestScore}
              onChange={(e) => setInputValueHighestScore(e.target.value)}
            />
            <Button
              size={Size.MEDIUM}
              variant={Variant.TERTIARY}
              onClick={() => alert(`Your highest score: ${inputValueHighestScore}`)}
            >
              Highest Score
            </Button>
          </div>
        </div>
      </section>
      <section>
        <br />
        <hr />
        <br />
        <h3 className="text-xl font-semibold">Random Number Guesser</h3>
        <Button
          size={Size.MEDIUM}
          variant={Variant.PRIMARY}
          onClick={() => (location.href = '/games/random-number-guesser')}
        >
          Go to Game
        </Button>
      </section>
    </PageLayout>
  )
}

export default Csci32AssignmentWeek4
