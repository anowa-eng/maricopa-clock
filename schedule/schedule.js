const fs = require("fs");
const os = require("os");
const math = require("mathjs");

module.exports = function schedule() {
    const blockSchedule = fs.readFileSync(os.homedir() + "/.maricopa/config/schedule.csv").toString();
    /**
     * @type {[string, Date, Date, number][]}
     */
    let blocks = blockSchedule
        .trim()
        .split("\n")
        .slice(1)
        .map((b) => b.split(","))
        .map((b) => {
            let [_name, _start, _end, _beats] = b;
            const start = new Date();
            start.setHours(..._start.split(":"), 0, 0);
            const end = new Date();
            end.setHours(..._end.split(":"), 0, 0);
            const beats = parseInt(_beats);
            return [_name, start, end, beats];
        });

    const beatSchedule = [];
    for (const block of blocks) {
        const [name, blockStart, blockEnd, beats] = block;
        let start = blockStart.getTime();
        let end = blockEnd.getTime();
        let timeDelta = math.subtract(end, start),
            beatLength = math.divide(timeDelta, beats);

        let beatList = [];
        let secondToLastBeatEnd;
        for (let i = start, j = math.add(start, beatLength); j <= end; i = math.add(i, math.add(beatLength, 1)), j = math.add(j, math.add(beatLength, 1))) {
            beatList.push([i, j]);
            secondToLastBeatEnd = j;
        }
        beatList.push([secondToLastBeatEnd, end - 1]);
        beatList = beatList.map((b) =>
            b.map((time) => {
                let date = new Date();
                date.setTime(time);
                return date;
            }));
        beatSchedule[name] = {
            timeRange: [blockStart, blockEnd],
            beats: beatList
        };
    }

    return beatSchedule;
}