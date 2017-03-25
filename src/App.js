import React, { Component } from 'react'
import './App.css'
import { firebaseDB } from './firebase'
import _ from 'lodash'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import omdb from 'omdb'
import Dataset from './components/Dataset'

function convertToArray (objGroup) {
  const newArray = []
  if (!objGroup) {
    return newArray
  }
  _.forEach(objGroup, (eachObj, index) => {
    eachObj.id = index
    newArray.push(eachObj)
  })
  return newArray
}

class App extends Component {

  state = {
    movies: [],
    movies2016: [],
    movies20002017: [],
    moviesAll: [],
    moviesRating4: [],
    reset: false,
    yearSelected: 0,
    ratingSelected: 0
  }

  componentWillMount () {
    firebaseDB.ref('movies').once('value').then(snap => {
      const moviesArray = convertToArray(snap.val())

      const movieList = moviesArray.map(movie => {
        const movieName = movie.name.slice(0, -11)
        const movieYear = movie.name.slice(movieName.length + 2, -5)

        //saving data in MovieDB
        // this.loadDataToDB(movie,movieName,movieYear)

      })
    })
    firebaseDB.ref('movies').once('value').then(snap => {
      const moviesArray = convertToArray(snap.val())
      this.setState({moviesAll: moviesArray})
      this.setState({movies2016: moviesArray.filter(movie => movie.year >= 2016)})
      this.setState({movies20002017: moviesArray.filter(movie => movie.year >= 2000)})
      // this.setState({movies: _.orderBy(moviesArray, ['year', 'IMDBRating'], ['desc', 'desc'])})
      this.setState({movies: _.orderBy(this.state.movies2016, ['year', 'IMDBRating'], ['desc', 'desc'])})
    })
  }

  loadDataToDB(movie,movieName,movieYear) {
    const movieRef = firebaseDB.ref(`movies/${movie.id}`)

    omdb.get({title: movieName, year: movieYear}, true, function (err, movie) {
      if (err) {
        return console.error(err)
      }
      let rating = 1

      if (!movie) {
        movieRef.child('IMDBRating').set(rating)
        return console.log('Movie not found!')
      }

      if (movie.imdb && movie.imdb.rating) {
        rating = Number(movie.imdb.rating) > 1 ? movie.imdb.rating : 1
      }

      console.log(movieRef)
      movieRef.child('year').set(Number.isInteger(Number(movieYear)) ? Number(movieYear) : 1900)
      movieRef.child('title').set(movieName)
      movieRef.child('IMDBRating').set(rating)
      movieRef.child('poster').set(movie.poster)


    })
  }

  render () {
    return (
      <div className="App">
        <Dataset
          callbackParent={(year,rating) => this.onChildChanged(year,rating) }
          reset={this.state.reset}
        />
        <div>
          Limit Dataset:
          <FlatButton label="All" onClick={() => this.setState({movies: this.state.moviesAll, }) }/>
          <FlatButton label="2000-2017" onClick={() => this.setState({movies: this.state.movies20002017}) }/>
          <FlatButton label="2016-2017"
                      onClick={() => this.setState({movies: _.orderBy(this.state.movies2016, ['year', 'IMDBRating'], ['desc', 'desc'])}) }/>
        </div>
        <div>
          Count of movies: {this.state.movies.length}
        </div>
        <Table onCellClick={(rowNumber, columnId) => this.sorting(columnId)}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Year</TableHeaderColumn>
              <TableHeaderColumn >Rating</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.listMovies()}
          </TableBody>
        </Table>
      </div>

    )
  }

  listMovies () {
    if (!(this.state.movies && this.state.movies.length > 0)) {
      return <div>Loading</div>
    }

    const movieList = this.state.movies.map(movie => {
      return (
        <TableRow key={movie.id}>
          <TableRowColumn><img src={movie.poster} className="thumbnail2" height="60" width="60" /> {movie.title}</TableRowColumn>
          <TableRowColumn>{movie.year}</TableRowColumn>
          <TableRowColumn>{movie.IMDBRating}</TableRowColumn>
        </TableRow>
      )
    })
    return movieList
  }

  sorting (columnId) {
    switch (columnId) {
      case 1:
        this.setState({movies: _.orderBy(this.state.movies, 'title', 'asc')})
        break

      case 2:
        this.setState({movies: _.orderBy(this.state.movies, ['year'], ['desc'])})
        break

      case 3:
        this.setState({movies: _.orderBy(this.state.movies, 'IMDBRating', 'desc')})
        break

      default:
        this.setState({movies: _.orderBy(this.state.movies, ['year', 'IMDBRating'], ['desc', 'desc'])})
    }
  }

  onChildChanged (year = this.state.yearSelected,rating = this.state.ratingSelected) {
    this.setState({
      yearSelected: year,
      ratingSelected: rating,
      movies: this.state.moviesAll.filter(movie => {
        return movie.year >= year && movie.IMDBRating > rating
      })})
  }
}

export default App
