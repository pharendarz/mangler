import {ActivatedRoute, Params, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {RelapseList} from './relapses-list.model';
import {RelapsesListService} from './relapses-list.service';
import {RelapseItem} from './relapse-item/relapse-item.model';

@Component({
  selector: 'app-relapses',
  templateUrl: './relapses-list.component.html',
  styleUrls: ['./relapses-list.component.css']
})
export class RelapsesListComponent implements OnInit {
  relapses: RelapseList[];
  relapse: RelapseList;
  id: number;

  constructor(private relapsesService: RelapsesListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.relapses = this.relapsesService.getRelapsesList();
    this.route.params.subscribe(
      (params: Params) => {
        // console.log('init relapse PARAMS: ', params);
        this.id = +params['id'];
        // console.log(this.id, params, this.relapses);
        this.relapse = this.relapses[this.id];
        this.relapsesService.setRelapseList(this.id);
        console.log('relapse:::', this.relapse);
      }
    );
  }

}
