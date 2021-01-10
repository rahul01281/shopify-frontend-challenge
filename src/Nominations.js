import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Nominations = () => {

    const [ movieName, setMovieName ] = useState('');

    const [ movieResults, setMovieResults ] = useState([]);

    const [ nominations, setNominations ] = useState([]);

    const [ finished, setFinished ] = useState(false);

    const onChange = (e) => {
        setMovieName(e.target.value);
    }

    const searchMovies = async () => {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=b0e73700&type=movie&s=${movieName}`);

        if (res.data.Search !== undefined){
            setMovieResults(res.data.Search);
        }
    }

    const addNomination = (movie) => {
        setNominations([...nominations, movie]);
    }

    const removeNomination = (id) => {
        setNominations(nominations.filter((movie) => movie.imdbID !== id))
    }

    useEffect(() => {
        setFinished(nominations.length >= 5)
    }, [nominations])

    useEffect(() => {
        searchMovies();
    }, [movieName]);

    return (
        <Fragment>
            <div className="layout">
                <div className="container">
                    <div className="search-bar">
                        <input type="text" className="input" placeholder="Search Here" onChange={onChange} />
                    </div>
                    <div className="lower-row">
                        <div className="content-box">
                            <div style={{margin:'10px'}}>
                                <h4>Results for "{movieName}"</h4>
                            </div>
                            
                            <div className="result-box">
                                {movieResults.map((movie) => (
                                    <div className="search-result">
                                        <h6>{movie.Title} ({movie.Year})</h6>
                                        <button className="result-button" onClick={() => addNomination(movie)}
                                        disabled = {nominations.includes(movie) || finished}
                                        >Nominate</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="content-box">
                            <div style={{margin:'10px'}}>
                                <h4>Nominations</h4>
                            </div>
                            <div className="result-box">
                                {nominations.length !== 0 ? (
                                    <div>
                                        {nominations.map((nomination) => (
                                            <div className="search-result">
                                                <h5>{nomination.Title}</h5>
                                                <button className="result-button" onClick={() => removeNomination(nomination.imdbID)}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No nominations yet</p>
                                )}
                                
                            </div>
                        </div>
                    </div>
                    {finished ? (
                        <div className="instructions">
                            <strong>Congratulations!</strong> You have selected your 5 movies.
                        </div>
                    ) : (
                        <div className="instructions">
                            Select <strong>{5 - nominations.length}</strong> movies to nominate for Shoppies!
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}



export default Nominations
