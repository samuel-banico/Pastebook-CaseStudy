export class Notification {
    constructor(
        public id?:number,
        public hasSeen?:boolean,
        public notificationDate?:Date,
        public content?:string,
        //FKs
        public userId?:number,
        public postId?:number,
        public albumId?:number
    ){}
}
