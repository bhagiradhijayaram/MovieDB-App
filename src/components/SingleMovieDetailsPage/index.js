import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

import MovieDetails from '../MovieDetails'
import CastDetails from '../CastDetails'

const SingleMovieDetailsPage = () => {
  const {id} = useParams() // Get movie ID from URL
  console.log(id)

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  // Fetch Movie Details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_KEY = 'a3cfd9173c4c154a2b39ffd5297d784d'
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch movie details')
        }
        const data = await response.json()
        console.log(data)

        // Formatting Data
        const formattedMovie = {
          id: data.id,
          title: data.title,
          posterPath: `https://image.tmdb.org/t/p/original${data.poster_path}`,
          voteAverage: data.vote_average,
          overview: data.overview,
          releaseDate: data.release_date,
          duration: data.runtime,
          genre: data.genres ? data.genres.map(g => g.name).join(', ') : [], // Extract genre names
        }

        setMovie(formattedMovie)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }

    fetchMovieDetails()
  }, [id])

  // Fetch Cast Details
  useEffect(() => {
    const fetchCastDetails = async () => {
      const API_KEY = 'a3cfd9173c4c154a2b39ffd5297d784d'
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch cast details')
        }
        const data = await response.json()
        console.log(data)

        const formattedCast = data.cast.map(eachCast => ({
          id: eachCast.id,
          castId: eachCast.cast_id,
          character: eachCast.character,
          profilePath: eachCast.profile_path
            ? `https://image.tmdb.org/t/p/original${eachCast.profile_path}`
            : 'https://via.placeholder.com/150', // Fallback image if profile path is null
          name: eachCast.name,
          originalName: eachCast.original_name,
        }))

        setCast(formattedCast)
      } catch (error) {
        console.error('Error fetching cast details:', error)
      }
    }

    fetchCastDetails()
    console.log(cast)
  }, [id])

  return (
    <div className="movie-page">
      {movie ? (
        <div className="movie-content">
          <MovieDetails movieDetails={movie} />
          <section className="cast-section">
            <h2 className="section-title">Cast Details</h2>
            <ul className="cast-grid">
              {cast.map(each => (
                <CastDetails castDetails={each} key={each.id} />
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )}
    </div>
  )
}

export default SingleMovieDetailsPage
