import { useEffect, useState } from 'react'
import './Loader.css'

const Loader = () => {
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const exitTimer = setTimeout(() => setPhase('exiting'), 1300)
    const doneTimer = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2050)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loader ${phase === 'exiting' ? 'is-exiting' : ''}`}>
      <div className="loader-inner">
        <div className="loader-logo">
          Fruitivo
          <span>.</span>
          <svg className="loader-logo-leaf" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 20c0-8 6-14 14-14 0 8-6 14-14 14Z" fill="#4CAF50" />
          </svg>
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  )
}

export default Loader
