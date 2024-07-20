import { Formik } from "formik";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { addRoom, getRooms } from "../../services/roomsService"; // Hypothetical service
import FloatingTextForm from "../common/FloatingTextForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a room name"),
  type: Yup.number().required("Please select a room type"),
  floor: Yup.number()
    .required("Please enter a floor number")
    .min(-1, "Floor must be at least -1")
    .integer("Floor must be an integer"),
});

const RoomsForm = ({ setRooms }: { setRooms: (value: []) => void }) => {
  return (
    <Formik
      initialValues={{ name: "", type: 1, floor: 1 }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addRoom(values, () => {
          getRooms(setRooms);
          resetForm();
          setSubmitting(false);
        });
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit} className="offer-form">
          <FloatingTextForm label="name" name="Room Name" formik={formik} />
          <FloatingLabel controlId="formKeyAmount" label="Floor" className="mb-3 offer-form-field">
            <Form.Control
              type="number"
              placeholder="Floor"
              isInvalid={!!(formik.touched.floor && formik.errors.floor)}
              {...formik.getFieldProps("floor")}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.floor}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="Room Type" className="mb-3 offer-form-field">
            <Form.Select aria-label="Default select example" {...formik.getFieldProps("type")}>
              <option value="1">Guest</option>
              <option value="2">Staff</option>
            </Form.Select>
          </FloatingLabel>
          <div className="break"></div>
          <div className="mb-3 offer-form-field d-none d-lg-block"></div>
          <Button
            variant={formik.dirty && formik.isValid ? "success" : "light"}
            type="submit"
            className="mb-3 offer-form-field submit-button"
          >
            <p>Add Room</p>
          </Button>{" "}
          <div className="mb-3 offer-form-field d-none d-lg-block"></div>
        </Form>
      )}
    </Formik>
  );
};

export default RoomsForm;
