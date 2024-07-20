import { addDays, format } from "date-fns";
import { Formik } from "formik";
import { useState } from "react";
import { FloatingLabel, Spinner } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import "../../styles/Offer.css";
import { API_URL } from "../constants";

const validationSchema = Yup.object({
  arrival_date: Yup.date()
    .required("Please enter arrival date")
    .min(addDays(new Date(), -1), "Arrival date must be in the future"),
  departure_date: Yup.date()
    .required("Please enter departure date")
    .when("arrival_date", (arrival_date, schema) => {
      const arrivalDate = arrival_date ? new Date(arrival_date.toString()) : new Date();
      return schema.min(addDays(arrivalDate, 1), "Departure date should be after the arrival date");
    }),
  adults: Yup.number()
    .required("Please enter number of guests")
    .min(1, "Number of guests must be between 1 and 3")
    .max(3, "Number of guests must be between 1 and 3"),
  hotel: Yup.string(),
});

export default function OfferApp() {
  const currentDate = new Date();
  const currentDateString = format(currentDate, "yyyy-MM-dd");
  const tomorrowDateString = format(addDays(currentDate, 1), "yyyy-MM-dd");
  const [offer, setOffer] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <Formik
        initialValues={{
          arrival_date: currentDateString,
          departure_date: tomorrowDateString,
          adults: 1,
          hotel: "CARLTON",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const queryParams = new URLSearchParams({
              arrival: values.arrival_date,
              departure: values.departure_date,
              adults: values.adults.toString(),
              propertyId: values.hotel.toString(),
            }).toString();
            setLoading(true);
            const response = await fetch(`${API_URL}/offers/?${queryParams}`);
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
              resetForm();
              setOffer(data.offer);
              setCopied(false);
              setSubmitting(false); // Finish form submission
            } else {
              alert("Failed to get offer");
              return;
            }
          } catch (error) {
            alert(error);
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="offer-form">
            <FloatingLabel controlId="formArrivalDate" label="Arrival Date" className="mb-3 offer-form-field">
              <Form.Control
                type="date"
                {...formik.getFieldProps("arrival_date")}
                isInvalid={!!(formik.touched.arrival_date && formik.errors.arrival_date)}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.arrival_date}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="formDepartureDate" label="Departure Date" className="mb-3 offer-form-field">
              <Form.Control
                type="date"
                {...formik.getFieldProps("departure_date")}
                isInvalid={!!(formik.touched.departure_date && formik.errors.departure_date)}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.departure_date}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="formNumberOfGuests" label="Number of Guests" className="mb-3 offer-form-field">
              <Form.Control
                type="number"
                {...formik.getFieldProps("adults")}
                isInvalid={!!(formik.touched.adults && formik.errors.adults)}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.adults}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="formHotel" label="Hotel" className="mb-3 offer-form-field">
              <Form.Select {...formik.getFieldProps("hotel")}>
                <option value="CARLTON">Hotel Carlton</option>
                <option value="SENATOR">Hotel Senator</option>
              </Form.Select>
            </FloatingLabel>
            <div className="break"></div>
            <div className="mb-3 offer-form-field d-none d-lg-block"></div>
            <Button
              variant={formik.isValid ? "success" : "light"}
              type="submit"
              className="submit-button offer-form-field"
            >
              <p>Generate Offer</p>
            </Button>{" "}
            <div className="mb-3 offer-form-field d-none d-lg-block"></div>
            <div className="break"></div>
            {loading && <Spinner animation="border" role="status" />}
            {!loading && <div className="offer">{offer}</div>}
            {offer.length != 0 && (
              <>
                <div className="break"></div>
                <div className="mb-3 offer-form-field d-none d-lg-block"></div>
                {!loading && (
                  <Button
                    className="submit-button offer-form-field"
                    variant="success"
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

                <div className="mb-3 offer-form-field d-none d-lg-block"></div>
              </>
            )}
          </Form>
        )}
      </Formik>
      <Alert className="alert" variant="success" show={copied}>
        Offer Text copied to clipboard!
      </Alert>
    </main>
  );
}
