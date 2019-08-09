import {RelapseList} from './relapses-list.model';
import {RelapseItem} from './relapse-item/relapse-item.model';


export class RelapsesListService {
  public currentRelapseList: RelapseList;
  private relapses: RelapseList[] = [
   new RelapseList(0, this.createDummyList(1)),
   new RelapseList(1, this.createDummyList(3)),
   new RelapseList(2, this.createDummyList(5)),
   new RelapseList(3, this.createDummyList(7)),
  ];
  private relapseItems: RelapseItem[];
  getRelapsesList() {
    return this.relapses.slice();
    //  do with spread operator
  }
  getRelapseItemList() {
    return this.currentRelapseList.items;
  }
  setRelapseList(index: number) {
    this.currentRelapseList = this.relapses[index];
  }
  createDummyList(index: number) {
    return [1, 2, 3, 4, 5].map(item => {
      return new RelapseItem(new Date(), `random reason ${(item * index)}`);
    });
  }
}
