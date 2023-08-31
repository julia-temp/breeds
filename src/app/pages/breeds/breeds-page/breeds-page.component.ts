import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreedsService } from "../../../services/breeds.service";
import { Observable } from "rxjs";
import { BreedImages, BreedImgReq, Breeds } from "../../../interfaces/breed";

@Component({
  selector: 'app-breeds-page',
  templateUrl: './breeds-page.component.html',
  styleUrls: ['./breeds-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedsPageComponent {
  public breeds$: Observable<Breeds>;
  public breedsImages$: Observable<BreedImages>;

  constructor(private breedsService: BreedsService) {
    this.breeds$ = this.breedsService.getAllBreeds();
    this.breedsImages$ = this.breedsService.getImages();
  }

  public getBreedImages(req: BreedImgReq): void {
    this.breedsService.getByBreed(req);
  }

}
