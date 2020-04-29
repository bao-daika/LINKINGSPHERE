import React from 'react'

import { Container, Input, Label } from './StyledFormInput'

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <Container>
    <Input onChange={handleChange} {...otherProps} />
    {label ? (
      <Label label_length={otherProps.value.length}>{label}</Label>
    ) : null}
  </Container>
)

export default FormInput
