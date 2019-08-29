import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showGenericLists = false;
  private showGraphQL = false;
  private showRxjs = true;
  title = 'mangler';

  public onClickShowGenericLists(event) {
    this.showGenericLists = event;
  }
  public onClickShowGraphQl(event) {
    this.showGraphQL = event;
  }
  public onClickShowRxjs(event) {
    this.showRxjs = event;
  }
}
