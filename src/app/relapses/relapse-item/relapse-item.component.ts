import {Component, OnChanges, OnInit, SimpleChanges, Input} from '@angular/core';
import {RelapsesListService} from '../relapses-list.service';
import {RelapseItem} from './relapse-item.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-relapse-item',
  templateUrl: './relapse-item.component.html',
  styleUrls: ['./relapse-item.component.css']
})
export class RelapseItemComponent implements OnInit, OnChanges {
  @Input() relapseItems: RelapseItem[];
  constructor(private relapsesService: RelapsesListService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('RELAPSE ITEM CHANGES:::', changes);
  }
  onDeleteRelapseItem(relapseIndex: number, relapseItemIndex: number) {
    this.relapsesService.deleteRelapseItem(relapseIndex, relapseItemIndex);
  }
}
