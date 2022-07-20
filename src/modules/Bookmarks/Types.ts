export interface BookmarkData {
  id: number;
  resourceId: number | null;
  tagId: number;
  subscriptionId: number | null;
}

export interface CreateBookmarkData {
  tagId: number;
  resourceId: number | null;
  subscriptionId: number | null;
}

export type BookmarkPutData = Partial<BookmarkData>;
