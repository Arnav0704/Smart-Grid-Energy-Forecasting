import {Button} from "@/components/ui/button"
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Getstarted  from "./pages/Getstarted";
import { AuthPage } from "./pages/AuthPage";
import Graph  from "./pages/BarGraph";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Getstarted />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
