import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CounterListComponent} from './counters/counter-list/counter-list.component';
import {CounterStartComponent} from './counters/counter-start/counter-start.component';
import {CounterComponent} from './counters/counter/counter.component';
import {RelapsesListComponent} from './relapses/relapses-list.component';
import {RelapseItemComponent} from './relapses/relapse-item/relapse-item.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/counters', pathMatch: 'full'},
  { path: 'counters', component: CounterListComponent, children: [
      {path: '', component: CounterStartComponent},
      {path: ':id', component: RelapsesListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
