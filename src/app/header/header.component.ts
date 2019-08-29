import {Component, EventEmitter, OnInit, Output} from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showGenericListsEmitter = new EventEmitter<boolean>();
  @Output() showGraphQlEmitter = new EventEmitter<boolean>();
  @Output() showRxjsEmitter = new EventEmitter<boolean>();

  private showGenericLists = false;
  private showGraphQL = false;
  private showRxjs = false;
  constructor() { }

  ngOnInit() {
  }
  public onClickShowGenericLists() {
    this.showGenericLists = !this.showGenericLists;
    this.showGenericListsEmitter.emit(this.showGenericLists);
  }
  public onClickShowGraphQl() {
    this.showGraphQL = !this.showGraphQL;
    this.showGraphQlEmitter.emit(this.showGraphQL);
  }
  public onClickShowRxjs() {
    this.showRxjs = !this.showRxjs;
    this.showRxjsEmitter.emit(this.showRxjs);
  }
}
