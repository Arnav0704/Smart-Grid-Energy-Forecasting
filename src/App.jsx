import {Button} from "@/components/ui/button"
import { BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home"
function App() {

  return (
    <BrowserRouter>
      {/* <Button>LOL</Button> */}
      <Home/>
    </BrowserRouter>
  )
}

export default App
