export const notFoundError =async(err, res, req, next)=>{
    if(err.status === 404){
        res.status(404).send({message:err.message})
    }else{
        next(err)
    }
}

export const badRequestError = async(err, res, req, next)=> {
    if(err.status === 401){
        res.status(401).send({message:err.message || "Bad request"})
    }else{
        next(err)
    }
}

export const genericServerError = async(err, res, req, next)=> {
    if(err.status === 500){
        res.status(500).send({message:err.message})
    }else{
        next(err)
    }
}