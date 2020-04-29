import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import User from 'assets/user.png'

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
  margin: {
    margin: theme.spacing(1),
  },
})

class AccountPage extends Component {
  constructor() {
    super()
    this.state = {
      showPassword: false,
      value: '',
    }
  }
  handleChange = event => {
    this.setState({
      value: event.target.value,
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
          className={classes.margin}
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
          className={classes.margin}
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
    const { classes } = this.props

    return (
      <div>
        <Grid item xs={8} style={{ margin: 'auto', marginTop: '20px' }}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={User}
              title="Live from space album cover"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.renderMyAccount()}
            </div>
          </Card>
        </Grid>
      </div>
    )
  }
}

AccountPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccountPage)
