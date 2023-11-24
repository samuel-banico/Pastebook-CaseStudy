export class Post {
    constructor(
        //PK
        public id?: string,
        public content?: string,
        public isPublic?: boolean,
        public isEdited?: boolean,
        public fullName?: string,
        public createdOn?: Date,
        public likeCount?: number,
        public commentCount?: number,
        //FK
        public userId?: string,
        public friendId?: string,
    )
    {}
}
