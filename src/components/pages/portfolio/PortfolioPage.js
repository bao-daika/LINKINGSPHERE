import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { MediaCard } from 'components/card'

class PortfolioPage extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px',
        }}
      >
        <Grid item xs={12}>
          <Grid container justify="center">
            {[0, 1, 2, 3, 4, 5].map((value, i) => (
              <Grid key={value} item>
                <MediaCard key={i} size="small" />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default PortfolioPage
