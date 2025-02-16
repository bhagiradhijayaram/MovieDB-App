import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  return (
    <li className="movie_card_container">
      <img src={posterPath} alt="" className="movie_poster_image" />
      <div className="rating-container">
        <p>{voteAverage}</p>
      </div>
      <h1 className="movie_title">{title}</h1>
      <Link to={`/movie/${id}`}>
        <button type="button" className="view-details-button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
