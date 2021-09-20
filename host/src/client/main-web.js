import 'core-js'
import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

console.log('waiting for application ready...')
loadableReady(() => {
  console.log('application is ready...')
  const root = document.getElementById('main')
  hydrate(<BrowserRouter><App url={window.location.pathname} /></BrowserRouter>, root)
})
