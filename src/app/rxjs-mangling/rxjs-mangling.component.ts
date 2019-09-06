import { Component, OnInit } from '@angular/core';
import {asyncMap} from '@dbg-riskit/angular-common';
import {Observable, fromEvent, from, timer, interval, Subscriber, Subscription, of, zip, throwError} from 'rxjs';
import {
  debounceTime,
  filter,
  finalize,
  map,
  tap,
  throttleTime,
  scan,
  switchMap,
  takeUntil,
  takeWhile,
  catchError, mergeMap, retry, first, startWith, shareReplay
} from 'rxjs/operators';
import {RandomApisService} from '../random-apis.service';

@Component({
  selector: 'app-rxjs-mangling',
  templateUrl: './rxjs-mangling.component.html',
  styleUrls: ['./rxjs-mangling.component.css']
})

export class RxjsManglingComponent implements OnInit {
  private wipePrintout = true;
  public showComponents = true;
// ### DBG to cover RXJS - OPERATORS:
/* ========= DONE ==========
- takeUntil
- map
- tap
- switchMap
- first
- startWith
- mergeMap
*/

/* ========= UNDONE ==========
- shareReplay [when you master graphQL, take this one]


= forkJoin
- delay
- distinctUntilChanged
- shareReplay
- catchError
- defaultIfEmpty
 */
// ### DBG to cover PIPE - Scenarios + graphQl:
/*
========= UNDONE ==========
- multiple map in pipe
- merge map + multiple maps
- asyncMergeMap + multiple async Maps
 */
  constructor(private randomApiService: RandomApisService) { }

  ngOnInit() {
  }

  printRxJS(val) {
    const el = document.createElement('h5');
    el.innerText = val;
    // document.body.appendChild(el);
    document.getElementById('rxjs-logger').appendChild(el);
  }

  wipePrintoutExec() {
    const element = document.getElementsByTagName('h5')
    let index;

    for (index = element.length - 1; index >= 0; index--) {
      element[index].parentNode.removeChild(element[index]);
    }
  }
  createObservable() {
    // CREATE OBSERVABLE - use CREATE operator
    const observable = Observable.create(observer => {
      observer.next('hello');
      observer.next('1');
      observer.next('2');
    });
    return observable;
  }
  createObservableExec() {
    this.createObservable()
      .subscribe(val => this.printRxJS(val));
  }
  observableFromEventMouseClick() {
    const clicks = fromEvent(document, 'click');
    return clicks;
  }
  observableFromEventMouseClickExec() {
    // EVENTS - use fromEvent OPERATOR
    this.observableFromEventMouseClick()
      .subscribe(click => {
        console.log(click);
        // @ts-ignore
        this.printRxJS('CLICKED on ::: ' + click.pageX + '/' + click.pageY);
      });
  }
  observableFromEventMouseMoveThrottle() {
    const moved = fromEvent(document, 'mousemove')
      .pipe(
        throttleTime(1000)
      );
    return moved;
  }
  observableFromEventMouseMoveThrottleExec() {
    // MOVEMOUSE - used with THROTTLETIME 1000ms - mouse move is just delayed
    const fromMouseMoveThrottled = this.observableFromEventMouseMoveThrottle()
      .subscribe(moveMe => {
          console.log(moveMe);
          // @ts-ignore
          this.printRxJS('MOVED & Throttled::: ' + moveMe.pageX + '/' + moveMe.pageY);
        }
      );
    this.unsubscribeObseravable(fromMouseMoveThrottled, 5000, 'MOUSEMOVE - throttled');
  }
  observableFromEventMouseMoveDebounced() {
    const moved = fromEvent(document, 'mousemove')
      .pipe(
        debounceTime(1000)
      );
    return moved;
  }
  observableFromEventMouseMoveDebouncedExec() {
// MOVEMOUSE - used with DEBOUNCETIME 1000ms - mouse move is just delayed
    const fromMouseMoveDebounced = this.observableFromEventMouseMoveDebounced()
      .subscribe(moveMe => {
          console.log(moveMe);
          // @ts-ignore
          this.printRxJS('MOVED & Debounced::: ' + moveMe.pageX + '/' + moveMe.pageY);
        }
      );
    this.unsubscribeObseravable(fromMouseMoveDebounced, 5000, 'MOUSEMOVE - debounced');
  }
  observableFromPromise() {
    return from(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved - after 3 sec!');
      }, 3000);
    }));
  }
  observableFromPromiseExec() {
  // PROMISE - use FROM OPERATOR
    this.observableFromPromise().subscribe(resultPromise => this.printRxJS(resultPromise));
    // from(this.observableFromPromise()).subscribe(resultPromise => this.printRxJS(resultPromise)); // << second approach
  }
  observableFromTimer() {
    return timer(1000);
  }
  observableFromTimerExec() {
    // TIMER
    this.observableFromTimer().subscribe(done => this.printRxJS('timer executed after 1 sec'));
  }
  observableFromInterval() {
    return interval(4000).pipe(
      finalize(() => this.printRxJS('INTERVAL COMPLETED ON FINALIZE in PIPE'))
    );
  }
  observableFromIntervalExec() {
    // INTERVAL - using finalize to log when interval got unsubscribed
    const fromInterval = this.observableFromInterval()
      .subscribe(int => this.printRxJS('interval executed each 4 sec::: ' + new Date().getSeconds()));
    this.unsubscribeObseravable(fromInterval, 8001, 'INTERVAL');
  }
  unsubscribeObseravable(observer: Subscription, unsubscribeAfter, description: string) {
      setTimeout(() => {
        this.printRxJS('type: ' + description + ' - unsubscribed after (ms)::: ' + unsubscribeAfter);
        observer.unsubscribe();
      }, unsubscribeAfter);
  }
  observableFromAnything() {
    return of('anything', ['you', 'want'], 22, true, {can: 'be a STREAM'});
  }
  observableFromAnythingExec() {
    // OF - anything can be a stream
    this.observableFromAnything().subscribe(anything => this.printRxJS('anything can be a stream::: ' + anything));
  }
  mapObservable() {
    return of(2, 8, 25).pipe(
      tap(previousNum => this.printRxJS('before transform by MAP (tap operator) :::' + previousNum)),
      map(num => num * 5),
      tap(transformedNum => this.printRxJS('after transform by MAP (tap operator) :::' + transformedNum))
    );
  }
  mapObservableExec() {
// MAP + TAP
    this.mapObservable()
      .subscribe(transformedVal => this.printRxJS('transformed value from MAP (last step, after TAP operator) ::: ' + transformedVal));
  }
  filterObservable() {
    return of(-1, 2, 3, 5, -9, 0, 10, -22, -33, 45).pipe(
      filter(val => val > 0)
    );
  }
  filterObservableExec() {
    // FILTER
    this.filterObservable()
      .subscribe(filteredValues => this.printRxJS('FILTERED values from PIPE::: ' + filteredValues));

  }
  scanObservable() {
    // behaves just as reduce, takes 2 parameters SUM, ADDITION
    return fromEvent(document, 'click')
      .pipe(
        // tslint:disable-next-line:radix
        map(e => Math.random() * 10),
        tap(score => this.printRxJS('Generated score::: ' + score)),
        scan((totalScore, score) => totalScore + score)
      );
  }
  scanObservableExec() {
    // SCAN
    this.scanObservable().subscribe(totalScore => this.printRxJS('TOTAL score::: ' + totalScore));
  }
  switchMapObservable() {
    return fromEvent(document, 'click')
      .pipe(
        switchMap(click => {
          return interval(500);
        })
      );
  }
  switchMapObservableExec() {
    // SWITCHMAP - repeat process from the beginning in this case after click it will restart interval (which return n+1)
    this.printRxJS(`~~~~~~~~click somewhere to reset counter - it works for 15 sec until unsubscribe ~~~~~~~~~`)
    const switchMapInterval = this.switchMapObservable().subscribe(intrvl => this.printRxJS(intrvl));
    this.unsubscribeObseravable(switchMapInterval, 15000, 'SWITCH MAP INTERVAL');
  }
  takeUntilObservable() {
    return interval(500)
      .pipe(
        takeUntil(timer(2001)),
        finalize(() => this.printRxJS('~~~~takeUntil complete!~~~~~'))
      );
  }
  takeUntilObservableExec() {
    // TAKEUNTIL - a clever way to unsubscribe from observer for example, after something has been destroyed, finished, reaches some value
    this.takeUntilObservable().subscribe(intrvl => this.printRxJS(`TAKE UNTIL::: (based on interval 500ms) ::: ${intrvl}`));
  }
  takeWhileObservable() {
    return of(1, 2, 3, 4, 5, 6, 7, 8, 9).pipe(
      tap(num => this.printRxJS(`num from TAP in takeWhile::: ${num}`)),
      takeWhile(num => num !== 5),
      finalize(() => this.printRxJS('TAKE WHILE COMPLETED in FINALIZE'))
    );
  }
  takeWhileObservableExec() {
    // TAKEWHILE - it's like whileLoop, goes until condition is not meet
    this.takeWhileObservable().subscribe(some => this.printRxJS(`TAKEWHILE EXECUTED ${some}`));
  }
  zipObservable() {
    const yin = of('peanut butter', 'wine', 'rainbows');
    const yang = of('jelly', 'cheese', 'unicorns');
    return zip(yin, yang);
  }
  zipObservableExec() {
    this.printRxJS('CHECK CONSOLE LOG - arrays are merged by index.')
    this.zipObservable().subscribe(val => console.log(val));
  }
  catchObservable() {
    // works like errors in promises
    const obs = Observable.create(observer => {
      observer.next('thing 1/4');
      observer.next('thing 2/4');
      observer.next('thing 3/4');
      throw new Error('catch me!');
      observer.next('thing 4/4');
    });
    return obs.pipe(
      catchError((err) => of(this.printRxJS(`i've got you bitch::: ${err} - remember to return Observable in error f.e. of(string)`)))
    );
  }
  catchObservableExec() {
    this.catchObservable()
      // .catch(err => this.printRxJS(`error cought::: ${err}`))
      .subscribe(val => this.printRxJS(val));
  }
  retryObservable() {
    // const withError =
    return interval(200).pipe(
      mergeMap(val => {
        if (val > 4) {
          return throwError('Error from mergeMap --- after all retries! catchError has to be on end');
        }
        return of(val);
      }),
      retry(2),
      catchError((err) => of(this.printRxJS(err))),
    );
  }
  retryObservableExec() {
    this.retryObservable().subscribe(
      value => this.printRxJS(`retry value::: ${value}`)
    );
  }
  firstObservable() {
    return of(1, 2, 3, 4, 5, 6).pipe(
      first()
    );
  }
  firstObservableExec() {
    this.firstObservable().subscribe(val => this.printRxJS('value from FIRST operator:::' + val));
  }
  shareReplayObservable() {
    /*
     [todo] when master graphQl's
     mainly used for http request [https://www.youtube.com/watch?v=yrsUdi_Ino8]
     when http request is shared by f.e 3 API calls, and this call will be the same for each of them, shareReplay will only made one request
     */
  }
  shareReplayObservableExec() {
    // [todo] when master graphQl's
  }
  startWithObservableStrings() {
    return of('World', 'Goodbye', 'World!')
      .pipe(
        startWith('HELLO'),
        scan((accumulator, current) => {
          return `${accumulator} ${current}`;
        })
      );
  }
  startWithObservableStringsExec() {
    this.printRxJS(`basically it adds OBSERVABLE at the beginning of pipe stream with init value : 'HELLO'- SCAN operator works inside like reduce`);
    this.startWithObservableStrings().subscribe(value => this.printRxJS(`startWith add HELLO to accumulative SCAN string::: ${value}`));
  }
  startWithObservableNumbers() {
    return of(1, 2, 3)
      .pipe(
        startWith(9),
        scan((accumulator, current) => {
          return accumulator + current;
        })
      );
  }
  startWithObservableNumbersExec() {
    this.printRxJS(`basically it adds OBSERVABLE at the beginning of pipe stream with init value : 9 - SCAN operator works inside like reduce`);
    this.startWithObservableNumbers().subscribe(value =>
      this.printRxJS(`startWith add numbers [start from 9] to accumulative SCAN string::: ${value}`));
  }
  mergeMapObservable() {

  }
  mergeMapObservableExec() {

  }
  multipleMapObservable() {
    return of(2, 8, 25).pipe(
      tap(result => this.printRxJS(`before 1st map => ${result}`)),
      map(num => num * 5),
      tap(result => this.printRxJS(`before 2nd map => ${result}`)),
      map(num2 => num2 * 5)
    );
  }
  multipleMapObservableExec() {
    this.multipleMapObservable().subscribe(
      result => this.printRxJS(result)
    );
  }
  multipleMapObservablePlusHttpMergeMap() {
    return of(2, 8, 25).pipe(
      tap(result => this.printRxJS(`before 1st SYNC map => ${result}`)),
      map(num => num * 5),
      tap(result => this.printRxJS(`after 1st SYNC map => ${result}`)),
      mergeMap((data) => {
        this.printRxJS(`inside 2nd ASYNC => ${data} `);
        const currencyRate = this.randomApiService.getExchangeCurrencies('SDG', 'MYR').pipe(
          map(mapParameter => {
            this.printRxJS(`inside 2nd [map] ASYNC => data ::: ${data} mapParameter ::: ${mapParameter}`);
            return data * mapParameter;
          })
        );
        return currencyRate;
      }),
      tap(result => this.printRxJS(`after 2nd ASYNC map => ${result} `)),
      map((num2) => num2 * 5),
      tap(result => this.printRxJS(`after 3nd SYNC map => ${result}`)),
    );
  }
  multipleMapObservablePlusHttpMultipleMergeMap() {
    let counter = 0;
    return of(2).pipe(
      startWith(5),
      tap(result => {
        counter++;
        this.printRxJS(`[${counter}] before 1st SYNC map => ${result}`);
      }),
      map(num => num * 5),
      tap(result => this.printRxJS(`[${counter}] after 1st SYNC map => ${result}`)),
      mergeMap((data) => {
        this.printRxJS(`[${counter}] inside 2nd ASYNC => ${data} `);
        const currencyRate = this.randomApiService.getExchangeCurrencies('EUR', 'MYR').pipe(
          map(mapParameter => {
            this.printRxJS(`[${counter}] inside 2nd [map] ASYNC => data ::: ${data} mapParameter ::: ${mapParameter}`);
            return data * mapParameter;
          })
        );
        return currencyRate;
      }),
      tap(result => this.printRxJS(`[${counter}] after 2nd ASYNC map => ${result} `)),
      map((num2) => num2 * 5),
      tap(result => this.printRxJS(`[${counter}] after 3nd SYNC map => ${result}`)),
      mergeMap((data) => {
        this.printRxJS(`[${counter}] inside 4th ASYNC => ${data} `);
        const currencyRate = this.randomApiService.getExchangeCurrencies('EUR', 'MYR').pipe(
          map(mapParameter => {
            this.printRxJS(`[${counter}] inside 4th [map] ASYNC => data ::: ${data} mapParameter ::: ${mapParameter}`);
            return data * mapParameter;
          })
        );
        return currencyRate;
      }),
      // shareReplay(1)
    );
  }
  multipleMapObservablePlusHttpSwitchMap() {
    return of(2, 8, 25).pipe(
      tap(result => this.printRxJS(`before 1st SYNC map => ${result}`)),
      map(num => num * 5),
      tap(result => this.printRxJS(`after 1st SYNC map => ${result}`)),
      switchMap((data) => {
        this.printRxJS(`inside 2nd ASYNC => ${data} `);
        const currencyRate = this.randomApiService.getExchangeCurrencies('SDG', 'MYR').pipe(
          map(mapParameter => {
            this.printRxJS(`inside 2nd [map] ASYNC => data ::: ${data} mapParameter ::: ${mapParameter}`);
            return data * mapParameter;
          })
        );
        return currencyRate;
      }),
      tap(result => this.printRxJS(`after 2nd ASYNC map => ${result} `)),
      map((num2) => num2 * 5),
      tap(result => this.printRxJS(`after 3nd SYNC map => ${result}`)),
    );
  }
  multipleMapObservablePlusHttpMergeMapExec() {
    this.multipleMapObservablePlusHttpMergeMap().subscribe(
      result => this.printRxJS(result)
    );
  }
  multipleMapObservablePlusHttpSwitchMapExec() {
    this.multipleMapObservablePlusHttpSwitchMap().subscribe(
      result => this.printRxJS(result)
    );
  }
  multipleMapObservablePlusHttpMultipleMergeMapExec() {
    this.multipleMapObservablePlusHttpMultipleMergeMap().subscribe(
      result => this.printRxJS(result)
    );
  }
  // -------------------------------------------------------------------------------
  httpWithHeadersFromAPI() {
    this.randomApiService.getCurrencyList().subscribe(
      (response: any[]) => {
        response.forEach(item => {
          this.printRxJS(item);
        });
      }
    );
  }
  httpWithHeadersFromAPIWithParams() {
    this.randomApiService.getExchangeCurrencies('SDG', 'MYR').subscribe(
      (response: any) => {
        // response.forEach(item => {
          this.printRxJS(response);
        // });
      }
    );
  }
  //   const timestamps = this.businessDateService
  //     .getLiveSnapshots(this.selection.business_date)
  //     .pipe(
  //       tap(() => this.logger.info(
  //         `Timestamps for business date ${this.selection.business_date} collected.`),
  //         map((snapshots: Timestamps[]) =>
  //           snapshots.map((snap: Timestamps) => snap.live_timestamp))
  //       )
  //     );
  //
  //   this.timestampsSubscription = timestamps.subscribe(
  //     (data: TimestampsResponse) => {
  // }
  httpWithHeadersFromAPIExec() {
    this.httpWithHeadersFromAPI();
  }
  httpWithHeadersFromAPIWithParamsExec() {
    this.httpWithHeadersFromAPIWithParams();
  }
}
