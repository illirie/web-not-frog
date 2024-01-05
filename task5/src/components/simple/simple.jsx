export class Movie {
    constructor(id, title, year, runtime, genres, director, actors, plot, posterUrl, rating ) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.genres = genres;
        this.director = director;
        this.actors = actors;
        this.plot = plot;
        this.posterUrl = posterUrl;
        this.rating = rating;
    }
}

export function validateData(data){
    return (data.title)
}

export function generateId () {
    return Math.random().toString(16).slice(2);
}