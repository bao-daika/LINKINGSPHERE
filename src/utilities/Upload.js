import React, { Component } from 'react'

import { DropzoneDialog } from 'material-ui-dropzone'

import { Button } from 'components/custom'
import { storage, firestore } from 'firebase/firebase.utils'
import Default from 'assets/default.png'
import Avatar from '@material-ui/core/Avatar'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      open: false,
      avatarUrl: '',
    }
  }

  getAvatar = () => {
    let { currentUser } = this.props

    if (currentUser) {
      storage
        .ref()
        .child(`avatars/${currentUser.uid}`)
        .getDownloadURL()
        .then(url => {
          this.setState({
            avatarUrl: url,
          })
        })
    }

    return (
      <Avatar
        style={{ width: 200, height: 200 }}
        src={this.state.avatarUrl || currentUser.avatarUrl}
        title="Avatar"
      />
    )
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  handleSave(files) {
    let { currentUser } = this.props
    let uploadFile = storage.ref(`avatars/${currentUser.uid}`).put(files[0])

    uploadFile.on(
      'state_changed',
      snapshot => {},
      error => {},
      () => {
        storage
          .ref('avatars')
          .child(`${currentUser.uid}`)
          .getDownloadURL()
          .then(url => {
            this.setState({ imageUrl: url })
          })
      }
    )

    firestore
      .collection('users')
      .doc(currentUser.uid)
      .update({
        avatarUrl: this.state.avatarUrl,
      })

    this.setState({
      files: files,
      open: false,
    })
  }

  handleOpen() {
    this.setState({
      open: true,
    })
  }

  render() {
    return (
      <div>
        {this.getAvatar()}
        <Button style={{ width: '100%' }} onClick={this.handleOpen.bind(this)}>
          Change Avatar
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    )
  }
}

export default Upload
