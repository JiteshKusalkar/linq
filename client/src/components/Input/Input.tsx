import { forwardRef } from "react";
import { Field, Label, StyledInput } from "./styles";
import { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...rest }: InputProps) => {
    return (
      <Field>
        <Label id={id}>{label}</Label>
        <StyledInput id={id} {...rest} />
      </Field>
    );
  }
);

export default Input;
