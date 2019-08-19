import {ActivatedRoute, Params, Router} from '@angular/router';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RelapseList} from './relapses-list.model';
import {RelapsesListService} from './relapses-list.service';
import {RelapseItem} from './relapse-item/relapse-item.model';
import {CounterModel} from '../../shared/counter.model';
import {Subscription} from 'rxjs';
import {CounterListService} from '../counters/counter-list/counter-list.service';


@Component({
  selector: 'app-relapses',
  templateUrl: './relapses-list.component.html',
  styleUrls: ['./relapses-list.component.css']
})
export class RelapsesListComponent implements OnInit, OnChanges {
  @Input() currentCounter: CounterModel;
  relapses: RelapseList[] = [];
  relapse: RelapseList;
  id: number;

  // privates
  private relapseListSubscription: Subscription;
  private relapseItemsSubscription: Subscription;
  private blockAddRelapse: boolean;
  private relapseReason: string;

  constructor(private relapsesService: RelapsesListService,
              private counterService: CounterListService,
              private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // relapse array subscription
    this.relapseListSubscription = this.relapsesService.relapsesArrayChanged
      .subscribe((relapses: RelapseList[]) => {
        // cases used: DeleteRelapse / next?
        console.log('event fired - on change RelapseList Array Delete', relapses);
        this.relapse = null;
        this.modifyCounter(true);
        this.relapsesService.blockAddRelapseButton(this.id);
        this.blockAddRelapse = this.relapsesService.blockAddRelapse;
    });
    // relapse items array subscription
    this.relapseItemsSubscription = this.relapsesService.relapseItemsArrayChanged
      .subscribe((relapseItems: RelapseItem[]) => {
        this.modifyCounter(false);
    });
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (this.relapses.length > 0) {
          this.relapse = this.relapsesService.getRelapse(this.id);
          this.blockAddRelapse = this.relapsesService.blockAddRelapse;
        }
      }, () => {
        console.log('ERROR cant find relapse index');
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('RELAPSE LIST CHANGES:::', changes);
  }

  onAddNewRelapse() {
    // create first items array for relapse
    // const relapseItemArray: RelapseItem[] = [new RelapseItem(this.id, new Date(), 'first entry')];
    const relapseItemArray: RelapseItem[] = [];
    // add new relapse
    this.relapses = this.relapsesService.addNewRelapse(
      new RelapseList(
      this.id,
        0, relapseItemArray
    ));
    this.relapse = this.relapsesService.getRelapse(this.id);
    // // modify counter
    this.modifyCounter(false);
    // change new Relapses button according to state
    this.relapsesService.blockAddRelapseButton(this.id);
    this.blockAddRelapse = this.relapsesService.blockAddRelapse;
  }
  private modifyCounter(caseDelete: boolean) {
    // get counter
    const counter = this.counterService.getCounterByIndex(this.id);
    // modify counter
    if (!caseDelete) {
      // case modify counter
      counter.relapseExist = true;
      counter.relapseCounter = this.relapse.items.length;
    } else {
      // case delete relapse - we shall also clean counter data
      counter.relapseExist = false;
      counter.relapseCounter = 0;
    }
    // this.blockAddRelapse = true;
    this.counterService.modifyCounter(counter, this.id);
  }
  onAddNewRelapseItem() {
    // add new relapse
    const inputData = {
      relapseReason: this.relapseReason
    }
    this.relapsesService.addNewRelapseItem(this.id, inputData);
    // get counter to modify relapse counter
    const counter = this.counterService.getCounterByIndex(this.id);
    // modify counter
    counter.relapseExist = true;
    counter.relapseCounter = this.relapse.items.length;
    this.counterService.modifyCounter(counter, this.id);
  }
  onRelapseReasonFilled(reasonData: {reason: string}) {
    this.relapseReason = reasonData.reason;
    console.log('input DATA:::', reasonData);
  }
  onDeleteElement() {
    this.relapsesService.deleteRelapse(this.id);
  }
}
