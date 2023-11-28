import { User } from "./user"

export class Post {
    public id?: string;
    public content?: string;
    public isPublic?: boolean;
    public isEdited?: boolean;
    public createdOn?: Date;
    public likeCount?: number;
    public commentCount?: number;

    //FK
    public userId?: string;
    public user?: User;

    public friendId?: string;
}

export class PostLike {
    constructor(
        public id?: string,
        public createdOn?: Date,
        public postId?:string,
        public post?:Post,
        public userId?:string,
        public user?:string

    ) {}
}

export class PostComment {
    public id?: string;
    public comment?: string;
}
