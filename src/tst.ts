export function test() {
    alert("FUUUUUUUUUUUUUUUUUUUU");
}

export function LogDecorator(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    let logCount = 0;
    descriptor.value = function () {
        let result = method.apply(this, arguments)
        logCount++;
        console.log("fucking " + logCount + " times you got this result: " + result);
        return result;
    }
}