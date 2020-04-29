import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {
  render() {
    let { currentUser, path, component } = this.props
    return (
      <div>
        {currentUser ? (
          <Route path={path} component={component} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute)
