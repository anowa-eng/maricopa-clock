const stringify = require("json-stable-stringify"), fs = require("fs"), os = require("os"), path = require("path");
const schedule = require("./schedule");

let _schedule = schedule(true),
    contents = stringify(schedule());

fs.writeFileSync(path.join(os.homedir(), ".maricopa/_schedule/schedule.json"), contents);