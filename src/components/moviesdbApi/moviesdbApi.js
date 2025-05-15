export async function moviesdbApi(query = 'Alice in Wonderland', page = 1) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZkZThjODBiMjBhMTZiODFlMzY2YmY0ZmVjNDA5NSIsIm5iZiI6MTc0NDg5NDg2MS44NTIsInN1YiI6IjY4MDBmYjhkYjExM2ZmODcyM2Q5NTk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyslDGr1QsELAzFhceKELB7lUwIfHb2iCdqes0BnSZk',
    },
  }
  return await fetch(url, options)
    .then((res) => {
      if (!res.ok) throw new Error()
      return res.json()
    })
    .then((json) => {
      return [json.results, json.total_pages, json.page]
    })
}

export async function moviesdbApiGenre() {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZkZThjODBiMjBhMTZiODFlMzY2YmY0ZmVjNDA5NSIsIm5iZiI6MTc0NDg5NDg2MS44NTIsInN1YiI6IjY4MDBmYjhkYjExM2ZmODcyM2Q5NTk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyslDGr1QsELAzFhceKELB7lUwIfHb2iCdqes0BnSZk',
    },
  }

  return await fetch(url, options)
    .then((res) => {
      if (!res.ok) throw new Error()
      return res.json()
    })
    .then((json) => {
      return json.genres
    })
}

export async function moviesdbApiCreateGuest() {
  const url = 'https://api.themoviedb.org/3/authentication/guest_session/new'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZkZThjODBiMjBhMTZiODFlMzY2YmY0ZmVjNDA5NSIsIm5iZiI6MTc0NDg5NDg2MS44NTIsInN1YiI6IjY4MDBmYjhkYjExM2ZmODcyM2Q5NTk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyslDGr1QsELAzFhceKELB7lUwIfHb2iCdqes0BnSZk',
    },
  }

  return await fetch(url, options)
    .then((res) => {
      if (!res.ok) throw new Error()
      return res.json()
    })
    .then((json) => {
      return json.guest_session_id
    })
}

export async function moviesdbApiAddRating(sessionId, movieId, value) {
  if (value !== 0) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZkZThjODBiMjBhMTZiODFlMzY2YmY0ZmVjNDA5NSIsIm5iZiI6MTc0NDg5NDg2MS44NTIsInN1YiI6IjY4MDBmYjhkYjExM2ZmODcyM2Q5NTk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyslDGr1QsELAzFhceKELB7lUwIfHb2iCdqes0BnSZk',
      },
      body: `{"value": ${value}}`,
    }

    return await fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((json) => {
        return json
      })
  } else {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZkZThjODBiMjBhMTZiODFlMzY2YmY0ZmVjNDA5NSIsIm5iZiI6MTc0NDg5NDg2MS44NTIsInN1YiI6IjY4MDBmYjhkYjExM2ZmODcyM2Q5NTk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyslDGr1QsELAzFhceKELB7lUwIfHb2iCdqes0BnSZk',
      },
    }

    return await fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((json) => {
        return json
      })
  }
}

export async function moviesdbApiGetRatedMovies(sessionId, page = 1) {
  const url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZkZThjODBiMjBhMTZiODFlMzY2YmY0ZmVjNDA5NSIsIm5iZiI6MTc0NDg5NDg2MS44NTIsInN1YiI6IjY4MDBmYjhkYjExM2ZmODcyM2Q5NTk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyslDGr1QsELAzFhceKELB7lUwIfHb2iCdqes0BnSZk',
    },
  }

  return await fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        return { results: [] }
      }
      return res.json()
    })
    .then((json) => {
      return [json.results, json.total_pages, json.page]
    })
}
