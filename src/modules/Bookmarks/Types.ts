export interface BookmarkData {
  id: number;
  resourceId: number | null;
  tagId: number;
  subscriptionId: number | null;
}

export interface CreateBookmarkData {
  resourceId?: number | null;
  subscriptionId?: number | null;
}
