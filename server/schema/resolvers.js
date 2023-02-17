const { UserList, MovieList } = require("../FakeData")
const _ = require("lodash")

const resolvers = {
    Query: {
        //User Resolvers
        users: () => {
            if(UserList) return { users: UserList } 
            return { message: "Something went wrong" }
        },

        user: (parent, { id }) => {
            const user = UserList.find((person)=> person.id === Number(id))
            return user
        },

        //Movie Resolvers
        movies: () => MovieList,

        movie: (parent, { name }) => {
            const movie = MovieList.find((film)=> film.name === name)
            return movie
        },

    },
    User: {
        favouriteMovies: (parent, args, context) =>{
            return MovieList.filter((movie)=>movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010)
        } 
    },
    Mutation: {
        createUser: (parent, { input }) => {
            const user = input
            const lastId = UserList[UserList.length - 1].id
            user.id = lastId + 1
            UserList.push(user)
            return user
        },

        updateUsername: (parent, { input }) => {
            const { id, newUsername } = input
            let updatedUser
            UserList.forEach((user)=>{
                if( user.id === Number(id) ){
                    user.username = newUsername
                    updatedUser = user
                } 
            })
            return updatedUser 
        },

        deleteUser: (parent, { id }) => {
            _.remove(UserList, (user)=> user.id === Number(id ))
            return null
        },
    },
    UsersResult: {
        __resolveType(obj) {
            if(obj.users) return "UsersSuccessfulResult"
            if(obj.message) return "UsersErrorResult"
        }
    }
}

module.exports = { resolvers }