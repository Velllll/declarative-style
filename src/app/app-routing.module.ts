import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModelComponent } from './vm/view-model/view-model.component';

const routes: Routes = [
  {path: '', component: ViewModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
