export interface TagMapData {
  id: number;
  tagId: number;
  resourceId: number | null;
  subscriptionId: number | null;
}

export interface CreateTagMapData {
  tagId: number;
  resourceId?: number | null;
  subscriptionId?: number | null;
}
