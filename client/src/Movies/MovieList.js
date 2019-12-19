import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from './UpdateMovie';


const MovieList = props => {

    // console.log('props.movies in MovieList: ', props.movies);

    return (
      <div className="movie-list">
        {props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}

export default MovieList;