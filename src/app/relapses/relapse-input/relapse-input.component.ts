import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RelapsesListService} from '../relapses-list.service';
import {CounterListService} from '../../counters/counter-list/counter-list.service';
import {RelapseList} from '../relapses-list.model';

@Component({
  selector: 'app-relapse-input',
  templateUrl: './relapse-input.component.html',
  styleUrls: ['./relapse-input.component.css']
})
export class RelapseInputComponent implements OnInit {
  @Output() relapseReasonFilled = new EventEmitter<{reason: string}>()

  relapseReason = '';

  constructor(private relapsesService: RelapsesListService,
              private counterService: CounterListService) { }

  ngOnInit() {

  }
  onUpdateReasonInput(event: Event) {
    this.relapseReason = (<HTMLInputElement>event.target).value;
    console.log('relapse reason from input:::', this.relapseReason);
    this.relapseReasonFilled.emit({reason: this.relapseReason});
  }
}
