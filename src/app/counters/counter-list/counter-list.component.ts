import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CounterModel} from '../../../shared/counter.model';
import {CounterListService} from './counter-list.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {RelapsesListService} from '../../relapses/relapses-list.service';
import {RelapseList} from '../../relapses/relapses-list.model';
import {RelapseItem} from '../../relapses/relapse-item/relapse-item.model';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.css']
})
export class CounterListComponent implements OnInit, OnChanges {
  counters: CounterModel[];
  relapses: RelapseList[];
  id: any;
  private counterChangeSubscription: Subscription;

  constructor(private counterListService: CounterListService,
              private relapsesListService: RelapsesListService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.counters = this.counterListService.getCounterList();
    // onChange CounterModel
    this.counterChangeSubscription = this.counterListService.countersChanged.subscribe((counters: CounterModel[]) => {
      this.counters = counters;
      console.log('COUNTER ADDED/CHANGED', this.counters);
    });
    // console.log(this.counters);
  }

  onAddNewCounter() {
    // console.log('working');
    this.counterListService.addToCounterList(new CounterModel('work', 1, 10, false, 0));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('COUNTER LIST CHANGED', changes);
  }
}
