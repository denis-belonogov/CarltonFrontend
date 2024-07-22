import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import "../../../styles/KeysForm.css";
import "../../../styles/Offer.css";
import { addKey, getKeys } from "../../services/keysService";
import FloatingTextForm from "../common/FloatingTextForm";

const validationSchema = Yup.object({
  name: Yup.string(),
  brand: Yup.string().required("Please enter a brand"), // Assuming brand is optional
  amount: Yup.number()
    .required("Please enter the quantity of keys")
    .positive("Quantity of keys must be positive")
    .integer("Quantity of keys must be an integer"),
});

const KeysForm = ({ setKeys }: { setKeys: (value: []) => void }) => {
  return (
    <Formik
      initialValues={{ name: "", brand: "", amount: 1 }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addKey(values, () => {
          resetForm();
          getKeys(setKeys);
          setSubmitting(false); // Finish form submission
        });
      }}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit} className="offer-form">
          <FloatingTextForm label="name" name="Key Name" formik={formik} />
          <FloatingTextForm label="brand" name="Key Brand" formik={formik} />
          <FloatingLabel controlId="formKeyQuantity" label="Quantity of Keys" className="mb-3 offer-form-field">
            <Form.Control
              type="number"
              isInvalid={!!(formik.touched.amount && formik.errors.amount)}
              {...formik.getFieldProps("amount")}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.amount}</Form.Control.Feedback>
          </FloatingLabel>
          <div className="break"></div>
          <div className="mb-3 offer-form-field d-none d-lg-block"></div>
          <Button
            variant={formik.dirty && formik.isValid ? "success" : "light"}
            type="submit"
            className="submit-button offer-form-field"
          >
            <p>Add Key</p>
          </Button>{" "}
          <div className="mb-3 offer-form-field d-none d-lg-block"></div>
        </Form>
      )}
    </Formik>
  );
};

export default KeysForm;
