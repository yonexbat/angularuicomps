import { ReplaySubject, of, interval } from 'rxjs';
import { switchMap, mergeMap, map, delay } from 'rxjs/operators';
import { async } from '@angular/core/testing';

describe('RxJsExperiments', () => {


    it('async', async(async () => {
        const letters = of('a', 'b', 'c', 'd').pipe(delay(100));
        const letter2 = of(1, 2, 3, 4).pipe(delay(500));
        const result = letters.pipe(
            switchMap(x => letter2.pipe(map(i => x + i))),
        );
        result.subscribe(x => console.log(x));

        await doWaitForTest();
    }));

});

function doWaitForTest(): Promise<any> {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            console.log('timeout');
            resolve();
        }, 3000);
    });
    return promise;
}
