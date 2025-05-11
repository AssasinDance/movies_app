import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Rows from './components/rows/rows'

async function rootRender() {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <>
      <Rows />
    </>
  )
}
rootRender()
