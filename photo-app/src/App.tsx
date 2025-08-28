import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Image {
  id: number;
  url: string;
  title: string;
}

function App() {
  const [images, setImages] = useState<Image[] | null>(null)

  useEffect(() => {
    axios
      .get<Image[]>('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        setImages(res.data.slice(0, 10))
      })
  }, [])

  const imageList =
    images &&
    images.map((image) => (
      <div key={image.id}>
        <img src={image.url} alt={image.title} />
        <p>{image.title}</p>
      </div>
    ))

  return (
    <div className="container">
      {imageList ? imageList : <p>loading...</p>}
    </div>
  )
}

export default App
