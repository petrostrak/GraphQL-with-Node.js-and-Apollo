import { GraphQLServer } from 'graphql-yoga'

// Scalar types of GraphQL: String, Boolean, , Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: '123abc',
                name: 'Petros',
                email: 'pit.trak@gmail.com',
                age: 34
            }
        },
        post() {
            return {
                id: 'abc123',
                title: 'This is a title of a post',
                body: 'This is a body of a post',
                isPublished: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

// visit localhost:4000 to do the queries
server.start(() => {
    console.log('The server is up');
})