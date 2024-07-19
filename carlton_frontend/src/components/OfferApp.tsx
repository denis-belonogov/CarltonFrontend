import { addDays, format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { Col, FloatingLabel, Spinner } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/Offer.css";
import { API_URL } from "../constants";

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
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams({
        arrival: arrival_date,
        departure: departure_date,
        adults: n_guests.toString(),
        propertyId: hotel,
      }).toString();
      setLoading(true);
      const response = await fetch(`${API_URL}/offers/?${queryParams}`);
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setOffer(data.offer);
        setCopied(false);
      } else {
        alert("Failed to get offer");
        return;
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <main>
      <Form onSubmit={handleSubmit} className="offer-form">
        <FloatingLabel controlId="formArrivalDate" label="Arrival Date" className="mb-3 offer-form-field">
          <Form.Control type="date" value={arrival_date} onChange={handleArrivalDateChange} />
        </FloatingLabel>
        <FloatingLabel controlId="formDepartureDate" label="Departure Date" className="mb-3 offer-form-field">
          <Form.Control type="date" value={departure_date} onChange={handleDepartureDateChange} />
        </FloatingLabel>
        <FloatingLabel controlId="formNumberOfGuests" label="Number of Guests" className="mb-3 offer-form-field">
          <Form.Control type="number" value={n_guests} onChange={handleGuestsChange} />
        </FloatingLabel>
        <FloatingLabel controlId="formHotel" label="Hotel" className="mb-3 offer-form-field">
          <Form.Select value={hotel} onChange={(e) => handleHotelChange(e as unknown as ChangeEvent<HTMLInputElement>)}>
            <option value="CARLTON">Hotel Carlton</option>
            <option value="SENATOR">Hotel Senator</option>
          </Form.Select>
        </FloatingLabel>
        <Button variant="light" type="submit" className="submit-button offer-form-field">
          <p>Generate Offer</p>
        </Button>{" "}
      </Form>
      {loading && <Spinner animation="border" role="status" />}
      {!loading && (
        <>
          <div className="offer">{offer}</div>
          <div className="offer-form">
            <Col className="d-none d-lg-block offer-form-field"></Col>
            <Col className="mb-3 offer-form-field">
              {offer.length != 0 && (
                <Button
                  className="submit-button offer-form-field"
                  variant="light"
                  onClick={() => {
                    navigator.clipboard.writeText(offer);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                >
                  <p>Copy</p>
                </Button>
              )}
            </Col>{" "}
            <Col className="d-none d-lg-block offer-form-field"></Col>
          </div>
        </>
      )}
      <Alert className="alert" variant="success" show={copied}>
        Offer Text copied to clipboard!
      </Alert>
    </main>
  );
}
