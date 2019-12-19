import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: '',
}

const UpdateMovie = props => {
  
  const [movie, setMovie] = useState(initialMovie);
  useEffect( () => {
    const movieToEdit = props.movies.find(
      movie => `${movie.id}` === props.match.params.id
    );
    if(movieToEdit) {
      const starString = Array.isArray(movieToEdit.stars) 
                        ? movieToEdit.stars.join(', ')
                        : movieToEdit.stars;
      setMovie({
        ...movieToEdit,
        stars: starString
      })
    }
  }, [props.movies, props.match.params.id])

  const changeHandler = e => {
    e.persist() //maybe not necessary

    setMovie( {
      ...movie,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    // setMovie( {
    //   ...movie,
    //   stars: movie.stars.split(',')
    // })
    console.log('movie object: ', movie);
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then( res => {
        props.updateMovies( props.movies.map( item => {
          return item.id === movie.id ? movie : item;
        }))
        props.history.push(`/movies/${movie.id}`)
      })
  }

  return (
    <div className='update-movie-form'>
      <h2>Update Movie</h2>
      <form 
        onSubmit={handleSubmit}>
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