import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "./Footer";
import MovieCard from "./simple/MovieCard";

const MovieList = () => {
    const [favorites, setFavorites] = useState();
    const [searchString, setSearch] = useState('');
    const [allMovies, setMovies] = useState([]);

    function renderMovies(movies, searchParam){
        if (searchParam !== ''){
            movies = movies.filter((movie) => movie.title.includes(searchParam));
        }
        return (
            movies.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`} style={{textDecoration: 'none'}}>
                    <MovieCard key={movie.id} movie={movie} isFav={movieIsFav(movie.id)}/>
                </Link>
            ))
        )
    };

    async function fetchMovies(){ 
        try {
            await fetch('http://localhost:3001/movies').then( (response) =>  response.json()).then(
                data => setMovies(data)
            );
        } catch (err) {
            alert("Ошибка при запросе фильмов.");
        }
        
    }

    async function fetchFav(){ 
        try {
            await fetch(`http://localhost:3001/favorites`).then( (response) =>  response.json()).then(
                data => setFavorites(data)
            );
        } catch (err) {
            alert("Ошибка при запросе любимых фильмов.");
        }
    }

    useEffect(() => {
        (async () => {
            await fetchMovies();
            await fetchFav();
        })().catch(error => { console.error(error); });
    }, [])
    function movieIsFav(id){
        if(favorites){
            for (let i =0; i < favorites.length; i++){
                if (id === favorites[i].id) 
                    return true;
            }
        }
    }
    return (
            <div className="movie-block">
                <div className="movie-list__search-bar row">
                    <input id="search" className='movie-list__search' placeholder="Поиск фильма..." type="text" />
                    <Button onClick={() => setSearch(document.getElementById('search').value)}>
                        <SearchIcon/>
                    </Button>
                    <Button onClick={() => {setSearch(''); document.getElementById('search').value = ''}}>
                        <CloseIcon />
                    </Button>
                </div>
                
                <div className="movie-list">
                    { renderMovies(allMovies, searchString) }
                </div>

                <div className="movie-list__line"></div>

                <Footer lengtn={allMovies.length}/>
            </div> 
    )
}

export default MovieList;