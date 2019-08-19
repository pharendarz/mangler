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
import { RelapseInputComponent } from './relapses/relapse-input/relapse-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CounterListComponent,
    CounterComponent,
    RelapsesListComponent,
    CounterStartComponent,
    RelapseItemComponent,
    RelapseInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [CounterListService, RelapsesListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
