export interface TagData {
  id: number;
  name: string;
  colour: string;
}

export interface CreateTagData {
  name: string;
  colour: string;
}

export type TagPutData = Partial<TagData>;
