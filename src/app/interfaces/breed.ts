export interface BreedGeneralHttpResp<T> {
  message: T,
  status: string;
}

export interface BreedResp {
  [key: string]: Array<string>;
}

export interface BreedImgReq {
  breed: string;
  quantity: number;
}

export type BreedImages = Array<string>;

export type Breeds = Array<string>;

