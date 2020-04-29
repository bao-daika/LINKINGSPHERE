import React, { Component } from 'react'
import { UserCard } from 'components/card'
import { connect } from 'react-redux'

class ProfilePage extends Component {
  render() {
    let { currentUser } = this.props
    return (
      <div>
        {currentUser && <UserCard canEdit={true} currentUser={currentUser} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(
  mapStateToProps,
  null
)(ProfilePage)
