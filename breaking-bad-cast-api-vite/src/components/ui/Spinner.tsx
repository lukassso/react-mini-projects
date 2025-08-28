import React from 'react'

interface SpinnerProps {
  spinner: string
}

const Spinner: React.FC<SpinnerProps> = ({ spinner }) => {
  return (
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading'
    />
  )
}

export default Spinner
