import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedsPageComponent } from './breeds-page/breeds-page.component';
import { RouterModule, Routes } from "@angular/router";
import { BreedsSearchComponent } from './breeds-search/breeds-search.component';
import { BreedsListComponent } from './breeds-list/breeds-list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { BreedsService } from "../../services/breeds.service";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BreedsPageComponent },
]

@NgModule({
  declarations: [
    BreedsPageComponent,
    BreedsSearchComponent,
    BreedsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(routes),
  ],
  providers: [ BreedsService ]
})
export class BreedsModule { }
