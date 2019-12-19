import React from 'react';
import {Route} from 'react-router-dom';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const starArray = Array.isArray(stars) ? stars : stars.split(',')
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      
      {starArray.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {/* <button onClick={handleEdit}>Update movie</button> */}
    </div>
  );
};

export default MovieCard;
