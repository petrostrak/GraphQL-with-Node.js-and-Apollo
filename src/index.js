import { GraphQLServer } from 'graphql-yoga'

// Scalar types of GraphQL: String, Boolean, , Int, Float, ID

// Demo user data
const users = [{
    id: 1,
    name: 'Petros',
    email: 'pit.trak@gmail.com',
    age: 34
},{
    id: 2,
    name: 'Eleni',
    email: 'eleni@gmail.com'
}, {
    id: 3,
    name: 'Maggie',
    email: 'maggie@gmail.com',
    age: 36
}]

// Demo posts data
const posts = [{
    id: 1,
    title: 'Post#1',
    body: 'Body of first post',
    isPublished: true
},{
    id: 2,
    title: 'Post#2',
    body: 'Body of second post',
    isPublished: false
},{
    id: 3,
    title: 'Post#3',
    body: 'Body of third post',
    isPublished: false
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }

            // includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
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