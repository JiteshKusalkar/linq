import { forwardRef } from "react";
import { Error, Field, Label, Required, StyledInput } from "./styles";
import { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, id, ...rest }, ref) => {
    return (
      <Field>
        <Label id={id}>
          {label} {required && <Required />}
        </Label>
        <StyledInput ref={ref} id={id} required={required} {...rest} />
        {error && <Error>{error}</Error>}
      </Field>
    );
  }
);

export default Input;
