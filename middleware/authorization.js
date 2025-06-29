import jwt from 'jsonwebtoken'
const authorization = (req, res, next) => {
    const JWT = req.headers["authorization"]
    const token = JWT && JWT.split(' ')[1]
    if(token == null){
        res.status(401).send('authorization is empty')
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (error)=>{
        if(error){
            console.log(error)        
            return res.send('something as gone wrong')
        } 
        next();
    })
}

export default authorization