import {RelapseItem} from './relapse-item/relapse-item.model';

export class RelapseList {
  constructor(public relapseId: number, public items: RelapseItem[]) {  }
}
