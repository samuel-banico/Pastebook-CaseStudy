import { User } from "./user";

export class Friend {
    constructor(
        //PK
        public id?: string,
        public isBlocked?: boolean,

        //FK
        public userId?: string, 
        public user?: User
    ){}
}

export class FriendRequest{
    constructor(
        //PK
        public id?: string,
        public createdOn?: string,
        
        //FK
        public userId?: string,
        public user?: User,
        public user_FriendId?: string,
        public user_Friend?: User,
    ){}
}
