import React from 'react'
import { Link } from 'react-router-dom'

import { signInWithGoogle } from 'firebase/firebase.utils'
import { auth } from 'firebase/firebase.utils'

import { FormInput, Button } from 'components/custom'
import { Container } from './StyledLogin'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    let { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  }

  onChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    return (
      <Container>
        <h2>Welcome to Linking Sphere</h2>
        <span>Sign in with your email and password</span>
        <FormInput
          name="email"
          type="email"
          onChange={this.onChange}
          value={this.state.email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          label="password"
          required
        />
        <div className="buttons">
          <Button type="submit" onClick={this.onSubmit}>
            {' '}
            Sign in{' '}
          </Button>
          <Button onClick={signInWithGoogle} secondButton>
            {' '}
            Sign in with Google{' '}
          </Button>
        </div>
        <br />

        <Link to="/register">
          {' '}
          <b>Register a new account ?</b>
        </Link>
      </Container>
    )
  }
}

export default Login
