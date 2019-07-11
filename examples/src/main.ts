import { LogDecorator } from "../../dist";
import { timer, Observable } from "../../node_modules/rxjs";
import { SelfCancellableObservable } from "../../dist/observable-decorators"
namespace xxx {
    export function click() {
        let vvv = new myClass();
        vvv.longExecutionObservable().subscribe(
            (x) => console.log(`result: ${x}`),
            (e)=>console.warn(`error: e`),
            ()=>console.log("complete")
        );
    }
    export class myClass {
        @LogDecorator
        returnFive() {
            return 5;
        }
        @SelfCancellableObservable()
        longExecutionObservable(): Observable<Number> {
            return timer(3000);
        }
    }
}
document.getElementById("testButton").onclick = (ev) => xxx.click();
