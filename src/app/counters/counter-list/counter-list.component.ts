import { Component, OnInit } from '@angular/core';
import {CounterModel} from '../../../shared/counter.model';
import {CounterListService} from './counter-list.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.css']
})
export class CounterListComponent implements OnInit {
  counters: CounterModel[];
  id: any;
  private counterChangeSubscription: Subscription;

  constructor(private counterListService: CounterListService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.counters = this.counterListService.getCounterList();
    this.counterChangeSubscription = this.counterListService.countersChanged.subscribe((counters: CounterModel[]) => {
      this.counters = counters;
    })
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     console.log('init counterlist');
    //     this.id = params['id'];
    //     console.log(this.id, params);
    //   }
    // );
    console.log(this.counters);
  }
  onAddNewCounter() {
    console.log('working');
    this.counterListService.addToCounterList(new CounterModel('work', 1, 10));
  }
}
