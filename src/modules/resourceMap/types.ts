export interface ResourceMapData {
  id: number;
  userId: number;
  resourceId: number | null;
  subscriptionId: number | null;
}

export interface CreateResourceMapData {
  userId: number;
  resourceId?: number | null;
  subscriptionId?: number | null;
}
