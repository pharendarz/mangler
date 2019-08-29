import {RelapseList} from './relapses-list.model';
import {RelapseItem} from './relapse-item/relapse-item.model';
import {Subject, Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';
import {catchError, defaultIfEmpty, map, shareReplay, tap} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
// dbg
import {asyncMap, asyncMergeMap} from '@dbg-riskit/angular-common';
import {ErrorCollectorService} from '@dbg-riskit/angular-error';
import {
  AllProfilesQuery,
  AllProductsQuery,
  AllProfilesQueryGQL,
  AllProductsQueryGQL,
  ProductsQueryGQL,
  BusinessDateGQL, BusinessDate,
} from '../graphql.types';

import {BusinessDateService} from '../../shared/business.date.service';

interface Product {
  product_line: ProductLine;
  id: string;
}

type ProductLine = 'OPTION' | 'FUTURES';

export class RelapsesListService {
  public relapsesArrayChanged = new Subject<RelapseList[]>();
  public relapseItemsArrayChanged = new Subject<RelapseItem[]>();
  public blockAddRelapse: boolean;

  private relapses: RelapseList[] = [];
  private addRelapseReason: string;
  public constructor(private apollo: Apollo,
                     private allProfilesQueryGQL: AllProfilesQueryGQL,
                     private errorCollector: ErrorCollectorService,
                     private businessDateService: BusinessDateService,
                     private productsQuery: ProductsQueryGQL,
                     private allProductsQuery: AllProductsQueryGQL,
                     private businessDateQuery: BusinessDateGQL) { }

  /**
   *
   *
   * @ get single relapse list
   */
  blockAddRelapseButton(counterIndex: number) {
    const selectedRelapse = this.getRelapse(counterIndex);
    if (selectedRelapse !== null) {
      this.blockAddRelapse = true;
    } else {
      this.blockAddRelapse = false;
    }
  }

  getRelapse(counterIndex: number) {
    const relapseIndex = this.findRelapseIndex(counterIndex);
    if (relapseIndex > -1) {
      return this.relapses[relapseIndex];
    } else {
      return null;
    }
  }

  addNewRelapse(relapse: RelapseList) {
    // check if counterId already exists
    const relapseIndex = this.findRelapseIndex(relapse.counterId);
    if (relapseIndex < 0) {
      // if not add to current relapse list
      const newRelapses = [...this.relapses, relapse];
      this.relapses = newRelapses;

      return this.relapses;
    } else {
      console.log('got ya!');
      return this.relapses;
    }
  }

  private createTodayDate() {
    const todayDate = new Date();
    const dd = todayDate.getDate();
    const mm = todayDate.getMonth() + 1;
    const yyyy = todayDate.getFullYear();
    const today = `${dd}.${mm}.${yyyy}`;
    return today;
  }

  addNewRelapseItem(counterIndex: number, inputData: {relapseReason: string}) {
    const relapseIndex = this.findRelapseIndex(counterIndex);
    if (relapseIndex > -1) {
      this.relapses[relapseIndex].items = [
        ...this.relapses[relapseIndex].items, new RelapseItem(counterIndex, this.createTodayDate(), inputData.relapseReason)
      ];
      return this.relapses[relapseIndex].items;
    }
  }
  private findRelapseIndex(counterId: number): number {
    const findIndex = this.relapses.findIndex((relapseListElement) => {
      return counterId === relapseListElement.counterId;
    })
    return findIndex;
  }

  deleteRelapse(relapseIndex: number) {
    const relIndex = this.findRelapseIndex(relapseIndex);
    const filteredRelapses = this.relapses.filter(element => {
      return element !== this.relapses[relIndex];
    });
    this.relapses = filteredRelapses;
    this.relapsesArrayChanged.next(this.relapses);
  }

  deleteRelapseItem(relapseIndex: number, relapseItemIndex: number) {
    console.log(relapseIndex, relapseItemIndex, this.relapses);
    const relIndex = this.findRelapseIndex(relapseIndex);
    if (relIndex > -1) {
      // get relapse item
      const relapseItem = this.relapses[relIndex].items[relapseItemIndex];
      // filter found item
      const filteredRelapseItems = this.relapses[relIndex].items.filter(element => {
        return element !== relapseItem;
      });
      // add changes to relapses items
      this.relapses[relIndex].items = filteredRelapseItems;
      this.relapseItemsArrayChanged.next(this.relapses[relIndex].items);
    }
  }

  public letsGetSomeProfiles() {
    console.log('some profiles...');
    return this.apollo.watchQuery<AllProfilesQuery.Query>({
      query: this.allProfilesQueryGQL.document
    }).valueChanges
      .pipe(
        // tap(() => console.log('PIPING IN!')),
        shareReplay(1),
        asyncMap((result: ApolloQueryResult<AllProfilesQuery.Query>) => {
          console.log('PIPING IN!');
          return result.data && result.data.profiles || [];
        }),
        // Catch errors
        catchError((err) => this.errorCollector.handleStreamError(err)),
        defaultIfEmpty([])
      );
  }
  public letsGetBusinessDate() {
    return this.apollo.watchQuery<BusinessDate.Query>({
      query: this.businessDateQuery.document
    }).valueChanges
      .pipe(
        tap(() => console.log('PIPING IN BUSINESS DATE!')),
        // map(asd => )
      );
  }
  public letsGetSomeProducts(): Observable<Product[]> {
    return this.businessDateService.businessDate.pipe(
      asyncMergeMap((businessDate) =>
        this.apollo.watchQuery<AllProductsQuery.Query>({
          query    : this.allProductsQuery.document,
          variables: {
            date: businessDate
          }
        }).valueChanges
      ),
      shareReplay(1),
      asyncMap((result: ApolloQueryResult<AllProductsQuery.Query>) =>
        result.data && result.data.productTypes || []),
      asyncMap((productTypes: AllProductsQuery.ProductTypes[]) =>
        productTypes.map((productType: AllProductsQuery.ProductTypes) =>
          productType.products.edges
            .map((product: AllProductsQuery.Edges): Product => ({
              id          : product.node.productId,
              product_line: productType.line
            }))
        ).reduce(
          (res, e) => res.concat(e), []
        ).sort(((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        }))
      )
    );
  }
}
