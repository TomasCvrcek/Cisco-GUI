import express from 'express';

const router = express.Router();




export default function connectPortRoute(User) {
//authorization
    router.use( async (request, response, next) => {

        //verify auth
        const {authorization} = request.headers

        if (!authorization) {
            return response.status(401).json({error: 'Authorization token required'})
        }

        const token = authorization.split(' ')[1]


        try{
            const {_id} = jwt.verify(token, SECRET)

            request.user = await User.findOne({_id}).select('_id')
            next()
            
        } catch (error){
            console.log(error)
            return response.status(401).json({error: 'Request is not authorized'})
        }
    })
    return router
}