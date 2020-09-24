import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// prisma.query prisma.mutation prisma.subscription prisma.exists
// These methods take two arguments. The 1st is the operation arguments
// and the 2nd is the selection set

// 1. Create a new post
// 2. Fetch all of the info about the user (author)

// const createPostForUser = async (authorId, data) => {
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ id }')

//     const user = await prisma.query.user({
//         where: {
//             id: authorId
//         }
//     }, '{ id name email posts { id title published } }')

//     return user
// }

// createPostForUser('ckfh0zvn700uj07087vijilrt', {
//     title: 'Great books to read',
//     body: 'The art of war',
//     published: true
// }).then((user) => console.log(JSON.stringify(user, undefined, 2)))

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        data,
        where: {
            id: postId
        }
    }, '{ author { id } }')

    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name email posts { id title published } }')

    return user
}

updatePostForUser("ckfh7p5v103410708noy48h12", { published: false })
    .then((user) => console.log(JSON.stringify(user, undefined, 2))) // 3 arguments = 1st. data to log, 2nd replacers to manipulate the object, 3rd spacing
