import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { AppBrowserRouter } from './routes/BrowserRouter'

function App() {
  return (
    <>
      <ToastContainer
        position='bottom-right'
        progressStyle={{
          color: "blue",
        }} />
      <AppBrowserRouter />
    </>
  )
}

export default App
