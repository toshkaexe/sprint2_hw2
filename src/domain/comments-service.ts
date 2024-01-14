import {CommentDbModel, CommentOutputModel} from "../models/comments/comment-model";
import {commentsRepository} from "../repositories/comments-repository";
import {OutputPostModel} from "../models/posts/posts-models";
import {PostsQueryRepository} from "../repositories/posts-query-repository";

export class commentsService {

    static async CreateComment(
        userData: {userId: string, userLogin: string}, postId: string, content: string):
        Promise<CommentOutputModel | null> {

        const post: OutputPostModel | null = await PostsQueryRepository.findPostById(postId)
        console.log(post, 'its post')

        if (!post) return null
        const newComment: CommentDbModel = {
            content: content,
            commentatorInfo: {
                userId: userData.userId,
                userLogin: userData.userLogin
            },
            createdAt: new Date().toISOString()
        }

        return await commentsRepository.createComment(newComment)
    }

    static async UpdateComment(id: string, body: CommentDbModel) {
        return await commentsRepository.updateComment(id, body)
    }

    static async DeleteCommentById(id: string) {
        return await commentsRepository.deleteComment(id)
    }

}