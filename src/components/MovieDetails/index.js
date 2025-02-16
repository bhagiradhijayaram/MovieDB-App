import './index.css'

const MovieDetails = ({movieDetails = {}}) => {
  const {
    title = 'N/A',
    posterPath = '',
    voteAverage = 'N/A',
    overview = 'No overview available',
    releaseDate = 'Unknown',
    duration = 'Unknown',
    genre,
  } = movieDetails

  return (
    <section className="movie-details">
      <div className="movie-details-container">
        <img src={posterPath} alt={title} className="movie-poster" />
        <div className="movie-info">
          <h1 className="movie-title">{title}</h1>
          <p>
            <strong>Rating:</strong> {voteAverage}
          </p>
          <p>
            <strong>Release Date:</strong> {releaseDate}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Genres:</strong> {genre}
          </p>
          <p className="movie-overview">{overview}</p>
        </div>
      </div>
    </section>
  )
}

export default MovieDetails
