import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import Avatar from '@material-ui/core/Avatar'

import User from 'assets/user.png'
import { updateCurrentUser } from 'redux/user/user.actions'
import { Button } from 'components/custom'
import { firestore } from 'firebase/firebase.utils'
import { Upload } from 'utilities'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
    height: 200,
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
})

const labels = {
  1: 'Entry level',
  2: 'Intermediate',
  3: 'Senior',
  4: 'Team Leader',
  5: 'Manager',
}

class UserCard extends Component {
  constructor() {
    super()
    this.state = {
      displayName: '',
      professionals: [],
      email: '',
      uid: '',
      canEdit: false,
      levels: 0,
      hover: -1,
      showPassword: false,
      password: '',
      files: [],
      open: false,
    }
  }
  componentDidMount() {
    let { canEdit, currentUser } = this.props

    this.setState({
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email,
      professionals: currentUser.professionals,
      levels: currentUser.levels,
      canEdit: canEdit,
    })
  }

  handleChange = event => {
    let { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleCheck = event => {
    let { name, checked } = event.target
    let { professionals, canEdit } = this.state

    if (!canEdit) return false

    professionals.forEach(p => {
      if (p.name === name) {
        p.value = checked
      }
    })
    this.setState({ professionals: professionals })
  }

  handleSubmit = event => {
    event.preventDefault()
    let { displayName, professionals, email, uid, levels } = this.state
    let { updateCurrentUser } = this.props

    firestore
      .collection('users')
      .doc(uid)
      .update({
        displayName: displayName,
        email: email,
        professionals: professionals,
        levels: levels,
      })

    updateCurrentUser({
      displayName: displayName,
      email: email,
      professionals: professionals,
      levels: levels,
    })

    window.alert('You saved!')
  }

  selectlevels = levelsValue => {
    this.setState({
      levels: levelsValue,
    })
  }

  hoverlevels = hoverlevels => {
    this.setState({
      hover: hoverlevels,
    })
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  renderMyAccount = () => {
    let { classes } = this.props
    return (
      <FormControl style={{ width: '250px' }}>
        <TextField
          id="outlined-adornment-password"
          className={classes.formControl}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-adornment-password"
          className={classes.formControl}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Confirm Password"
          value={this.state.password}
          onChange={this.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  showPreviews={true}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    )
  }

  render() {
    let { classes, canEdit } = this.props
    let { displayName, email, uid, professionals } =
      window.location.pathname === 'professional'
        ? this.props.currentUser
        : this.state

    return (
      <Grid item xs={8} style={{ margin: 'auto', marginTop: '20px' }}>
        <Card className={classes.card}>
          {window.location.pathname.includes('profile') ? (
            <Upload currentUser={this.props.currentUser} />
          ) : (
            <Link to={'/user/' + uid}>
              <Avatar
                className={classes.cover}
                src={this.props.currentUser.avatarUrl}
                title="Avatar"
              />
            </Link>
          )}

          <div className={classes.details}>
            <form onSubmit={this.handleSubmit}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Name:
                </Typography>
                <TextField
                  id="displayName"
                  name="displayName"
                  value={displayName}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
                  InputProps={{
                    readOnly: !canEdit,
                  }}
                />

                {window.location.pathname.includes('profile') && (
                  <div>
                    <Typography component="h5" variant="h5">
                      Professionals:
                    </Typography>

                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {professionals.map((p, i) => {
                          return (
                            <FormControlLabel
                              key={i}
                              control={
                                <Checkbox
                                  checked={p.value}
                                  name={p.name}
                                  onChange={this.handleCheck}
                                  value={p.name}
                                />
                              }
                              label={p.name}
                            />
                          )
                        })}
                      </FormGroup>
                    </FormControl>
                  </div>
                )}

                <Typography component="h5" variant="h5">
                  Contact Info:
                </Typography>
                <TextField
                  id="email"
                  name="email"
                  value={email}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
                  InputProps={{
                    readOnly: !canEdit,
                  }}
                />

                <Typography component="h5" variant="h5">
                  Skill Levels
                </Typography>
                <div
                  style={{ width: 300, display: 'flex', alignItems: 'center' }}
                >
                  {canEdit ? (
                    <Rating
                      name="skill-levels"
                      value={this.state.levels}
                      precision={1}
                      onChange={(event, levelsValue) => {
                        this.selectlevels(levelsValue)
                      }}
                      onChangeActive={(event, hoverlevels) => {
                        this.hoverlevels(hoverlevels)
                      }}
                    />
                  ) : (
                    <Rating
                      name="skill-levels"
                      value={this.state.levels}
                      readOnly
                    />
                  )}
                  {this.state.levels !== null && (
                    <Box ml={2}>
                      {
                        labels[
                          this.state.hover !== -1
                            ? this.state.hover
                            : this.state.levels
                        ]
                      }
                    </Box>
                  )}
                </div>

                <Typography
                  component="h5"
                  variant="h5"
                  style={{ marginTop: '5px' }}
                >
                  Change Password
                </Typography>
                {this.renderMyAccount()}

                {canEdit && (
                  <div>
                    <Button type="submit">
                      <SaveIcon />
                    </Button>
                  </div>
                )}
              </CardContent>
            </form>
          </div>
        </Card>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: user => dispatch(updateCurrentUser(user)),
})

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(UserCard))
