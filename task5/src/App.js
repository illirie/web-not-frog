import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { Routes, Route } from "react-router-dom";
import MovieForm from './components/MovieForm';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <MovieList />
        <Routes>
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path='/movie/:imdbID/edit' element={<MovieForm/>} />
          <Route path='/addMovie' element={<MovieForm/>} />
          <Route path="/*" element={<></>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
