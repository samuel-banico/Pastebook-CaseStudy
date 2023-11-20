export class Post {
    constructor(
        //PK
        public id?: number,
        public content?: string,
        public isPublic?: boolean,
        public isEdited?: boolean,
        public createdOn?: Date,
        public likeCount?: number,
        public commentCount?: number,
        //FK
        public userId?: number,
        public friendId?: number,
    )
    {}
}
