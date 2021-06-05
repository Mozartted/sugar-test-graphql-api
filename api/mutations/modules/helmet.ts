import logger from "../../services/logger"

export const Helmet = (resolver: any) => async (...args :any) =>{
    try {
        return resolver(...args)
    }catch(e){
        logger.error(e.message)
        throw e
    }
}