import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BreedImgReq, Breeds } from "../../../interfaces/breed";
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from "rxjs";
import { DEFAULT_QUANTITY } from "../../../services/breeds.service";

@Component({
  selector: 'app-breeds-search',
  templateUrl: './breeds-search.component.html',
  styleUrls: ['./breeds-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedsSearchComponent implements OnInit, OnDestroy {
  @Input() breedsList!: Breeds;
  @Output() valueChanged = new EventEmitter<BreedImgReq>();

  public breedsForm!: FormGroup;
  public selectBreed = new FormControl();

  private unsubscribe$ = new Subject();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.breedsForm = this.formBuilder.group({
      breed: [null],
      quantity: [DEFAULT_QUANTITY]
    });

    this.subscribeToForm();
  }

  private subscribeToForm(): void {
    this.breedsForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((formValues) => {
          return { breed: formValues.breed, quantity: formValues.quantity }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(val => {
        this.valueChanged.emit(val);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
