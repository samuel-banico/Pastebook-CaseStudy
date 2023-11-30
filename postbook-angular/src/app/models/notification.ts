import { Album } from "./album";
import { Post } from "./post";
import { User } from "./user";

export class Notification {
    constructor(
        public id?:string,
        public hasSeen?:boolean,
        public notificationDate?:string,
        public content?:string,
        //FKs
        public userId?:string,
        public user?:User,

        public postId?:string,
        public post?:Post,

        public albumId?:string,
        public album?:Album,

        public userRequestId?:string,
        public userRequest?:User,
    ){}
}
