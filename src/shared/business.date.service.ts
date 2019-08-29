import {Injectable} from '@angular/core';

import {asyncMap} from '@dbg-riskit/angular-common';
import {Apollo} from 'apollo-angular';
import {ApolloQueryResult} from 'apollo-client';
import {Observable} from 'rxjs';
import {distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {BusinessDate, BusinessDateGQL, Date} from '../app/graphql.types';

@Injectable()
export class BusinessDateService {
    private readonly _businessDate: Observable<Date>;

    public constructor(private apollo: Apollo,
                       private businessDateQuery: BusinessDateGQL) {
        this._businessDate = this.apollo.watchQuery<BusinessDate.Query>({
            query       : this.businessDateQuery.document,
            pollInterval: 1000 * 60
        }).valueChanges.pipe(
            asyncMap((result: ApolloQueryResult<BusinessDate.Query>) => {
                    return result.data.currentBusinessDate;
                }
            ),
            distinctUntilChanged(),
            shareReplay(1)
        );
    }

    public get businessDate(): Observable<Date> {
        return this._businessDate;
    }
}
