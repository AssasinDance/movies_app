import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import ListOfCards from './components/listOfCards/listOfCards'

async function rootRender() {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <ListOfCards />
    </React.StrictMode>
  )
}
rootRender()
