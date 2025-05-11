import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'

export default function Img(props) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl('')
    fetch(props.poster_URL)
      .then((response) => {
        if (props.poster_URL[0] === '.') throw new Error()
        return response.blob()
      })
      .then((image) => {
        setUrl(URL.createObjectURL(image))
      })
      .catch(() => {
        setUrl('../../img/posterTemp.png')
      })
  }, [props.poster_URL])

  if (!url) {
    return <Spin size="large" className="root__poster-spinner" />
  }
  return <img src={url[0] === '.' ? require('../../img/posterTemp.png') : url} className="root__image" alt="poster" />
}
