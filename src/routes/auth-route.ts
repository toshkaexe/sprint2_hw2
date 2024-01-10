import {Router, Request, Response} from 'express';
import {StatusCode} from "../models/common";
import {blogsCollection, postsCollection} from "../db/db";
import {WithId} from "mongodb";
import {UserDbModel} from "../models/users/users-models";
import {usersService} from "../domain/users-service";

export const authRoute = Router({})

authRoute.post('/login',

    async (req: Request, res: Response): Promise<void>  => {
        const user: WithId<UserDbModel> | null  = await
            usersService.checkCredentials(req.body)
        console.log("-------------------------------")
        console.log(user)

        if (!user) {

            res.sendStatus(StatusCode.Unauthorized_401)
            return
        }
        res.sendStatus(StatusCode.NoContent_204)
    }
)
