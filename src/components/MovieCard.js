import React from 'react'
import { Card, CardMedia } from 'material-ui/Card'

const style = {
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
    // margin: '0 10 0 10'
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    margin: '1em 1em 0 1em'
    // backgroundColor: '#222222'
  },
  card: {
    height: 200, width: 150
  },
  year: {
    color: 'grey'
  }

}

const MovieCard = ({movies}) => {
  const movieItems = movies.map(movie => {
    return (
      <div style={style.containerItem}>
        <Card style={style.card}>
          <CardMedia >
            <img src={movie.poster} style={style.card} />
          </CardMedia>
        </Card>
        <div style={{width: style.card.width}}>
          {movie.title}
        </div>
        <div style={style.year}>
          {movie.year}
        </div>
        <div>
          {movie.IMDBRating}
        </div>
      </div>
    )
  })

  return (
    <div style={style.containerRow}>
      {movieItems}
    </div>
  )
}

MovieCard.propTypes = {}
MovieCard.defaultProps = {}

export default MovieCard
