import React from 'react'
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card'

const movExample = {
  IMDBRating: 4.4,
  id: '-Kg6J5wjnWGuWUmEybMk',
  name: 'American Violence (2017)/American.Violence.2017.1080p.BluRay.x264-[YTS.AG].mp4',
  poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNmY4NTkwZGYtOTIyNy00Yjc4LWI4OGYtNDUzMTRjNDUyOTIwL2ltYWdlXkEyXkFqcGdeQXVyNjY1MTcxNTQ@._V1_SX300.jpg',
  title: 'American Violence',
  year: 2017,
}

const MovieCard = (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#222222'}}>
      <Card style={ {width: 150, height: 50} }>
        <CardMedia>
          <img src={movExample.poster} />
        </CardMedia>
        {movExample.title} - {movExample.year}
      </Card>

    </div>
  )
}

MovieCard.propTypes = {}
MovieCard.defaultProps = {}

export default MovieCard
