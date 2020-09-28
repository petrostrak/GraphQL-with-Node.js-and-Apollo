import jwt from 'jsonwebtoken'

const getUserId = (request) => {
    const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization

    if(!header) {
        throw new Error('Authentication required')
    }

    const token = header.replace('Bearer ', '')

    const decoded =  jwt.verify(token, 'thisisasecret')

    return decoded.userId
}

export { getUserId as default }