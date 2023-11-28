import { Album } from "./album";
import { Post } from "./post";
import { User } from "./user";

export class Notification {
    constructor(
        public id?:string,
        public hasSeen?:boolean,
        public notificationDate?:Date,
        public content?:string,
        //FKs
        public userId?:string,
        public user?:User,
        public postId?:string,
        public post?:Post,
        public albumId?:string,
        public album?:Album,
        public userFriendId?:string,
        public userRequest?:User,
    ){}
}
