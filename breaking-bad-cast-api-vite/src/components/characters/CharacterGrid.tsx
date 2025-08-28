import React from 'react'
import CharacterItem from './CharacterItem'
import Spinner from '../ui/Spinner'
import { Character } from '../../types'
import spinner from '../../img/spinner.gif'

interface CharacterGridProps {
  items: Character[]
  isLoading: boolean
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner spinner={spinner} />
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <CharacterItem key={item.char_id} item={item}></CharacterItem>
      ))}
    </section>
  )
}

export default CharacterGrid
