import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'

import Grid from '@material-ui/core/Grid'

import { UserCard, PromotedCard } from 'components/card'
import { Table } from 'utilities'

class NetworkPage extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.getUpdate()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getUpdate()
      return true
    }
  }

  getUpdate = () => {
    let params = new URLSearchParams(this.props.location.search)
    let searchName = params.get('name')
    let { users } = this.props
    let newUsers = []

    if (searchName) {
      users.forEach(user =>
        user.data().professionals.forEach(p => {
          if (
            p.name.replace(/[\s,\\]/g, '_').toLowerCase() === searchName &&
            p.value === true
          ) {
            newUsers.push(user)
          }
        })
      )
    }
    if (this.props.location.pathname !== '/professional') {
      newUsers = users
    }

    this.setState({
      users: newUsers,
    })
  }

  render() {
    return (
      <div style={{ display: 'flex', margin: '20px' }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs>
              <PromotedCard />
            </Grid>
          )}

          <Grid item xs={!isMobile ? 6 : 12}>
            {this.state.users.length === 0 ? (
              <div>
                <Table />
              </div>
            ) : (
              <Table data={this.state.users} />
            )}
          </Grid>

          {!isMobile && (
            <Grid item xs>
              <PromotedCard />
            </Grid>
          )}
        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  users: state.user.allUsers,
})

export default connect(
  mapStateToProps,
  null
)(NetworkPage)
