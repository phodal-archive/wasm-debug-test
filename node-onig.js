const  {OnigScanner} = require('oniguruma');

let onigScanner = new OnigScanner(["\\G"]);
let result = onigScanner.findNextMatchSync("\t$(CC) -o $@ $^ $(CFLAGS)\n", 0);
console.log(result)

let onigScanner2 = new OnigScanner(["\G"]);
let result2 = onigScanner2.findNextMatchSync("\t$(CC) -o $@ $^ $(CFLAGS)\n", 0);
console.log(result2)
