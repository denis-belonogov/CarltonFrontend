import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../styles/App.css";
import Navigation from "./components/common/Navigation";
import KeysApp from "./components/keys/KeysApp";
import OfferApp from "./components/OfferApp";
import RoomsApp from "./components/rooms/RoomsApp";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<OfferApp />} />
        <Route path="keys" element={<KeysApp />} />
        <Route path="rooms" element={<RoomsApp />} />
      </Routes>
    </Router>
  );
}

export default App;
