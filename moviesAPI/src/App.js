import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const api = "https://www.omdbapi.com/?";
const apiKey = "apikey=18eaeb4f";

const App = () => {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getInfo = () => {
    axios.get(`${api}${apiKey}&s=${name}&type=movie`).then((res) => {
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      }
    });
  };

  const getDetails = (id) => {
    axios.get(`${api}${apiKey}&i=${id}`).then((res) => {
      if (res.data.Response === "True") {
        setSelectedMovie(res.data);
      }
    });
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getInfo();
        }}
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <button onClick={() => getDetails(movie.imdbID)}>Details</button>
            {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
              <div className="details">
                <p>Actors: {selectedMovie.Actors}</p>
                <p>Genre: {selectedMovie.Genre}</p>
                <p>Director: {selectedMovie.Director}</p>
                <p>Released: {selectedMovie.Released}</p>
                <p>Plot: {selectedMovie.Plot}</p>
                <button onClick={handleCloseDetails}>Close</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
