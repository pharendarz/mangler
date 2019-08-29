import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {RelapsesListService} from '../../relapses/relapses-list.service';

@Component({
  selector: 'app-my-first-graph',
  templateUrl: './my-first-graph.component.html',
  styleUrls: ['./my-first-graph.component.css']
})
export class MyFirstGraphComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;
  constructor(private apollo: Apollo, private relapseService: RelapsesListService) { }
  profiles: any;
  products: any;

  ngOnInit() {
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //     {
    //       rates(currency: "USD") {
    //         currency
    //         rate
    //       }
    //     }
    //     `,
    //   })
    //   .valueChanges.subscribe(result => {
    //     this.rates = result.data && result.data.rates;
    //     this.loading = result.loading;
    //     this.error = result.errors;
    // });
    this.relapseService.letsGetSomeProfiles().subscribe(result => {
      console.log('RESULT FROM GRAPHQL --- PROFILES:::', result);
      this.loading = false;
      this.profiles = result;
    });
    this.relapseService.letsGetSomeProducts()
      .subscribe(result => {
      console.log('RESULT FROM GRAPHQL --- PRODUCTS:::', result);
      this.products = result;
    });
    // this.relapseService.letsGetSomeProducts()
    //   .subscribe(result => {
    //   console.log('RESULT FROM GRAPHQL --- PRODUCTS:::', result);
    // });
    this.relapseService.letsGetBusinessDate()
      .subscribe(result => {
        console.log(`BUSINESS DATE RESULT:::`, result);
      });
  }

}
