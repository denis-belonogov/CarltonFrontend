import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../styles/App.css";
import Navigation from "./components/common/Navigation";
import Key from "./components/keys/Key";
import KeysApp from "./components/keys/KeysApp";
import OfferApp from "./components/OfferApp";
import RoomsApp from "./components/rooms/RoomsApp";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<OfferApp />} />
          <Route path="keys" element={<KeysApp />} />
          <Route path="rooms" element={<RoomsApp />} />
          <Route path="key/:id" element={<Key />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
