import React, { useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

// MoviesList is a functional component that fetches and displays a list of movies,
// and allows users to search movies by title or rating.
const MoviesList = props => {

  // State variables to manage the data and user inputs
  const [movies, setMovies] = useState([]) // List of movies
  const [searchTitle, setSearchTitle] = useState("") // Search query for movie title
  const [searchRating, setSearchRating] = useState("") // Search query for movie rating
  const [ratings, setRatings] = useState(["All Ratings"]) // List of available ratings
  const [currentPage, setCurrentPage] = useState(0) // Current page for pagination
  const [entriesPerPage, setEntriesPerPage] = useState(0) // Number of entries per page
  const [currentSearchMode, setCurrentSearchMode] = useState("") // Current search mode (by title or by rating)

  // Reset to the first page whenever the search mode changes
  useEffect(() => {
    setCurrentPage(0)
  }, [currentSearchMode])

  // Fetch the next page of results whenever the current page changes
  useEffect(() => {
    retrieveNextPage()
  }, [currentPage])

  // Determine which fetch function to call based on the current search mode
  const retrieveNextPage = () => {
    if(currentSearchMode === "findByTitle")
      findByTitle()
    else if(currentSearchMode === "findByRating")
      findByRating()
    else
      retrieveMovies()
  }

  // Fetch all movies and available ratings when the component mounts
  useEffect(() => {
    retrieveMovies()
    retrieveRatings()
  }, [])

  // Fetch all movies
  const retrieveMovies = () => {
    setCurrentSearchMode("")
    MovieDataService.getAll()
      .then(response => {
        console.log(response.data)
        setMovies(response.data.movies)
        setCurrentPage(response.data.page)
        setEntriesPerPage(response.data.entries_per_page)
      })
      .catch(e => {
        console.log(e)
      })
  }

  // Fetch available ratings
  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        console.log(response.data)
        // Start with 'All Ratings' if user doesn't specify any ratings
        setRatings(["All Ratings"].concat(response.data))
      })
      .catch(e => {
        console.log(e)
      })
  }

  // Update the search title state when the user types in the search box
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
  }

  // Update the search rating state when the user selects a rating
  const onChangeSearchRating = e => {
    const searchRating = e.target.value
    setSearchRating(searchRating)
  }

  // Generic find function to search movies by title or rating
  const find = (query, by) => {
    MovieDataService.find(query, by, currentPage)
      .then(response => {
        console.log(response.data)
        setMovies(response.data.movies)
      })
      .catch(e => {
        console.log(e)
      })
  }

  // Search movies by title
  const findByTitle = () => {
    setCurrentSearchMode("findByTitle")
    find(searchTitle, "title")
  }

  // Search movies by rating
  const findByRating = () => {
    setCurrentSearchMode("findByRating")
    if (searchRating === "All Ratings") {
      retrieveMovies()
    } else {
      find(searchRating, "rated")
    }
  }

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating} >
                  {ratings.map(rating => {
                    return (
                      <option value={rating}>{rating}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByRating}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          {movies.map((movie) => {
            return (
              <Col key={movie._id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={movie.poster + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      Rating: {movie.rated}
                    </Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id} >View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
        <br />
        Showing page: {currentPage}.
        <Button
          variant="link"
          onClick={() => { setCurrentPage(currentPage + 1) }}
        >
          Get next {entriesPerPage} results
        </Button>
      </Container>
    </div>
  );
}

export default MoviesList;
