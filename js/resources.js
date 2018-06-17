(function() {
    let resCache = {};
    let loading = [];
    let readyCallbacks = [];

    function load(url) {
        if(Array.isArray(url))
            url.forEach(item => _load(item));
        else
            _load(url);
    }

    function _load(url) {
        if(resCache[url])
            return resCache[url];
        else {
            let img = new Image();
            img.onload = () => {
                resCache[url] = img;

                if(isReady())
                    readyCallbacks.forEach((func) => func());
            };
            resCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resCache[url];
    }

    function isReady() {
        let ready = true;

        for(let key in resCache) {
            if(resCache.hasOwnProperty(key) && !resCache[key])
                ready = false;
        }

        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
