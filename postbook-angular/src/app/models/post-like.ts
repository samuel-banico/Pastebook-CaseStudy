import { Post } from "./post";
import { User } from "./user";

export class PostLike {
    constructor(
        public id?:string,
        public createdOn?:Date,
        //FKs
        public postId?:string,
        public post?:Post,
        public userId?:string,
        public user?:User
    ){}
}
