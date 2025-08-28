import React from 'react'

interface HeaderProps {
  logo: string
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  return (
    <header className='center'>
      <img src={logo} alt='' />
    </header>
  )
}

export default Header
