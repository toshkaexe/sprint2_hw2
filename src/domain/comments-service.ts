import {CommentDbModel, CommentOutputModel} from "../models/comments/comment-model";
import {commentsRepository} from "../repositories/comments-repository";
import {OutputPostModel} from "../models/posts/posts-models";
import {PostsQueryRepository} from "../repositories/posts-query-repository";

export const commentsService = {

    async createComment(userData: {userId: string, userLogin: string}, postId: string, content: string): Promise<CommentOutputModel | null> {

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
    },

    async updateComment(id: string, body: CommentDbModel) {
        return await commentsRepository.updateComment(id, body)
    },

    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    },

}