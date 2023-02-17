import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'

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

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input:  $input ){
            name
            id
        }
    }
`

const DisplayData = () => {

    const [movieName, setMovieName] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [nationality, setNationality] = useState("")
    const [age, setAge] = useState(1)
    const { data: usersData, loading: usersLoading, error: usersError, refetch } = useQuery(QUERY_ALL_USERS)
    const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(QUERY_ALL_MOVIES)
    const [ fetchMovie, { data:movieData } ] = useLazyQuery(QUERY_MOVIE_BY_NAME)
    const [createUser] = useMutation(CREATE_USER_MUTATION)

    if (usersLoading || moviesLoading) {
        return <p>Loading...</p>
    }

    if (usersError || moviesError) {
        return <p>Something Went Wrong</p>
    }

    return (
        <div>
            <div>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' type="text" />
                <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' type="text" />
                <input value={age} onChange={(e)=>setAge(e.target.value)} placeholder='Age' type="number" />
                <input value={nationality} onChange={(e)=>setNationality(e.target.value)} placeholder='Nationality' type="text" />
                <button 
                onClick={()=>{
                    createUser({
                        variables: {
                            input: { name, username, age: Number(age), nationality    }
                        }
                    })
                    refetch()
                }}
                >
                    Create User
                </button>
            </div>
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