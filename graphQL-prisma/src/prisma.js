import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'enigma'
})

export { prisma as default }

// prisma.query prisma.mutation prisma.subscription prisma.exists
// These methods take two arguments. The 1st is the operation arguments
// and the 2nd is the selection set

// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId })

//     if(!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author {id name email posts { id title published }} }')

//     return post.author
// }

// createPostForUser('ckfh0zvn700uj07087vijilrt', {
//     title: 'Great books to read',
//     body: 'The art of war',
//     published: true
// }).then((user) => console.log(JSON.stringify(user, undefined, 2)))
//   .catch((err) => console.log(err))

// const updatePostForUser = async (postId, data) => {
//     const postExists = prisma.exists.Post({ id: postId })

//     if(!postExists) {
//         throw new Error('Post not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         data,
//         where: {
//             id: postId
//         }
//     }, '{ author { id name email posts { id title published } } }')

//     return post.author
// }

// updatePostForUser("ckfh7p5v103410708noy48h12", { published: true })
//     .then((user) => console.log(JSON.stringify(user, undefined, 2))) // 3 arguments = 1st. data to log, 2nd replacers to manipulate the object, 3rd spacing
//     .catch((err) => console.log(err))
