import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// prisma.query prisma.mutation prisma.subscription prisma.exists
// These methods take two arguments. The 1st is the operation arguments
// and the 2nd is the selection set

// // prisma.query
// prisma.query.users(null, '{ id name email posts { id title body } comments { id text } }')
//     .then((data) => console.log(JSON.stringify(data, undefined, 2)))
//     .catch((err) =>  console.log(err))

// prisma.query.comments(null, '{ id text author { id name } }')
//     .then((data) => console.log(JSON.stringify(data, undefined, 2)))
//     .catch((err) => console.log(err))

// // prisma.mutation
// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL!!",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "ckfh0zvn700uj07087vijilrt"
//             }
//         }
//     }
// }, '{ id title body published }')
//     .then((data) => {
//         console.log(data)
//         return prisma.query.users(null, '{ id name email posts { id title body }}')
//     })
//     .then((data) => console.log(JSON.stringify(data, undefined, 2)))

prisma.mutation.updatePost({
    data: {
        body: "Trying to mess around with mutations via Node.js",
        published: true
    },
    where: {
        id: "ckfh24w7801mw0708i3c6862c"
    }
}, '{ id title body published}')
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
        return prisma.query.posts(null, '{ id title body published }')
    })
    .then((data) => console.log(JSON.stringify(data, undefined, 2)))