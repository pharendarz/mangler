import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterListComponent } from './counters/counter-list/counter-list.component';
import { CounterComponent } from './counters/counter/counter.component';
import {CounterListService} from './counters/counter-list/counter-list.service';
import { RelapsesListComponent } from './relapses/relapses-list.component';
import {RelapsesListService} from './relapses/relapses-list.service';
import { CounterStartComponent } from './counters/counter-start/counter-start.component';
import { RelapseItemComponent } from './relapses/relapse-item/relapse-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterListComponent,
    CounterComponent,
    RelapsesListComponent,
    CounterStartComponent,
    RelapseItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [CounterListService, RelapsesListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
