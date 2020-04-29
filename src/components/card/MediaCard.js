import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { Favorite, Comment, Bookmark, Autorenew } from '@material-ui/icons'

class MediaCard extends Component {
  render() {
    return (
      <Card style={{ width: '100%' }}>
        <CardActionArea>
          <CardMedia
            src="img"
            style={{ height: 140 }}
            title="Contemplative Reptile"
          />
          <CardContent>
            <div style={{ display: 'flex' }}>
              <Avatar>W</Avatar>
              <Typography gutterBottom variant="h5" component="h2">
                Username
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Favorite />
          </Button>
          <Button size="small" color="primary">
            <Comment />
          </Button>
          <Button size="small" color="primary">
            <Autorenew />
          </Button>
          <Button size="small" color="primary">
            <Bookmark />
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default MediaCard
