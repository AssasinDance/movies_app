import React, { useContext, useEffect, useState } from 'react'
import { Col, Layout, Tag, Rate, ConfigProvider } from 'antd'

import Img from '../img/img'
import { GenresContext } from '../listOfCards/listOfCards'
import { moviesdbApiAddRating } from '../moviesdbApi/moviesdbApi'

const { Content, Sider } = Layout

export default function FilmCard(props) {
  let borderColor
  const genres = useContext(GenresContext)
  if (props.rating === 0) {
    borderColor = '#444'
  } else if (props.rating < 3) {
    borderColor = '#E90000'
  } else if (props.rating < 5) {
    borderColor = '#E97E00'
  } else if (props.rating < 7) {
    borderColor = '#E9D100'
  } else {
    borderColor = '#66E900'
  }

  const [rateValue, setRateValue] = useState(0)

  useEffect(() => {
    if (props.ratedMovies) {
      const arrayId = []
      for (let item of props.ratedMovies) {
        arrayId.push(item.id)
        if (item.id === props.movieId) {
          setRateValue(item.rating)
        }
      }
      if (!arrayId.some((item) => item === props.movieId)) {
        setRateValue(0)
      }
    } else setRateValue(0)
  }, [props.ratedMovies])

  return (
    <Col xl={12} xs={24} className="root__column">
      <Layout className="root__layout">
        <Sider width="auto" className="root__sider">
          <Img poster_URL={props.poster_URL} />
        </Sider>
        <Content className="root__content">
          <div className="root__film-header">
            <h5 className="root__title">{props.title}</h5>
            <div className="root__rating" style={{ borderColor: borderColor }}>
              <div className="root__rating-text">
                {props.rating ? (props.rating.toFixed(1) !== '10.0' ? props.rating.toFixed(1) : '10') : 'NR'}
              </div>
            </div>
          </div>
          <div className="root__date">{props.date}</div>
          <div className="root__tags">
            {props.genre_ids.map((genreId) => {
              let genre
              if (genres) {
                for (let item of genres) {
                  if (item.id === genreId) genre = item.name
                }
              }
              return (
                <Tag key={genreId} style={{ marginTop: '8px' }}>
                  {genre}
                </Tag>
              )
            })}
          </div>
          <div className="root__description">{props.description}</div>
          <ConfigProvider
            theme={{
              components: {
                Rate: {
                  starSize: 18,
                },
              },
            }}
          >
            <Rate
              defaultValue={0}
              value={rateValue}
              className="root__rate"
              count={10}
              onChange={(e) => {
                setRateValue(e)
                moviesdbApiAddRating(props.sessionId, props.movieId, e)
              }}
            />
          </ConfigProvider>
        </Content>
      </Layout>
    </Col>
  )
}
