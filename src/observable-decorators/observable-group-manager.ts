import { Subject } from "../../node_modules/rxjs";

/**
 * Manager for groped observables.
 */
export class ObservableGroupManager {

    protected static _instance: ObservableGroupManager;

    private _cancellationSubjectDictionary: { [name: string]: Subject<boolean> } = {};

    constructor() {

        if (ObservableGroupManager._instance) {
            throw new Error("Instantiation failed: " +
                "use Singleton.getInstance() instead of new.")
        }
        ObservableGroupManager._instance = this;
    }

    /**
     * Returns instanse of ObservableGroupManager.
     *
     * @static
     * @returns {ObservableGroupManager}
     * @memberof ObservableGroupManager
     */
    public static getInstance(): ObservableGroupManager {
        if (!ObservableGroupManager._instance) {
            ObservableGroupManager._instance = new ObservableGroupManager();
        }
        return ObservableGroupManager._instance;
    }

    /**
     *Cancel execution of named oservable group.
     *
     * @param {string} groupName Group name.
     * @memberof ObservableGroupManager
     */
    public CancelGroupExecution(groupName: string): void {
        let cancellationSubject = this._cancellationSubjectDictionary[groupName];
        if (cancellationSubject) {
            cancellationSubject.next(true);
        } else {
            throw new Error(`There is not regigister group with name: ${groupName}`);
        }
    }
}

export function GetOrAddCancellationSubject(groupName: string): Subject<boolean> {
    let manager = <any>ObservableGroupManager.getInstance();
    let cancellationSubject = manager._cancellationSubjectDictionary[groupName];
    if (!cancellationSubject) {
        cancellationSubject = new Subject<boolean>();
        manager._cancellationSubjectDictionary[groupName] = cancellationSubject;
    }
    return cancellationSubject;
}
