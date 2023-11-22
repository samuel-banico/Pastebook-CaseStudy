export class Post {
    constructor(
        //PK
        public id?: string,
        public content?: string,
        public isPublic?: boolean,
        public isEdited?: boolean,
        public createdOn?: Date,
        public likeCount?: number,
        public commentCount?: number,
        //FK
        public userId?: string,
        public friendId?: string,
    )
    {}
}
