import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'
import { Character } from './types'
import logo from './img/logo.png'

const App: React.FC = () => {
  const [items, setItems] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios<Character[]>(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      )
      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])

  return (
    <div className='container'>
      <Header logo={logo} />
      <Search getQuery={(q: string) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default App
