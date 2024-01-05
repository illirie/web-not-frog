import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

const MovieDetails = () => {
    const param = useParams();
    const [movie, setMovie] = useState({});
    const [favorites, setFavorites] = useState();
    const [isFav, setIsFav] = useState();
   
    async function fetchMovie(){ 
        try {
            await fetch(`http://localhost:3001/movies/${param.imdbID}`).then( (response) =>  response.json()).then(
                data => setMovie(data)
            );
        } catch (err) {
            alert("Ошибка при запросе фильмов.");
        }
        
    }
    async function fetchFav(){ 
        try {
            await fetch(`http://localhost:3001/favorites`).then( (response) =>  response.json()).then(
                data => {setFavorites(data)}
            );
        } catch (err) {
            alert("Ошибка при запросе любимых фильмов.");
        }
        
    }

    useEffect(() => {
        (async () => {
            await fetchMovie();
            await fetchFav();
            setIsFav(false);
        })().catch(error => { console.error(error); });
    }, [param])

    useEffect(() => {
        if(favorites){
            for (let i =0; i < favorites.length; i++){
                if (movie.id === favorites[i].id) setIsFav(true);
            }
        }
    }, [favorites, isFav])

    function minutesToHours(minutes){
        return `${Math.floor(Number(minutes)/60)} ч. ${Number(minutes) % 60} мин.`
    }
    
    function generateRating(){
        return ((Math.random() * 90 + 10)/10).toFixed(1);
    }

    let rating = generateRating();
    const navigate = useNavigate();

    async function addToFav(){
        try {
            await fetch('http://localhost:3001/favorites', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(movie)
            });
            setIsFav(true);
        } catch (err) {
            alert(err);
        }
    }
    return(
        <div className="movie-details__block">
            <div className="movie-details__header">
                <div className="row">
                    <Typography variant="h6">Id: {movie.id} </Typography>
                </div>
                
                    <Button onClick={() => navigate('edit')}>
                        <EditIcon /> Редактировать
                    </Button>
                
            </div>
            <div className="movie-details__main">
                <img className="movie-details__poster" src={movie.posterUrl}/>
                <div className="movie-details__info">
                    <div className="movie-details__title">
                        <div className="row">
                            <Typography variant="h4">{movie.title}</Typography>
                            {isFav ? <StarIcon className="pointer"/> : <StarBorderIcon className="pointer" onClick={addToFav}/>} 
                        </div>
                        <Typography color="grey">{movie.director}</Typography>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div className="movie-details__params">
                            <Typography variant="h6">Параметры</Typography>
                            <div className="row">
                                <Typography color="grey">Год производства:</Typography>
                                <Typography> {movie.year}</Typography>
                            </div>
                            <div className="row">
                                <Typography color="grey">Длительность:</Typography>
                                <Typography> {minutesToHours(movie.runtime)}</Typography>
                            </div>
                            <div className="row">
                                <Typography color="grey">Жанры:</Typography>
                                <Typography>{movie.genres && movie.genres.join(", ")}</Typography>
                            </div>
                        </div>
                        <div className="movie-details__actors">
                            <div className="row">
                                <Typography variant="h6">В главных ролях </Typography>
                                <KeyboardArrowRightIcon className="pointer"/>
                            </div>
                            {movie.actors && movie.actors.split(', ').map((actor) => (
                                <Typography key={actor}>{actor}</Typography>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-details__footer">
                <Typography variant="h4">Описание</Typography>
                <Typography>{movie.plot}</Typography>
                <div className="row">
                    <Typography variant="h5">Текущий рейтинг: </Typography>
                    <Typography variant="h4">{movie.rating ? movie.rating : rating} </Typography>
                </div>
                
            </div>
        </div>
    )
}

export default MovieDetails;