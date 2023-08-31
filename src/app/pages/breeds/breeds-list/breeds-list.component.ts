import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BreedImages } from "../../../interfaces/breed";

@Component({
  selector: 'app-breeds-list',
  templateUrl: './breeds-list.component.html',
  styleUrls: ['./breeds-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedsListComponent {
  @Input() breedsImages!: BreedImages;

}
