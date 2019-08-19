import {ActivatedRoute, Params} from '@angular/router';
import {Component, DoCheck, Input, NgModule, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CounterModel} from '../../../shared/counter.model';
import {RelapsesListService} from '../../relapses/relapses-list.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent implements OnInit, OnChanges, DoCheck {
  @Input() counter: CounterModel;
  @Input() counterIndex: number;
  // icons
  faCheckSquare = faCheckSquare;

  constructor(private relapsesListServices: RelapsesListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('COUNTER CHANGED', changes, 'index:::', this.counterIndex);
  }
  ngDoCheck(): void {
    console.log('hey man');
  }

  onClickCounterItem() {
    this.relapsesListServices.blockAddRelapseButton(this.counterIndex);
  }
}
