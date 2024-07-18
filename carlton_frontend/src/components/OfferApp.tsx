import { ChangeEvent, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { API_URL } from "../constants";
import { format, addDays } from "date-fns";
import "../../styles/Offer.css";

export default function OfferApp() {
  const currentDate = new Date();
  const currentDateString = format(currentDate, "yyyy-MM-dd");
  const tomorrowDateString = format(addDays(currentDate, 1), "yyyy-MM-dd");
  const [arrival_date, setArrivalDate] = useState(currentDateString);
  const [departure_date, setDepartureDate] = useState(tomorrowDateString);
  const [offer, setOffer] = useState("");
  const [n_guests, setNGuests] = useState(1);
  const [hotel, setHotel] = useState("CARLTON");
  const [copied, setCopied] = useState(false);

  const handleArrivalDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArrivalDate(e.target.value);
  };

  const handleDepartureDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(e.target.value);
  };

  const handleGuestsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNGuests(Number(e.target.value));
  };

  const handleHotelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHotel(e.target.value);
  };

  async function handleSubmit() {
    try {
      const queryParams = new URLSearchParams({
        arrival: arrival_date,
        departure: departure_date,
        adults: n_guests.toString(),
        propertyId: hotel,
      }).toString();

      const response = await fetch(`${API_URL}/offers?${queryParams}`);
      const data = await response.json();
      if (!response.ok) {
        alert("Failed to get offer");
        return;
      }
      setOffer(data.offer);
      setCopied(false);
    } catch (error) {
      alert("Failed to get offer");
    }
  }

  return (
    <main>
      <Row className="g-2">
        <Col md="auto" className="g-2-col">
          <Form.Label>
            <p>Arrival Date</p>
          </Form.Label>
        </Col>
        <Col md="auto" className="g-2-col">
          <Form.Control type="date" value={arrival_date} onChange={handleArrivalDateChange} />
        </Col>

        <Col md="auto" className="g-2-col">
          <Form.Label>
            <p>Departure Date</p>
          </Form.Label>
        </Col>
        <Col md="auto" className="g-2-col">
          <Form.Control type="date" value={departure_date} onChange={handleDepartureDateChange} />
        </Col>

        <Col md="auto" className="g-2-col">
          <Form.Label>
            <p>Number of guests</p>
          </Form.Label>
        </Col>
        <Col md="auto" className="g-2-col">
          <Form.Control className="n_guests_picker" type="number" value={n_guests} onChange={handleGuestsChange} />
        </Col>
        <Col md="auto" className="g-2-col">
          <Form.Select value={hotel} onChange={(e) => handleHotelChange(e as unknown as ChangeEvent<HTMLInputElement>)}>
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
  );
}
