import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Reviews</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Movie;
