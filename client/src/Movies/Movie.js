import React from "react";
import { Route } from 'react-router-dom';
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateMovie from './UpdateMovie';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  updateMovie = e => {
    e.preventDefault();
    // console.log('the update button was clicked');
    this.props.history.push(`/update-movie/${this.state.movie.id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className='update-button' onClick={this.updateMovie}>
          Update
        </div>

        {/* <Route 
        path='/update-movie/:id'
        render={props => {
          return <UpdateMovie {...props} />
        }}
        /> */}
      </div>
    );
  }
}
