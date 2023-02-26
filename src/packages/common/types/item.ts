export enum TypeEnum {
  PUBLIC = "public",
  DRAFT = "draft",
}

export type Item = {
  id: number;
  name: string;
  duration: number;
  currentPrice: number;
  type: TypeEnum;
};
