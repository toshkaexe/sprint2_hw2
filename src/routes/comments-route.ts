import {Router, Request, Response} from 'express';
import {StatusCode} from "../models/common";
import {blogsCollection, postsCollection} from "../db/db";
import {WithId} from "mongodb";
import {UserDbModel} from "../models/users/users-models";
import {UsersService} from "../domain/users-service";

export const commentsRoute = Router({})

commentsRoute.put('/:commentsId',

)


commentsRoute.delete('/:commentsId',


)


commentsRoute.get('/id',


)
