(function(global) {
    var initApplication = function() {
        var dpr, rem, scale;
        var docEl = document.documentElement;
        var fontEl = document.createElement('style');
        var metaEl = document.querySelector('meta[name="viewport"]');

        var head = docEl.querySelector("head") ? docEl.querySelector("head") : document.createElement("head").insertBefore(docEl, docEl.firstChild);
        var firstStyle = head.querySelector("style") ? head.querySelector("style") : head.lastChild;

        if (!metaEl) {
            metaEl = document.createElement("meta");
            metaEl.setAttribute("name", "viewport");
            head.insertBefore(metaEl, head.firstChild);
        }
        dpr = window.devicePixelRatio || 1;
        rem = docEl.clientWidth * dpr / 10;
        scale = 1 / dpr;


        // 设置viewport，进行缩放，达到高清效果
        metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

        // 设置data-dpr属性，留作的css hack之用
        docEl.setAttribute('data-dpr', dpr);

        // 动态写入样式
        head.insertBefore(fontEl, firstStyle);

        fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

        // 给js调用的，某一dpr下rem和px之间的转换函数
        global.rem2px = function(v) {
            v = parseFloat(v);
            return v * rem;
        };
        global.px2rem = function(v) {
            v = parseFloat(v);
            return v / rem;
        };

        global.dpr = dpr;
        global.rem = rem;
    };
    document.addEventListener("readystatechange", function() {
        if (document.readyState === "interactive") {
            initApplication();
        };

    });

})(window);