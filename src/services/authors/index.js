import express from "express";
import AuthorsModel from "./schema.js";
import { userAuth } from "../userAuth/userAuth.js";
import { userOnlyMiddleware } from "../userAuth/user.js";
import createHttpError from "http-errors";
import { JWTAuthenticate } from "../userAuth/tools.js";
import { JWTAuthMiddleware } from "../userAuth/token.js";
import passport from "passport";

const authorRouter = express.Router();

authorRouter.post("/", async (req, res, next) => {
  try {
    const author = new AuthorsModel(req.body);
    const { _id } = await author.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
authorRouter.get("/", async (req, res, next) => {
  try {
    const author = await AuthorsModel.find();
    res.send(author);
  } catch (error) {
    next(error);
  }
});

authorRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authorRouter.get(
  "/googleRedirect",
  passport.authenticate("google", {
    failureRedirect: `${process.env.GOOGLE_FE_URL}`,
  }),
  async (req, res, next) => {
    try {
      console.log("Token:", process.env.GOOGLE_FE_URL);
      console.log("Hi");
      console.log("Token:", req.user.token);
      res.redirect(
        `${process.env.GOOGLE_FE_URL}?accessToken=${req.user.token}`
      );
    } catch (error) {
      next(error);
    }
  }
);

authorRouter.get(
  "/githubLogin",
  passport.authenticate("github", { scope: [] })
);
authorRouter.get(
  "/githubRedirect",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res, next) => {
    try {
      res.redirect(
        `${process.env.GOOGLE_FE_URL}?accessToken=${req.user.token}`
      );
    } catch (error) {
      next(error);
    }
  }
);

authorRouter.get("/facebookLogin", passport.authenticate("facebook"));

authorRouter.get(
    "/facebookRedirect",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    async (req, res, next) => {
      try {
        res.redirect(
          `${process.env.GOOGLE_FE_URL}?accessToken=${req.user.token}`
        );
      } catch (error) {
        next(error);
      }
    }
  );

authorRouter.get("/:authorId", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const authorId = await AuthorsModel.findById(req.params.authorId);
    res.send(authorId);
  } catch (error) {
    next(error);
  }
});
authorRouter.put("/:authorId", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const updateAuthor = await AuthorsModel.findByIdAndUpdate(
      req.params.authorId,
      req.body,
      { new: true }
    );
    res.send(updateAuthor);
  } catch (error) {
    next(error);
  }
});
authorRouter.delete("/:authorId", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await AuthorsModel.findByIdAndDelete(req.params.authorId);
    res.send();
  } catch (error) {
    next(error);
  }
});

authorRouter.post("/register", async (req, res, next) => {
  try {
    const user = new AuthorsModel(req.body);
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const author = await AuthorsModel.checkCredentials(email, password);
    if (author) {
      const accessToken = await JWTAuthenticate(author);
      console.log(accessToken);
      res.send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials arent ok!"));
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

authorRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.send({ message: "No Token Provided!" });
    const author = await AuthorsModel.findById(req.user);
    if (author) {
      res.status(200).send(author);
    } else {
      next(createHttpError(404, "Author not found!"));
    }
  } catch (error) {
    next(error);
  }
});

export default authorRouter;
