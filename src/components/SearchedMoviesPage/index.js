import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import SearchContext from '../../context/SearchContext'

import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const API_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

const SearchedMoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)

  const {searchInput} = useContext(SearchContext)

  const fetchData = async (page = 1) => {
    if (!searchInput) return

    const API_KEY = 'a3cfd9173c4c154a2b39ffd5297d784d'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    try {
      setApiStatus(API_STATUS.LOADING)
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
          totalPages: data.total_pages,
          totalResults: data.total_results,
          formattedData: data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            voteAverage: movie.vote_average,
          })),
        }
        setSearchMovies(updatedData.formattedData)
        setTotalPages(updatedData.totalPages)
        setApiStatus(API_STATUS.SUCCESS)
      } else {
        console.error('Failed to fetch movies')
        setApiStatus(API_STATUS.ERROR)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      setApiStatus(API_STATUS.ERROR)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchInput])

  return (
    <div className="SearchedMoviesPage">
      {/* Show Loader when API is loading */}
      {apiStatus === API_STATUS.LOADING && (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )}

      {apiStatus === API_STATUS.SUCCESS && (
        <div>
          <ul className="movies_grid_section">
            {searchMovies.length > 0 ? (
              searchMovies.map(eachMovie => (
                <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
              ))
            ) : (
              <div className="error-message">
                <p>No Searched Movies Found</p>
              </div>
            )}
          </ul>
        </div>
      )}

      {/* Show Error Message if API fails */}
      {apiStatus === API_STATUS.ERROR && (
        <div className="error-message">
          <p>Failed to fetch movies. Please try again later.</p>
        </div>
      )}
      {searchMovies > 0 && (
        <Pagination apiCallBack={fetchData} totalPages={totalPages} />
      )}
    </div>
  )
}

export default SearchedMoviesPage
