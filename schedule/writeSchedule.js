const stringify = require("json-stable-stringify");
const schedule = require("./schedule");
let _schedule = schedule(true);

process.stdout.write(stringify(_schedule));