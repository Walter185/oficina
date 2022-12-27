import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardUserComponent } from './components/board-user/board-user.component';

const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', component: BoardUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
