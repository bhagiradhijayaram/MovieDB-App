import './index.css'

const CastDetails = ({castDetails}) => {
  const {name, profilePath, character} = castDetails

  return (
    <li className="cast-card">
      <img
        src={profilePath || 'https://via.placeholder.com/150'}
        alt={name}
        className="cast-image"
        width={100}
      />
      <p className="cast-name">{name}</p>
      <p className="cast-character">
        <strong>Role:</strong> {character}
      </p>
    </li>
  )
}

export default CastDetails
