import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RelapsesListService} from '../relapses-list.service';
import {RelapseItem} from './relapse-item.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-relapse-item',
  templateUrl: './relapse-item.component.html',
  styleUrls: ['./relapse-item.component.css']
})
export class RelapseItemComponent implements OnInit, OnChanges {
  relapseItems: RelapseItem[];
  constructor(private relapsesService: RelapsesListService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('relapse item init');
    this.route.params.subscribe(
      (params: Params) => {
        console.log('params from item:::', params);
        this.relapseItems = this.relapsesService.getRelapseItemList();
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes:::', changes);
  }

}
