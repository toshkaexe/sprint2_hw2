import {Router, Request, Response} from 'express';
import {StatusCode} from "../models/common";
import {blogsCollection, postsCollection} from "../db/db";
import {WithId} from "mongodb";
import {UserDbModel} from "../models/users/users-models";
import {UsersService} from "../domain/users-service";
import {CommentOutputModel} from "../models/comments/comment-model";
import {commentsRepository} from "../repositories/comments-repository";
import {commentsQueryRepository} from "../repositories/comments-query-repository";
import {authMiddleware} from "../middleware/auth-middlewares";
import {validateComments} from "../validators/comments-validation";
import {commentsService} from "../domain/comments-service";

export const commentsRoute = Router({})

commentsRoute.put('/:commentsId',
    authMiddleware,
    validateComments(),
   // inputValidationMiddleware,
  //  ownerMiddlevare,
    async (req: Request, res: Response) => {

        const commentId = req.params.commentId
        const isUpdated = await commentsService.UpdateComment(commentId, req.body)
        isUpdated ? res.sendStatus(StatusCode.NoContent_204) :
            res.sendStatus(StatusCode.NOT_FOUND_404)
    })




commentsRoute.delete('/:commentsId',
    authMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await commentsService.DeleteCommentById(req.params.commentId)
        isDeleted ? res.sendStatus(StatusCode.NoContent_204) :
            res.sendStatus(StatusCode.NOT_FOUND_404)}

)


commentsRoute.get('/:commentId',
    authMiddleware,
    async (req: Request, res: Response) => {
        const foundComment: CommentOutputModel | null = await commentsQueryRepository.getCommentById(req.params.commentId)
        foundComment ? res.status(StatusCode.OK_200).send(foundComment) :
            res.sendStatus(StatusCode.NOT_FOUND_404)
    }


)
