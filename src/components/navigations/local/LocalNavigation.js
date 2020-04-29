import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import MenuItem from '@material-ui/core/MenuItem'
import { isMobile } from 'react-device-detect'
import Grid from '@material-ui/core/Grid'

import { StyledList, StyledBar, StyledLink } from './LocalNavigation.styles'

class LocalNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      professionals: [
        'UX\\UI Designers',
        'Graphic Designers',
        'Web Designers',
        'Animators',
        'Film Makers',
        'Programmers',
      ],
      openProfessionals: false,
      openFollowing: false,
    }
  }

  clickFollowing = () => {
    this.setState({
      openFollowing: !this.state.openFollowing,
    })
  }

  clickProfessionals = () => {
    this.setState({
      openProfessionals: !this.state.openProfessionals,
    })
  }

  renderProfessionals = () => {
    let { openProfessionals, professionals } = this.state

    return (
      <Grid item xs={isMobile ? 6 : 10}>
        {isMobile ? (
          <StyledList component="nav" aria-labelledby="nested-list-subheader">
            <ListItem button onClick={this.clickProfessionals}>
              <ListItemText primary="Professional" />
              {openProfessionals ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProfessionals} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {professionals.map((menu, i) => {
                  return (
                    <StyledLink
                      to={{
                        pathname: '/professional',
                        search:
                          '?name=' +
                          menu.replace(/[\s,\\]/g, '_').toLowerCase(),
                      }}
                      key={i}
                    >
                      <ListItem button>
                        <ListItemText primary={menu} />
                      </ListItem>
                    </StyledLink>
                  )
                })}
              </List>
            </Collapse>
          </StyledList>
        ) : (
          <StyledBar>
            {professionals.map((menu, i) => {
              return (
                <StyledLink
                  to={{
                    pathname: '/professional',
                    search:
                      '?name=' + menu.replace(/[\s,\\]/g, '_').toLowerCase(),
                  }}
                  key={i}
                >
                  <MenuItem>{menu}</MenuItem>
                </StyledLink>
              )
            })}
          </StyledBar>
        )}
      </Grid>
    )
  }

  render() {
    let { openFollowing } = this.state
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={isMobile ? 6 : 2}>
            <StyledList component="nav">
              <ListItem button onClick={this.clickFollowing}>
                <ListItemText primary="Following" />
                {openFollowing ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openFollowing} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <StyledLink to="/popular">
                    <ListItem button>
                      <ListItemText primary="Popular" />
                    </ListItem>
                  </StyledLink>

                  <StyledLink to="/recent">
                    <ListItem button>
                      <ListItemText primary="Recent" />
                    </ListItem>
                  </StyledLink>

                  <StyledLink to="/all">
                    <ListItem button>
                      <ListItemText primary="All" />
                    </ListItem>
                  </StyledLink>
                </List>
              </Collapse>
            </StyledList>
          </Grid>
          {this.renderProfessionals()}
        </Grid>
      </div>
    )
  }
}

export default LocalNavigation
