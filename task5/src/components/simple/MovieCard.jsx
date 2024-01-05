import React from "react";
import { Paper, Card } from "@mui/material";
import {Typography} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const MovieCard = ({movie, isFav}) => {
    return (
        <Card key={movie.id} elevation={2} className="movie-list__card">
            <div className="column">
                <Typography>{movie.title}</Typography>
                <Typography color="grey">{movie.year} | {movie.genres.join("; ")}</Typography>
            </div>
            {isFav ? <StarIcon className="pointer"/> : <StarBorderIcon className="pointer"/>} 
        </Card>
    )
}

export default MovieCard;