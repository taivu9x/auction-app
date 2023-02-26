export enum TypeEnum {
  PUBLIC = "public",
  DRAFT = "draft",
}

export enum TypeFilter {
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export type Item = {
  id: number;
  name: string;
  duration: number;
  currentPrice: number;
  type: TypeEnum;
};
