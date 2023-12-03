import { User } from "./user";

export class Album {
    id?: string;
    albumName?: string;
    albumDescription?: string;
    isPublic?: boolean;
    isEdited?: boolean;
    createdOn?: string;
    coverAlbumImage?: string;
    userId?: string;

    imageCount?: number;
    imageList?: AlbumImage[];
}

export class AlbumImage {
    id?: string;
    image?: string;
    createdOn?: string;
    isEdited?: boolean;
    likeCount?: number;
    commentCount?: number;
    albumId?: number;
    hasLiked?: boolean;

    albumImageLikesList?: AlbumImageLike[];
    albumImageCommentsList?: AlbumImageComment[];
  }

  export class AlbumImageLike {
    id?: string;

    albumImageId?: string;
    userId?: string;
    user?: User;
  }

  export class AlbumImageComment {
    id?: string;
    comment?: string;
    createdOn?: string;

    albumImageId?: string;
    userId?: string;
    user?: User;
  }