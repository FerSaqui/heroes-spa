import React from 'react'
import { HeroCard } from '../components/HeroCard'
import { useForm } from '../../hooks/useform'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string';
import { getHeroesByName } from '../helpers/getHeroesByName';

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {q = ""} = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText,  onInputChange} = useForm({
    searchText : q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if(searchText.trim().length <= 1) return;

    navigate(`?q=${ searchText.toLowerCase().trim() }`);
  }

  return (
    <>
        <h1>Search</h1>
        <hr />

        <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={onSearchSubmit}>
              <input
                type="text"
                className='form-control'
                placeholder='Search a hero'
                name='searchText'
                autoComplete='off'
                value={searchText}
                onChange={onInputChange}
              />

              <button
                className='btn btn-outline-primary mt-1'
              >
                Search
              </button>
            </form>
          </div>

          <div className="col-7">
            <h4>Results</h4>
            <hr />

            <div data-testid="divSearchHeroeTxt" className='alert alert-primary animate__animated animate__fadeIn' style={{ display: showSearch ? "" : "none"}}>
              Search a Hero
            </div>
            <div className='alert alert-danger animate__animated animate__fadeIn' style={{ display: showError ? "" : "none"}}>
              No hero with <b>{ q }</b>
            </div>

            {
              heroes.map(heroe => (
                <HeroCard key={heroe.id} {...heroe}/>
              ))
            }
          </div>
        </div>
    </>
  )
}