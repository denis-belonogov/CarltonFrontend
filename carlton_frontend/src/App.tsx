import "./App.css";
import OfferApp from "./components/OfferApp";
import Navigation from "./components/Navigation";
import KeysApp from "./components/KeysApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//let backendUrl: string = "https://localhost:5000/?";
let backendUrl: string = "https://tiefpass.pythonanywhere.com/?";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<OfferApp />} />
        <Route path="/keys" element={<KeysApp />} />
      </Routes>
    </Router>
  );
}

export default App;
