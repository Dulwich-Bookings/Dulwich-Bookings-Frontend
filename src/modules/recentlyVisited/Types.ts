export interface RecentlyVisitedData {
  id: number;
  resourceId: number | null;
  userId: number;
  subscriptionId: number | null;
}

export interface CreateRecentlyVisitedData {
  resourceId?: number | null;
  subscriptionId?: number | null;
}
