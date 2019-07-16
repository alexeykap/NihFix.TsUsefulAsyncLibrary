import { takeUntil } from "../../node_modules/rxjs/operators";
import {GetOrAddCancellationSubject, ObservableGroupManager} from "./observable-group-manager"

/**
 * Allow to group observables for group cancellation
 * with [ObservableGroupManager method CancelGroupExecution]{@link ObservableGroupManager#CancelGroupExecution}
 * @see  ObservableGroupManager
 * @export
 * @param {string} groupName Group name.
 * @returns
 */
export function CancellableObservableGroup(groupName:string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let func = descriptor.value;
        let cancellationSubject = GetOrAddCancellationSubject(groupName);
        descriptor.value = function () {
            cancellationSubject.next(true);
            let originalResult = func.call(this, arguments);
            return originalResult.pipe(takeUntil(cancellationSubject));
        }
    }
}