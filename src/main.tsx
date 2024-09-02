import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './router'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
)
