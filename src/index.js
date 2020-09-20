import { GraphQLServer } from 'graphql-yoga'
import {v4 as uuid} from "uuid"

// Scalar types of GraphQL: String, Boolean, , Int, Float, ID

// Demo user data
const users = [{
    id: 1,
    name: 'Petros',
    email: 'pit.trak@gmail.com',
    age: 34,
    comments: 4
},{
    id: 2,
    name: 'Eleni',
    email: 'eleni@gmail.com',
    comments: 5
}, {
    id: 3,
    name: 'Maggie',
    email: 'maggie@gmail.com',
    age: 36,
    comments: 7
}]

// Demo posts data
const posts = [{
    id: 1,
    title: 'Post#1',
    body: 'Body of first post',
    isPublished: true,
    author: 1,
    comments: 4
},{
    id: 2,
    title: 'Post#2',
    body: 'Body of second post',
    isPublished: false,
    author: 1,
    comments: 5
},{
    id: 3,
    title: 'Post#3',
    body: 'Body of third post',
    isPublished: false,
    author: 2,
    comments: 6
}]

// Demo comments data
const comments = [{
    id: 4,
    text: 'The text for the first comment',
    author: 1,
    post: 1
},{
    id: 5,
    text: 'Second comment',
    author: 2,
    post: 1
},{
    id: 6,
    text: 'Third comment',
    author: 2,
    post: 2
},{
    id: 7,
    text: 'Fourth comment and we are done!',
    author: 3,
    post: 3
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, isPublished: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!):Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        comments(parent, args, ctx, info) {
            return comments
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
    },
    Mutation: {
        createUser(parent, args, ctx,info) {
            const emailTaken = users.some((user) => user.email === args.email)

            if(emailTaken) {
                throw new Error('Email taken')
            }

            const user = {
                id: uuid(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

            if(!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuid(),
                title: args.title,
                body: args.body,
                isPublished: args.isPublished,
                author: args.author
            }

            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author )
            const postExists = posts.some((post) => post.id === args.post && post.isPublished
            )

            if(!userExists || !postExists) {
                throw new Error('Unable to find user and post')
            }

            const comment = {
                id: uuid(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            comments.push(comment)
            return comment
        }
    },
    Post: {
        // parent parameter corresponds to Post type
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
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