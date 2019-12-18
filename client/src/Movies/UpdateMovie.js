import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
}

const UpdateMovie = props => {
  
  const [movie, setMovie] = useState(initialMovie);
  useEffect( () => {
    const movieToEdit = props.movies.find(
      movie => `${movie.id}` === props.match.params.id
    );
    console.log('movieToEdit: ', movieToEdit)
    if(movieToEdit) {
      setMovie(movieToEdit)
    }
  }, [props.movies, props.match.params.id])

  const changeHandler = e => {
    e.persist() //maybe not necessary

    setMovie( {
      ...movie,
      [e.target.name]: e.target.value
    })
    console.log(movie);
  }

  const handleSubmit = e => {
    e.preventDefault();
    // console.log('stars array, right? ', movie.stars.split(','));
    // setMovie( {
      
    //   stars: movie.stars.split(',')
    // })
    // console.log('movie object: ', movie);
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then( res => {
        props.updateMovies( props.movies.map( item => {
          return item.id === movie.id ? movie : item;
        }))
        props.history.push(`/movies/${movie.id}`)
        // console.log('updated movies array maybe? ', props.movies);
      })
  }

  // console.log('movie stars: ', movie.stars.join(', '));
  return (
    <div className='update-movie-form'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='title'
          value={movie.title}
        />
        <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='director'
          value={movie.director}
        />
        <input
          type='number'
          name='metascore'
          onChange={changeHandler}
          placeholder='metascore'
          value={movie.metascore}
        />
        <input
          type='text'
          name='stars'
          onChange={changeHandler}
          placeholder='stars'
          value={movie.stars}
        />
        <button>Update</button>
      </form>
    </div>
  );
}

export default UpdateMovie;