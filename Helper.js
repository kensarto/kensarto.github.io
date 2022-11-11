function intToString(value, amount) {
    if (value >= 10000) {
        return nFormatter(value, 3);
    }
    if (value >= 1000) {
        let baseValue = 3;
        if (amount) {
            baseValue = amount;
        }
        const returnVal = parseFloat(value).toFixed(baseValue - 1);
        return `${returnVal[0]},${returnVal.substring(1)}`;
    }
    let baseValue = 3;
    if (amount) {
        baseValue = amount;
    }
    return parseFloat(value).toFixed(baseValue - 1);
}

function formatTime(seconds) {
    if (Number.isInteger(seconds)) {
        return (formatNumber(seconds) + _txt("time_controls>seconds")).replace(/\B(?=(\d{3})+(?!\d))/gu, ",");
    }
    if (seconds < 10) {
        return seconds.toFixed(2) + _txt("time_controls>seconds");
    }
    return (seconds.toFixed(1) + _txt("time_controls>seconds")).replace(/\B(?=(\d{3})+(?!\d))/gu, ",");
}
