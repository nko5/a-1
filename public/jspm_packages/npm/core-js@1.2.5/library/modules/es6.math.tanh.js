/* */ 
var $def = require('./$.def'),
    expm1 = require('./$.math-expm1'),
    exp = Math.exp;
$def($def.S, 'Math', {tanh: function tanh(x) {
    var a = expm1(x = +x),
        b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }});
