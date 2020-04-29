import React, { Component } from 'react'

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import { FormInput, Button } from 'components/custom'
import { Container } from './StyledContact'

class ContactUsPage extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      subject: '',
      comment: '',
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    let { name, email, subject, comment } = this.state
  }

  onChange = event => {
    let { value, name } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Container>
        <h2>Contact Us</h2>
        <FormInput
          name="name"
          type="name"
          onChange={this.onChange}
          value={this.state.name}
          label="name"
          required
        />
        <FormInput
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.onChange}
          label="email"
          required
        />
        <FormInput
          name="subject"
          type="subject"
          value={this.state.subject}
          onChange={this.onChange}
          label="subject"
          required
        />

        <TextareaAutosize
          name="comment"
          onChange={this.onChange}
          label="comment"
          rows={5}
          placeholder="Write your comment here ..."
          style={{ width: '100%' }}
        />

        <Button type="submit" onClick={this.onSubmit}>
          {' '}
          Submit{' '}
        </Button>
        <br />
      </Container>
    )
  }
}

export default ContactUsPage
