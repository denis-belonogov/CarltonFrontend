import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const FloatingTextForm = ({ label, name, formik }: { label: string; name: string; formik: any }) => {
  const meta = formik.getFieldMeta(label);
  return (
    <FloatingLabel controlId={`form${label.replace(" ", "")}`} label={name} className="mb-3 offer-form-field">
      <Form.Control
        type="text"
        name={name}
        placeholder={name}
        {...formik.getFieldProps(label)}
        isInvalid={meta.touched && meta.error}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </FloatingLabel>
  );
};

export default FloatingTextForm;
