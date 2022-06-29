import "./App.css";

import {
  BrowserRouter, 
  Routes,
  Route,
  Navigate
} from "react-router-dom"

// Pages
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route 
              path=""
              element={<Home />}
            />
            <Route 
              path="/about"
              element={<About />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}