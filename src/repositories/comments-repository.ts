import {CommentDbModel, commentMapper, CommentOutputModel} from "../models/comments/comment-model";
import {InsertOneResult, ObjectId} from "mongodb";
import {commentsCollection} from "../db/db";

export const commentsRepository = {

    async createComment(newComment: CommentDbModel): Promise<CommentOutputModel> {
        const result: InsertOneResult<CommentDbModel> = await commentsCollection.insertOne({...newComment})
        return commentMapper({_id: result.insertedId, ...newComment})
    },

    async updateComment(id: string, body: any): Promise<any> {
        if(!ObjectId.isValid(id)) return false
        const result = await commentsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                content: body.content
            }
        })
        return result.matchedCount === 1
    },

    async deleteComment(id: string): Promise<boolean> {
        if(!ObjectId.isValid(id)) return false
        const result = await commentsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAll() {
        return  await commentsCollection.deleteMany({})
    },

}