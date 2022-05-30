export interface TagData {
  id: number;
  name: string;
}

export interface CreateTagData {
  name: string;
}

export type TagPutData = Partial<TagData>;
