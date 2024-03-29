/**
 * Represents a post.
 */
export interface Post {
    postId: number;
    user: string;
    name: string;
    username: string;
    content: string;
    likes: number;
    dislikes: number;
    likedByUser: number;
    dislikedByUser: number;
}
