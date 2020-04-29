import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { isMobile } from 'react-device-detect'

import {
  StyledMenu,
  StyledMenuItem,
  StyledLink,
} from './GlobalNavigation.styles'
import { auth } from 'firebase/firebase.utils'
import Logo from 'assets/logo.jpg'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import MenuIcon from '@material-ui/icons/Menu'
import Default from 'assets/default.png'

import { storage } from 'firebase/firebase.utils'

const styles = {
  root: {
    '&$selected': {
      color: 'red',
    },
  },
  disabled: {},
}
class GlobalNavigation extends Component {
  constructor() {
    super()
    this.state = {
      menuList: ['Shops', 'Tutorials', 'Linking', 'Blogs', 'Contact Us'],
      guestList: ['Shops', 'Tutorials', 'Blogs', 'Contact Us'],
      isProfileOpen: Boolean(null),
      isMenuOpen: Boolean(null),
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
        style={{ width: 50, height: 50 }}
        onClick={this.profileOpen}
        src={this.state.avatarUrl || Default}
      />
    )
  }

  profileOpen = event => {
    this.setState({
      isProfileOpen: Boolean(event.currentTarget),
    })
  }

  profileClose = () => {
    this.setState({
      isProfileOpen: Boolean(null),
    })
  }

  menuOpen = event => {
    this.setState({
      isMenuOpen: Boolean(event.currentTarget),
    })
  }

  menuClose = () => {
    this.setState({
      isMenuOpen: Boolean(null),
    })
  }

  signOut = () => {
    auth.signOut().then(() => {
      this.setState({ avatarUrl: '' })
    })
  }

  renderProfile = () => {
    let { currentUser } = this.props
    let { isProfileOpen } = this.state

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '10px 0px' }}>
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            style={{ color: 'white' }}
          />
        </div>
        {this.getAvatar()}
        {/* </IconButton> */}
        <StyledMenu
          id="profile"
          anchorEl={isProfileOpen}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={isProfileOpen}
          onClose={this.profileClose}
        >
          {currentUser ? (
            <div>
              {this.renderNotifications()}
              <StyledLink to={'/profile/' + currentUser.uid}>
                <StyledMenuItem onClick={this.profileClose}>
                  {currentUser.displayName}
                </StyledMenuItem>
              </StyledLink>
              <StyledLink to="/my_account">
                <StyledMenuItem onClick={this.profileClose}>
                  My account
                </StyledMenuItem>
              </StyledLink>
              <StyledMenuItem onClick={this.signOut} isMobile={isMobile}>
                Sign out
              </StyledMenuItem>
            </div>
          ) : (
            <div>
              <StyledLink to="/login">
                <StyledMenuItem>Sign In</StyledMenuItem>
              </StyledLink>
              <StyledLink to="/register">
                <StyledMenuItem>Register</StyledMenuItem>
              </StyledLink>
            </div>
          )}
        </StyledMenu>
      </div>
    )
  }

  renderNotifications = () => {
    return (
      <div>
        <StyledLink to="/mail">
          <IconButton aria-label="show 4 new mails">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        </StyledLink>

        <StyledLink to="/notifications">
          <IconButton aria-label="show 17 new notifications">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </StyledLink>
      </div>
    )
  }

  renderMenu = () => {
    let { currentUser } = this.props
    let { menuList, guestList } = this.state

    return (
      <div style={{ display: !isMobile && 'flex' }}>
        {currentUser
          ? menuList.map((menu, i) => {
              return (
                <StyledLink
                  to={'/' + menu.replace(/\s+/, '_').toLowerCase()}
                  key={i}
                >
                  <StyledMenuItem>{menu.toUpperCase()}</StyledMenuItem>
                </StyledLink>
              )
            })
          : guestList.map((menu, i) => {
              return (
                <StyledLink
                  to={'/' + menu.replace(/\s+/, '_').toLowerCase()}
                  key={i}
                >
                  <StyledMenuItem>{menu.toUpperCase()}</StyledMenuItem>
                </StyledLink>
              )
            })}
      </div>
    )
  }

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar
            style={{ display: 'flex', flexDirection: isMobile && 'column' }}
          >
            <StyledLink to="/">
              <div style={{ display: 'flex' }}>
                <IconButton edge="start" aria-label="open drawer">
                  <Avatar
                    alt="Linking Sphere"
                    src={Logo}
                    style={{ width: '120px', height: '120px' }}
                  />
                </IconButton>
              </div>
            </StyledLink>

            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {isMobile ? (
                <>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.menuOpen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <StyledMenu
                    id="menu"
                    keepMounted
                    open={this.state.isMenuOpen}
                    onClose={this.menuClose}
                  >
                    {this.renderMenu()}
                  </StyledMenu>
                </>
              ) : (
                <>{this.renderMenu()}</>
              )}

              {this.renderProfile()}
            </div>
          </Toolbar>
        </AppBar>
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

GlobalNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(GlobalNavigation))
