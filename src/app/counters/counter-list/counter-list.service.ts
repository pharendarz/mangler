import {CounterModel} from '../../../shared/counter.model';
import {Subject} from 'rxjs';
import {count} from 'rxjs/operators';


export class CounterListService {
  countersChanged = new Subject<CounterModel[]>();
  currentCounter: CounterModel;
  private counters: CounterModel[] = [
    new CounterModel('asd', 1, 0, false, 0),
    new CounterModel('xcv', 2, 0, false, 0),
    new CounterModel('qwe', 4, 0, false, 0),
    new CounterModel('ert', 10, 0, false, 0),
  ];
  refreshCounter() {
    this.countersChanged.next([...this.counters]);
  }
  modifyCounter(counter: CounterModel, index: number) {
    // this.counters = [this.counters, counter];
    this.counters[index] = counter;
    this.countersChanged.next(this.counters);
    console.log('[modifyCounter] MODIFIED COUNTERS:::', this.counters);
  }
  getCounterByIndex(index: number): CounterModel {
    return this.counters[index];
  }
  getCounterList() {
    return [...this.counters];
  }
  addToCounterList(counter: CounterModel) {
    this.counters = [...this.counters, counter];
    this.countersChanged.next(this.counters);
    console.log(this.counters);
  }

  // private addToRelapseIndex/
}
