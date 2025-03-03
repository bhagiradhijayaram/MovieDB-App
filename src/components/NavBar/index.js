import {useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import SearchContext from '../../context/SearchContext'
import './index.css'

const NavBar = props => {
  const {onTriggerSearchingQuery} = useContext(SearchContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State for menu toggle

  // Handle search input changes
  const onChangeSearchInput = event => {
    onTriggerSearchingQuery(event.target.value)
  }

  // Handle search button click
  const onSearchClick = event => {
    const {history} = props
    event.preventDefault()
    history.replace('/search')
  }

  // Toggle menu on button click
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  return (
    <nav className="nav_container">
      <h1 className="logo_name">MovieDB</h1>

      {/* Desktop Menu */}
      <div className="nav_menu_container_desktop">
        <ul className="nav_menu_container">
          <li className="nav_menu_item">
            <Link to="/" className="nav_link">
              Popular
            </Link>
          </li>
          <li className="nav_menu_item">
            <Link to="/top-rated" className="nav_link">
              Top Rated
            </Link>
          </li>
          <li className="nav_menu_item">
            <Link to="/upcoming" className="nav_link">
              Upcoming
            </Link>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      <form className="search_container">
        <input
          type="search"
          className="search-field"
          placeholder="Search.."
          role="textbox"
          onChange={onChangeSearchInput}
        />
        <button type="submit" className="search_button" onClick={onSearchClick}>
          Search
        </button>
      </form>

      {/* Mobile Menu Button */}
      <div className="nav_menu_container_mobile">
        <button className="menu_button" type="button" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMenuOpen && (
        <div className="mobile_menu">
          <ul className="mobile_menu_list">
            <li className="mobile_menu_item">
              <Link to="/" className="nav_link" onClick={toggleMenu}>
                Popular
              </Link>
            </li>
            <li className="mobile_menu_item">
              <Link to="/top-rated" className="nav_link" onClick={toggleMenu}>
                Top Rated
              </Link>
            </li>
            <li className="mobile_menu_item">
              <Link to="/upcoming" className="nav_link" onClick={toggleMenu}>
                Upcoming
              </Link>
            </li>
            <li className="mobile_menu_item">
              {/* Search Bar */}
              <form className="search_container_mobile">
                <input
                  type="search"
                  className="search-field"
                  placeholder="Search Movies..."
                  onChange={onChangeSearchInput}
                />
                <button
                  type="submit"
                  className="search_button"
                  onClick={onSearchClick}
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default withRouter(NavBar)
