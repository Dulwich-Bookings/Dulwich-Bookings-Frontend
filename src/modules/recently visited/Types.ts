export interface RecentlyVisitedData {
  id: number;
  resourceId: number | null;
  tagId: number;
  subscriptionId: number | null;
}

export interface CreateRecentlyVisitedData {
  resourceId?: number | null;
  subscriptionId?: number | null;
}
