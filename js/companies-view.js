$(function() {

    function getList() {
        $.getJSON('http://codeit.pro/frontTestTask/company/getList',
            function(response) {
                console.log('response', response);
                $(".companies-list").empty();
                var list = response["list"];
                for (var i = 0; i < list.length; i++) {
                    var $item = $("<li>");
                    $item.appendTo(".companies-list");
                    $item.text(list[i]['name']);
                }
            });
    }
    getList();
});
