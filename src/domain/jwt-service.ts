
import {ObjectId, WithId} from "mongodb";

import jwt from 'jsonwebtoken';
import {UserDbModel} from "../models/users/users-models";

export const jwtService =
    {
        async createJWT(user: WithId<UserDbModel>) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '2h'})
            return token
        },

        async getUserIdByToken(token: string) {
            try {
                const result: any = jwt.verify(token, process.env.JWT_SECRET)
                return new ObjectId(result.userId)
            } catch (error) {
                return null
            }
        }

    }