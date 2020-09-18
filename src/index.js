import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'My name is Petros'
        },
        location() {
            return 'I leave in Athens, Greece'
        },
        bio() {
            return 'I am an entry level full stack developer'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up');
})