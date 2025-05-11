import { debounce } from 'lodash'
import { useCallback, useEffect } from 'react'

import { moviesdbApi, moviesdbApiGetRatedMovies } from '../moviesdb-api/moviesdb-api'

export default function SearchInput(props) {
  const debouncedSearch = useCallback(
    debounce((query) => {
      props.setData(null)
      moviesdbApi(query)
        .then(([body, total_pages, page]) => {
          props.setData(body)
          props.setTotalPages(total_pages)
          props.setPage(page)
          props.setRatedMovies(null)
          moviesdbApiGetRatedMovies(props.sessionId)
            .then(([ratedMovies, total_pages, page]) => {
              props.setRatedMovies(ratedMovies)
              props.setPageRated(page)
              props.setTotalPagesRated(total_pages)
            })
            .catch((err) => {
              console.error(err)
              props.setRatedMovies(false)
            })
        })
        .catch((err) => {
          console.error(err)
          props.setData(false)
        })
    }, 300),
    []
  )

  const searchInputHandler = (event) => {
    const value = event.target.value
    props.setQuery(value)
    debouncedSearch.cancel()

    debouncedSearch(value)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel() // Отменяем запланированный вызов
    }
  }, [debouncedSearch])

  return (
    <input
      type="search"
      className="root__search search"
      placeholder="Type to search..."
      onChange={(event) => {
        searchInputHandler(event)
      }}
    ></input>
  )
}
