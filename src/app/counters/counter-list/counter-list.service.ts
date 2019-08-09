import {CounterModel} from '../../../shared/counter.model';
import {Subject} from 'rxjs';


export class CounterListService {
  countersChanged = new Subject<CounterModel[]>();
  private counters: CounterModel[] = [
    new CounterModel('first counter', 1, 0),
    new CounterModel('second counter', 2, 0),
    new CounterModel('third counter', 4, 0),
    new CounterModel('fourth counter', 10, 0),
  ];

  getCounterList() {
    return this.counters.slice();
  }
  addToCounterList(counter: CounterModel) {
    this.counters = [...this.counters, counter];
    this.countersChanged.next(this.counters);
    console.log(this.counters);
  }
}
