import { LogDecorator } from "../../dist";
import { timer, Observable, Subject } from "../../node_modules/rxjs";
import { SelfCancellableObservable,TakeUntil } from "../../dist/observable-decorators"

    export function click() {
        let vvv = new myClass();
        vvv.longExecutionObservable2().subscribe(
            (x) => console.log(`result: ${x}`),
            (e) => console.warn(`error: e`),
            () => console.log("complete")
        );
    }
    export class myClass {
        @LogDecorator
        returnFive() {
            return 5;
        }

        static cancellable:Subject<boolean>=new Subject<boolean>();

        

        @SelfCancellableObservable()
        longExecutionObservable(): Observable<Number> {
            return timer(3000);
        }
    }

document.getElementById("testButton").onclick = (ev) => click();
