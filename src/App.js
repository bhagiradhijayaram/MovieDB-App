import {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import PopularMoviesPage from './components/PopularMoviesPage'
import UpcomingMoviesPage from './components/UpcomingMoviesPage'
import TopRatedMoviesPage from './components/TopRatedMoviesPage'
import SingleMovieDetailsPage from './components/SingleMovieDetailsPage'
import SearchedMoviesPage from './components/SearchedMoviesPage'

import SearchContext from './context/SearchContext'

import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')

  const onTriggerSearchingQuery = text => {
    setSearchInput(text)
  }

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        onTriggerSearchingQuery,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={PopularMoviesPage} />
          <Route exact path="/upcoming" component={UpcomingMoviesPage} />
          <Route exact path="/top-rated" component={TopRatedMoviesPage} />
          <Route exact path="/movie/:id" component={SingleMovieDetailsPage} />
          <Route exact path="/search" component={SearchedMoviesPage} />
        </Switch>
      </BrowserRouter>
    </SearchContext.Provider>
  )
}

export default App
