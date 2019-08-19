import {RelapseList} from './relapses-list.model';
import {RelapseItem} from './relapse-item/relapse-item.model';
import {Subject} from 'rxjs';
import {CounterModel} from '../../shared/counter.model';
import {EventEmitter} from '@angular/core';


export class RelapsesListService {
  public relapsesArrayChanged = new Subject<RelapseList[]>();
  public relapseItemsArrayChanged = new Subject<RelapseItem[]>();
  public blockAddRelapse: boolean;

  private relapses: RelapseList[] = [];
  private addRelapseReason: string;
  constructor() { }

  /**
   *
   *
   * @function get single relapse list
   */
  blockAddRelapseButton(counterIndex: number) {
    const selectedRelapse = this.getRelapse(counterIndex);
    if (selectedRelapse !== null) {
      this.blockAddRelapse = true;
    } else {
      this.blockAddRelapse = false;
    }
  }
  getRelapse(counterIndex: number) {
    const relapseIndex = this.findRelapseIndex(counterIndex);
    if (relapseIndex > -1) {
      return this.relapses[relapseIndex];
    } else {
      return null;
    }
  }
  addNewRelapse(relapse: RelapseList) {
    // check if counterId already exists
    const relapseIndex = this.findRelapseIndex(relapse.counterId);
    if (relapseIndex < 0) {
      // if not add to current relapse list
      const newRelapses = [...this.relapses, relapse];
      this.relapses = newRelapses;

      return this.relapses;
    } else {
      console.log('got ya!');
      return this.relapses;
    }
  }
  private createTodayDate() {
    const todayDate = new Date();
    const dd = todayDate.getDate();
    const mm = todayDate.getMonth() + 1;
    const yyyy = todayDate.getFullYear();
    const today = `${dd}.${mm}.${yyyy}`;
    return today;
  }
  addNewRelapseItem(counterIndex: number, inputData: {relapseReason: string}) {
    const relapseIndex = this.findRelapseIndex(counterIndex);
    if (relapseIndex > -1) {
      this.relapses[relapseIndex].items = [
        ...this.relapses[relapseIndex].items, new RelapseItem(counterIndex, this.createTodayDate(), inputData.relapseReason)
      ];
      return this.relapses[relapseIndex].items;
    }
  }
  private findRelapseIndex(counterId: number): number {
    const findIndex = this.relapses.findIndex((relapseListElement) => {
      return counterId === relapseListElement.counterId;
    })
    return findIndex;
  }
  deleteRelapse(relapseIndex: number) {
    const relIndex = this.findRelapseIndex(relapseIndex);
    const filteredRelapses = this.relapses.filter(element => {
      return element !== this.relapses[relIndex];
    });
    this.relapses = filteredRelapses;
    this.relapsesArrayChanged.next(this.relapses);
  }
  deleteRelapseItem(relapseIndex: number, relapseItemIndex: number) {
    console.log(relapseIndex, relapseItemIndex, this.relapses);
    const relIndex = this.findRelapseIndex(relapseIndex);
    if (relIndex > -1) {
      // get relapse item
      const relapseItem = this.relapses[relIndex].items[relapseItemIndex];
      // filter found item
      const filteredRelapseItems = this.relapses[relIndex].items.filter(element => {
        return element !== relapseItem;
      });
      // add changes to relapses items
      this.relapses[relIndex].items = filteredRelapseItems;
      this.relapseItemsArrayChanged.next(this.relapses[relIndex].items);
    }
  }
}
