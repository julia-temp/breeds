import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BreedGeneralHttpResp, BreedImages, BreedImgReq, BreedResp, Breeds } from "../interfaces/breed";
import { BehaviorSubject, map, Observable, take } from "rxjs";

export const DEFAULT_QUANTITY: number = 10;

const BREEDS_ALL_URL: string = 'https://dog.ceo/api/breeds/list/all';
const BREED_IMG_URL = (breed: string, quantity: number) => `https://dog.ceo/api/breed/${breed}/images/random/${quantity}`;

@Injectable({
  providedIn: 'any'
})
export class BreedsService {
  private images$ = new BehaviorSubject<BreedImages>([]);

  constructor(private http: HttpClient) { }

  public getImages(): Observable<BreedImages> {
    return this.images$.asObservable();
  }

  private setImages(images: BreedImages): void {
    return this.images$.next(images);
  }

  public getAllBreeds(): Observable<Breeds> {
    return this.http.get<BreedGeneralHttpResp<BreedResp>>(BREEDS_ALL_URL)
      .pipe(
        take(1),
        map(data => data.message),
        map(data => this.removeSubBreeds(data)),
      )
  }

  private removeSubBreeds(data: BreedResp): Breeds {
    return Object.entries(data).filter(([key, value]) => !value.length).flat(2);
  }

  public getByBreed(req: BreedImgReq): void {
    const { breed, quantity } = req;
    this.http.get<BreedGeneralHttpResp<BreedImages>>(BREED_IMG_URL(breed, quantity))
      .pipe(
        take(1),
        map(data => data.message),
      ).subscribe(data => this.setImages(data))
  }

}
