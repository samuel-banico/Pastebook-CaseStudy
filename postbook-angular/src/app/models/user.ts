export class User {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public birthday?: string,
        public gender?: number,
        public mobileNumber?: string,
        public userBio?: string,
        public profilePicture?: string,

        // Other Details
        public friendCount?: number
    ){}
}
