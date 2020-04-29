import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import Sample from 'assets/sample.jpg'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    height: 'fit-content',
  },
  media: {
    height: 300,
  },
})

class PromotedCard extends Component {
  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Promoted Posts
            </Typography>
            <CardMedia
              image={Sample}
              className={classes.media}
              title="Contemplative Reptile"
            />
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

PromotedCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PromotedCard)
