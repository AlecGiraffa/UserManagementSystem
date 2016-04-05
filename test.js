
var c = function(a, b) {
    if (arguments.length > 1) {
        var result = 0;
        for (var i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    }
    else {
        return function(b) {
            return a + b;
        }
    }
}
console.log(c(1)(2));
