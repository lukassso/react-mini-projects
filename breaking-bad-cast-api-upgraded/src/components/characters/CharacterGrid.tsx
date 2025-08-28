import React from 'react'
import CharacterItem from './CharacterItem'
import Spinner from '../ui/Spinner'
import { Character } from '../../types'

interface CharacterGridProps {
  items: Character[]
  isLoading: boolean
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <CharacterItem key={item.char_id} item={item}></CharacterItem>
      ))}
    </section>
  )
}

export default CharacterGrid
