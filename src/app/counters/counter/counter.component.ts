import {ActivatedRoute, Params} from '@angular/router';
import {Component, Input, NgModule, OnInit} from '@angular/core';
import {CounterModel} from '../../../shared/counter.model';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent implements OnInit {
  id: any;
  counter: CounterModel;
  @Input() index: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     console.log('init relapse');
    //     this.id = params['id'];
    //     console.log(this.id, params);
    //   }
    // );
  }

}
