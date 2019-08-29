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
import { MyFirstGraphComponent } from './my-graph/my-first-graph/my-first-graph.component';
// dbg
import {ErrorModule} from '@dbg-riskit/angular-error';
import {BusinessDateService} from '../shared/business.date.service';
import { HeaderComponent } from './header/header.component';
import { RxjsManglingComponent } from './rxjs-mangling/rxjs-mangling.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    GraphQLModule,
    HttpClientModule,
    ErrorModule
  ],
  declarations: [
    AppComponent,
    CounterListComponent,
    CounterComponent,
    RelapsesListComponent,
    CounterStartComponent,
    RelapseItemComponent,
    RelapseInputComponent,
    MyFirstGraphComponent,
    HeaderComponent,
    RxjsManglingComponent,
  ],
  providers: [CounterListService, RelapsesListService, BusinessDateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
