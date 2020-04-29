import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { GlobalNavigation, LocalNavigation } from './components/navigations'
import { Login, Register, ProtectedRoute } from './components/authentication'
import {
  NetworkPage,
  HomePage,
  PortfolioPage,
  ProfilePage,
  GuestPage,
  AccountPage,
  ContactUsPage,
  BlogsPage,
} from './components/pages'

import {
  auth,
  createUserProfileDocument,
  firestore,
} from './firebase/firebase.utils'
import { setCurrentUser, getAllUsers } from 'redux/user/user.actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuList: [
        'UX\\UI Design',
        'Graphic Design',
        'Web Design',
        '3D Modelling',
        'Animation',
        'Films',
        'Computer Programming',
      ],
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    let { setCurrentUser, getAllUsers } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        let userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        })
      }
      setCurrentUser(userAuth)
    })

    firestore.collection('users').onSnapshot(snapShot => {
      getAllUsers(snapShot.docs)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <div className="App">
        <Route path="/" component={GlobalNavigation} />
        <Route path="/" component={LocalNavigation} />

        <Switch>
          <Route
            path="/login"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Login />
            }
          />
          <Route
            path="/register"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Register />
            }
          />
          <Route exact path="/" component={HomePage} />
          <Route path="/news" component={HomePage} />
          <ProtectedRoute path="/my_portfolio" component={PortfolioPage} />
          <ProtectedRoute path="/network" component={NetworkPage} />
          <ProtectedRoute path="/profile/:uid" component={ProfilePage} />
          <Route path="/user/:uid" component={GuestPage} />
          <ProtectedRoute path="/my_account" component={AccountPage} />
          <Route path="/contact_us" component={ContactUsPage} />
          <Route path="/blogs" component={BlogsPage} />
          <Route path="/professional" component={NetworkPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  getAllUsers: users => dispatch(getAllUsers(users)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
