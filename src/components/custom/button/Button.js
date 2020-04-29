import React from 'react'

import { Container } from './StyledButton'

const Button = ({ children, secondButton, ...otherProps }) => {
  return (
    <Container second_button={secondButton} {...otherProps}>
      {children}
    </Container>
  )
}

export default Button
