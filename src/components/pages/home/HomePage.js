import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { isMobile } from 'react-device-detect'

import { MediaCard, PromotedCard } from 'components/card'

const styles = theme => ({
  root: {
    flexDirection: 'column',
    padding: '15px',
  },
})

class HomePage extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Grid item xs={isMobile ? 12 : 7}>
          <Grid
            style={{ flexDirection: 'column', padding: '15px' }}
            container
            justify="center"
          >
            {[0, 1, 2, 3, 4, 5].map((value, i) => (
              <Grid style={{ marginTop: '10px' }} key={value} item>
                <MediaCard key={i} size="big" />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {!isMobile && (
          <Grid item xs={5} style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <PromotedCard />
              <PromotedCard />
            </div>
            <div>
              <PromotedCard />
            </div>
          </Grid>
        )}
      </div>
    )
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomePage)
