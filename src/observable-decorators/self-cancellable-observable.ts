import {Subject, Observable} from "../../node_modules/rxjs"
import {pipe} from "../../node_modules/rxjs"
import {takeUntil} from "../../node_modules/rxjs/operators"


/**
 * Method decorator which cancel
 * previous subscribtion.
 * (Wrap method with takeUntil pipe).
 * @export
 * @returns
 */
export function SelfCancellableObservable(){
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let func=descriptor.value;
        let cancellationSubject=new Subject<boolean>();
        descriptor.value=function(){
            cancellationSubject.next(true);
            let originalResult=func.call(this,arguments);
            return originalResult.pipe(takeUntil(cancellationSubject));             
        }
    }
}