import React, { useState, useEffect, createContext } from 'react'
import { Row, Spin, Alert, Pagination, Tabs } from 'antd'
import { format } from 'date-fns'

import FilmCard from '../filmCard/filmCard.js'
import SearchInput from '../search/search.js'
import {
  moviesdbApi,
  moviesdbApiGenre,
  moviesdbApiCreateGuest,
  moviesdbApiGetRatedMovies,
} from '../moviesdbApi/moviesdbApi.js'

export const GenresContext = createContext([])

export default function ListOfCards() {
  const [data, setData] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPagesRated, setTotalPagesRated] = useState(1)
  const [page, setPage] = useState(1)
  const [pageRated, setPageRated] = useState(1)
  const [query, setQuery] = useState('Alice in Wonderland')
  const [genres, setGenres] = useState([])
  const [sessionId, setSessionId] = useState()
  const [ratedMovies, setRatedMovies] = useState(null)
  const descriptionLength = 150
  const titleLength = 45

  useEffect(() => {
    moviesdbApi()
      .then(([body, total_pages, page]) => {
        setData(body)
        setTotalPages(total_pages)
        setPage(page)
      })
      .catch((err) => {
        console.error(err)
        setData(false)
      })

    moviesdbApiGenre()
      .then((genresArray) => {
        setGenres(genresArray)
      })
      .catch((err) => {
        console.error(err)
        setData(false)
      })

    moviesdbApiCreateGuest()
      .then((guest_session_id) => {
        setSessionId(guest_session_id)
      })
      .catch((err) => {
        console.error(err)
        setData(false)
      })
  }, [])

  function paginationHandler(page, type = 'search') {
    if (type === 'rated') {
      setRatedMovies(null)
      moviesdbApiGetRatedMovies(sessionId, page)
        .then(([ratedMovies, total_pages, page]) => {
          setRatedMovies(ratedMovies)
          setPageRated(page)
          setTotalPagesRated(total_pages)
        })
        .catch((err) => {
          console.error(err)
          setRatedMovies(false)
        })
    } else {
      setData(null)
      moviesdbApi(query, page)
        .then(([body, total_pages, page]) => {
          setData(body)
          setTotalPages(total_pages)
          setPage(page)
        })
        .catch((err) => {
          console.error(err)
          setData(false)
        })
    }
  }

  const Content = () => {
    if (data !== null && data.length === 0) {
      return (
        <Row gutter={[36, 36]} justify="center" className="root__row">
          <span className="root__no-results-message">No results</span>
        </Row>
      )
    } else if (data) {
      return (
        <GenresContext.Provider value={genres}>
          <Row gutter={[36, 36]} justify="center" className="root__row">
            {data.map((item, index) => {
              return (
                <FilmCard
                  key={index}
                  title={
                    item.title
                      ? item.title.length > titleLength
                        ? item.title.substr(0, titleLength) +
                          item.title.substr(titleLength).split('.')[0].split(',')[0].split(' ')[0] +
                          '...'
                        : item.title
                      : 'No title'
                  }
                  date={
                    item.release_date
                      ? format(
                          new Date(
                            item.release_date.split('-')[0],
                            item.release_date.split('-')[1],
                            item.release_date.split('-')[2]
                          ),
                          'MMMM dd, yyyy'
                        )
                      : 'Unknown release date'
                  }
                  description={
                    item.overview
                      ? item.overview.length > descriptionLength
                        ? item.overview.substr(0, descriptionLength) +
                          item.overview.substr(descriptionLength).split('.')[0].split(',')[0].split(' ')[0] +
                          '...'
                        : item.overview
                      : 'No description'
                  }
                  poster_URL={
                    item.poster_path
                      ? 'https://image.tmdb.org/t/p/original' + item.poster_path
                      : '../../img/posterTemp.png'
                  }
                  rating={item.vote_average}
                  genre_ids={item.genre_ids}
                  sessionId={sessionId}
                  movieId={item.id}
                  ratedMovies={ratedMovies}
                  setData={setData}
                  setRatedMovies={setRatedMovies}
                />
              )
            })}
          </Row>
          <Pagination
            align="center"
            current={page}
            defaultCurrent={1}
            total={totalPages * 10}
            showSizeChanger={false}
            onChange={(page) => paginationHandler(page)}
          />
        </GenresContext.Provider>
      )
    } else if (data === false) {
      return <Alert message="Something went wrong!" type="error" showIcon className="root__alert" />
    } else {
      return (
        <div className="flex-container">
          <Spin size="large" className="root__spinner" />
        </div>
      )
    }
  }

  const Search = () => {
    return (
      <>
        <SearchInput
          setData={setData}
          setTotalPages={setTotalPages}
          setPage={setPage}
          page={page}
          setQuery={setQuery}
          setRatedMovies={setRatedMovies}
          sessionId={sessionId}
          setPageRated={setPageRated}
          setTotalPagesRated={setTotalPagesRated}
        />
        <Content />
      </>
    )
  }

  const Rated = () => {
    if (ratedMovies !== null && ratedMovies.length === 0) {
      return (
        <GenresContext.Provider value={genres}>
          <Row gutter={[36, 36]} justify="center" className="root__row">
            <span className="root__no-results-message">No rated movies</span>
          </Row>
        </GenresContext.Provider>
      )
    } else if (ratedMovies) {
      return (
        <GenresContext.Provider value={genres}>
          <Row gutter={[36, 36]} justify="center" className="root__row">
            {ratedMovies.map((item, index) => {
              return (
                <FilmCard
                  key={index}
                  title={
                    item.title
                      ? item.title.length > titleLength
                        ? item.title.substr(0, titleLength) +
                          item.title.substr(titleLength).split('.')[0].split(',')[0].split(' ')[0] +
                          '...'
                        : item.title
                      : 'No title'
                  }
                  date={
                    item.release_date
                      ? format(
                          new Date(
                            item.release_date.split('-')[0],
                            item.release_date.split('-')[1],
                            item.release_date.split('-')[2]
                          ),
                          'MMMM dd, yyyy'
                        )
                      : 'Unknown release date'
                  }
                  description={
                    item.overview
                      ? item.overview.length > descriptionLength
                        ? item.overview.substr(0, descriptionLength) +
                          item.overview.substr(descriptionLength).split('.')[0].split(',')[0].split(' ')[0] +
                          '...'
                        : item.overview
                      : 'No description'
                  }
                  poster_URL={
                    item.poster_path
                      ? 'https://image.tmdb.org/t/p/original' + item.poster_path
                      : '../../img/posterTemp.png'
                  }
                  rating={item.vote_average}
                  genre_ids={item.genre_ids}
                  sessionId={sessionId}
                  movieId={item.id}
                  ratedMovies={ratedMovies}
                  setData={setData}
                  setRatedMovies={setRatedMovies}
                />
              )
            })}
          </Row>
          <Pagination
            align="center"
            current={pageRated}
            defaultCurrent={1}
            total={totalPagesRated * 10}
            showSizeChanger={false}
            onChange={(page) => paginationHandler(page, 'rated')}
          />
        </GenresContext.Provider>
      )
    } else if (ratedMovies === false) {
      return <Alert message="Something went wrong!" type="error" showIcon className="root__alert" />
    } else {
      return (
        <div className="flex-container">
          <Spin size="large" className="root__spinner" />
        </div>
      )
    }
  }

  return (
    <Tabs
      centered={true}
      className="root__tabs"
      onChange={() => {
        setRatedMovies(null)
        moviesdbApiGetRatedMovies(sessionId)
          .then(([ratedMovies, total_pages, page]) => {
            setRatedMovies(ratedMovies)
            setPageRated(page)
            setTotalPagesRated(total_pages)
          })
          .catch((err) => {
            console.error(err)
            setRatedMovies(false)
          })
      }}
      items={[
        {
          key: '1',
          label: 'Search',
          children: Search(),
        },
        {
          key: '2',
          label: 'Rated',
          children: Rated(),
        },
      ]}
    />
  )
}
