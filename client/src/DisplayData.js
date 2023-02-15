import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client'

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
        }
    }
`

const QUERY_ALL_MOVIES = gql`
    query GetAllMOVIES {
        movies {
            id
            name
            yearOfPublication
        }
    }
`

const QUERY_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`

const DisplayData = () => {

    const [movieName, setMovieName] = useState("")
    const { data: usersData, loading: usersLoading, error: usersError } = useQuery(QUERY_ALL_USERS)
    const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(QUERY_ALL_MOVIES)
    const [ fetchMovie, { data:movieData } ] = useLazyQuery(QUERY_MOVIE_BY_NAME)

    if (usersLoading || moviesLoading) {
        return <p>Loading...</p>
    }

    if (usersError || moviesError) {
        return <p>Something Went Wrong</p>
    }

    return (
        <div>
            <p>Users</p>
            {usersData && usersData.users.map((user) => (
                <div key={user.id} >{user.name}</div>
            ))}

            <p>Movies</p>
            {moviesData && moviesData.movies.map((movies) => (
                <div key={movies.id} >{movies.name}</div>
            ))}

            <div>
                <input onChange={(e)=>setMovieName(e.target.value )} type="text" placeholder='Interstellar' />
                <button onClick={()=>{
                    fetchMovie({
                        variables: {
                            name: movieName
                        }
                    })
                }} >Search</button>
                { movieData && <div>
                    <p>{movieData.movie.name}</p>
                    <p>{movieData.movie.yearOfPublication}</p>
                </div> }
            </div>
        </div>
    )
}

export default DisplayData