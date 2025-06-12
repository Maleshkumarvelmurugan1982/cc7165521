import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//rt Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen bg-red-100 p-6'>
        <h1 className='text-3xl font-bold mb-4 text-center'>E-library</h1>

        <div className='flex justify-center space-x-4'>
          <button>Register</button>
          <button>Login</button>
        </div>

        {/*<Home/> */}
      </div>
    </>
  )
}

export default App



