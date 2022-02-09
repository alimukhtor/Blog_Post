import createHttpError from "http-errors";

export const userOnlyMiddleware = (req, res, next) => {
  if (req.user.role === "User") {
    next()
  }else{
    next(createHttpError(403, "You are not alloed to make changes!"))
  }
}