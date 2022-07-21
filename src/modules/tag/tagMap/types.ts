export interface TagMapData {
  id: number;
  resourceId: number | null;
  tagId: number;
  subscriptionId: number | null;
}

export interface CreateTagMapData {
  tagId: number;
  resourceId: number | null;
  subscriptionId: number | null;
}
