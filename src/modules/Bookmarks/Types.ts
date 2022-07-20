export interface BookmarkData {
  id: number;
  resourceId: number | null;
  userId: number;
  subscriptionId: number | null;
}

export interface CreateBookmarkData {
  resourceId?: number | null;
  subscriptionId?: number | null;
}
