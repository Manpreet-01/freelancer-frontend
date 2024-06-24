// @ts-nocheck
export function timeSince(dateString, units = 'auto') {
    const now = new Date();
    const seconds = Math.floor((now - new Date(dateString)) / 1000);
    const intervals = {
        'year': 31536000,
        'month': 2592000,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
    };

    // Handle "just now" for recent times
    if (seconds < 30) {
        return 'just now';
    }

    let count = 0;
    let key = units;

    // Determine the appropriate unit
    if (units === 'auto') {
        for (key in intervals) {
            if (Math.floor(seconds / intervals[key]) > 0) {
                count = Math.floor(seconds / intervals[key]);
                break;
            }
        }
    } else {
        if (units in intervals) {
            count = Math.floor(seconds / intervals[units]);
        } else {
            throw new Error('Invalid unit provided');
        }
    }

    let timeAgo = count + ' ' + key;

    // Handle pluralization
    if (count !== 1) {
        timeAgo += 's';
    }

    return timeAgo + ' ago';
}