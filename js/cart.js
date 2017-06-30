require.config({
    paths:{
        style:"style.min",
        jquery:"jquery-1.11.1",
        cookie:"jquery.cookie"
    }
});

require([ "jquery", "style" ], function($, style) {
    require([ "cookie" ], function() {
        $(function() {
            style.language();
            style.Login();
            style.randomImg();
            style.gotoTop();
            style.cart();
        });
    });
});