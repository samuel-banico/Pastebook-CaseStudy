export class Friend {
    constructor(
        //PK
        public id?: string,
        public isBlocked?: boolean,

        //FK
        public userId?: string,
    ){}
}

export class FriendRequest{
    constructor(
        //PK
        public id?: string,
        
        //FK
        public userId?: string,
        public friendId?: string
    ){}
}
