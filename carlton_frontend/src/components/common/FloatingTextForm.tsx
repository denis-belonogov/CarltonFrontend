import React, { Dispatch, SetStateAction } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface FloatingTextFormProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const FloatingTextForm: React.FC<FloatingTextFormProps> = ({ label, value, setValue }) => {
  return (
    <FloatingLabel controlId={`form${label.replace(" ", "")}`} label={label} className="mb-3 offer-form-field">
      <Form.Control type="text" placeholder={label} value={value} onChange={(e) => setValue(e.target.value)} />
    </FloatingLabel>
  );
};

export default FloatingTextForm;
