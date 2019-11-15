let Config = {};

let MODE_PATTERN = {
    pro: 'http://122.51.193.191:8072',
    dev: 'http://localhost:8072'
};

if (location.hostname === 'songning123456.github.io') {
    Config.REQUEST_BASE_URL = MODE_PATTERN.pro;
} else if (location.hostname === 'localhost') {
    Config.REQUEST_BASE_URL = MODE_PATTERN.dev;
} else {
    Config.REQUEST_BASE_URL = MODE_PATTERN.pro;
}

Config.AJAX_TIMEOUT = 100000;

export default Config;
