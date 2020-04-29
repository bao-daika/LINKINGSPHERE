import React from 'react'
import { Link } from 'react-router-dom'

import { auth, createUserProfileDocument } from 'firebase/firebase.utils'

import { FormInput, Button } from 'components/custom'
import { Container } from './StyledRegister'
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  onSubmit = async event => {
    event.preventDefault()

    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await createUserProfileDocument(user, { displayName })

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      alert(error.message)
    }
  }

  onChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <Container>
        <h2 className="title">Register</h2>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={this.onChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={this.onChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.onChange}
          label="Confirm Password"
          required
        />
        <div className="buttons">
          <Button type="submit" onClick={this.onSubmit}>
            Register
          </Button>
          <Link to="/login">
            <Button secondButton>Cancel</Button>
          </Link>
        </div>
      </Container>
    )
  }
}

export default Register
