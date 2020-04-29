import React, { Component } from 'react'
import { UserCard } from 'components/card'
import { connect } from 'react-redux'

import { firestore } from 'firebase/firebase.utils'

class GuestPage extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
    }
  }
  componentDidMount() {
    let { uid } = this.props.match.params

    firestore
      .collection('users')
      .doc(uid)
      .get()
      .then(snapshot => {
        this.setState({
          currentUser: snapshot.data(),
        })
      })
  }

  render() {
    let { currentUser } = this.state
    return <div>{currentUser && <UserCard currentUser={currentUser} />}</div>
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default GuestPage
