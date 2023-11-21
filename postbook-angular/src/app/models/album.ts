export class Album {
    id?: number;
    albumName?: string;
    albumDescription?: string;
    isPublic?: boolean;
    isEdited?: boolean;
    createdOn?: string;
    coverAlbumImage?: Uint8Array;
    userId?: number;
    ImageList?: File[];
}

export class AlbumImage {
    id?: number;
    image?: Uint8Array;
    createdOn?: string;
    isEdited?: boolean;
    likeCount?: number;
    commentCount?: number;
    albumId?: number;
    albumImageLikesList?: AlbumImageLike[];
    albumImageCommentsList?: AlbumImageComment[];
  }

  export class AlbumImageLike {
    id?: number;
    albumImageId?: number;
    userId?: number;
  }

  export class AlbumImageComment {
    id?: number;
    comment?: string;
    createdOn?: string;
    isEdited?: boolean;
    albumImageId?: number;
    userId?: number;
  }