import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const API_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

const PopularMoviesPage = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)

  const fetchData = async (page = 1) => {
    const API_KEY = 'a3cfd9173c4c154a2b39ffd5297d784d'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const options = {
      method: 'GET',
    }

    try {
      setApiStatus(API_STATUS.LOADING)
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const updatedData = {
          totalPages: data.total_pages,
          formattedData: data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            voteAverage: movie.vote_average,
          })),
        }

        setPopularMovies(updatedData.formattedData)
        setTotalPages(updatedData.totalPages)
        setApiStatus(API_STATUS.SUCCESS)
      } else {
        setApiStatus(API_STATUS.ERROR)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      setApiStatus(API_STATUS.ERROR)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="PopularMoviesPage">
      <header className="home_cover_page">
        <h1 className="cover_page_heading">
          Discover and stream your favorite movies anytime, anywhere!
        </h1>
      </header>
      <h1 className="movies_categories">Popular</h1>

      {/* Show Loader when API is loading */}
      {apiStatus === API_STATUS.LOADING && (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )}

      {/* Show Movies if API is successful */}
      {apiStatus === API_STATUS.SUCCESS && (
        <div>
          <ul className="movies_grid_section">
            {popularMovies.map(eachMovie => (
              <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        </div>
      )}

      {/* Show Error Message if API fails */}
      {apiStatus === API_STATUS.ERROR && (
        <div className="error-message">
          <p>Failed to fetch movies. Please try again later.</p>
        </div>
      )}

      <Pagination apiCallBack={fetchData} totalPages={totalPages} />
    </div>
  )
}

export default PopularMoviesPage
