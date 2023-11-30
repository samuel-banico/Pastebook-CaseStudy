import { User } from "./user"

export class Post {
    public id?: string;
    public content?: string;
    public isPublic?: boolean;
    public isEdited?: boolean;
    public createdOn?: Date;

    public likeCount?: number;
    public commentCount?: number;
    public hasLiked?: boolean;

    //FK
    public userId?: string;
    public user?: User;

    public postLikeList: PostLike[] = [];
    public postCommentList: PostComment[] = [];

    public friendId?: string;
}

export class PostLike {
    public id?: string;
    public createdOn?: string;

    public postId?:string;
    public userId?:string;
    public user?: User;
}

export class PostComment {
    public id?: string;
    public comment?: string;
    public createdOn?: string;

    public postId?: string;

    public userId?: string;
    public user?: User;

}
