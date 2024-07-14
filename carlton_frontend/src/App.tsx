import { useState } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import { ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

//let backendUrl: string = "https://localhost:5000/?";
let backendUrl: string = "https://tiefpass.pythonanywhere.com/?";

function App() {
  // Initialize date state as a string in 'YYYY-MM-DD' format to match the input type 'date'
  var currentDate = new Date();
  var currentDateString = currentDate.toJSON().slice(0, 10);
  var tomorrow = currentDate;
  tomorrow.setDate(currentDate.getDate() + 1);
  var tomorrowDateString = tomorrow.toJSON().slice(0, 10);
  const [arrival_date, setArrivalDate] = useState(currentDateString);
  const [departure_date, setDepartureDate] = useState(tomorrowDateString);
  const [offer, setOffer] = useState("");
  const [n_guests, setNGuests] = useState(1);
  const [hotel, setHotel] = useState("CARLTON");
  const [copied, setCopied] = useState(false);

  // Function to format the date from the date picker to 'YYYY-MM-DD'
  const handleArrivalDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value; // This will be in 'YYYY-MM-DD' format
    setArrivalDate(newDate);
  };

  const handleDepartureDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value; // This will be in 'YYYY-MM-DD' format
    setDepartureDate(newDate);
  };

  const handleGuestsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNGuests(Number(e.target.value));
  };

  const handleHotelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value; // This will be in 'YYYY-MM-DD' format
    setHotel(newDate);
  };

  async function handleSubmit() {
    const response = await fetch(
      backendUrl +
        new URLSearchParams({
          arrival_date: arrival_date,
          departure_date: departure_date,
          adults: n_guests.toString(),
          propertyId: hotel,
        })
    );
    const data = await response.json();
    setOffer(data.offer);
    setCopied(false);
  }

  return (
    <>
      <nav>
        <img src="/on_hotels_logo.svg" width="250px" height="75px" />
      </nav>
      <main>
        <Row className="g-2">
          <Col md="auto" className="g-2-col">
            <Form.Label>
              <p>Arrival Date</p>
            </Form.Label>
          </Col>
          <Col md="auto" className="g-2-col">
            <Form.Control
              type="date"
              value={arrival_date} // date is now a string, compatible with input type 'date'
              onChange={handleArrivalDateChange} // Use the new handler function
            />
          </Col>

          <Col md="auto" className="g-2-col">
            <Form.Label>
              <p>Departure Date</p>
            </Form.Label>
          </Col>
          <Col md="auto" className="g-2-col">
            <Form.Control
              type="date"
              value={departure_date} // date is now a string, compatible with input type 'date'
              onChange={handleDepartureDateChange} // Use the new handler function
            />
          </Col>

          <Col md="auto" className="g-2-col">
            <Form.Label>
              <p>Number of guests</p>
            </Form.Label>
          </Col>
          <Col md="auto" className="g-2-col">
            <Form.Control
              className="n_guests_picker"
              type="number"
              value={n_guests} // date is now a string, compatible with input type 'date'
              onChange={handleGuestsChange} // Use the new handler function
            />
          </Col>
          <Col md="auto" className="g-2-col">
            <Form.Select
              value={hotel}
              onChange={(e) =>
                handleHotelChange(e as unknown as ChangeEvent<HTMLInputElement>)
              }
            >
              <option value="CARLTON">Hotel Carlton</option>
              <option value="SENATOR">Hotel Senator</option>
            </Form.Select>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSubmit}>
          Generate Offer
        </Button>{" "}
        <div className="offer">{offer}</div>
        {offer.length != 0 && (
          <Button
            className="copy_button"
            variant="primary"
            onClick={() => {
              navigator.clipboard.writeText(offer);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            Copy
          </Button>
        )}
        <Alert className="alert" variant="success" show={copied}>
          Offer Text copied to clipboard!
        </Alert>
      </main>
    </>
  );
}

export default App;
