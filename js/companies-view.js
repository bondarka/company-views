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
                    var $link = $("<a>");
                    $link.text(list[i]['name']);
                    $link.attr('href', list[i]['partners']);
                    $link.appendTo($item);


                }
            });
    }

    function getNews() {
        $.getJSON('http://codeit.pro/frontTestTask/news/getList',
            function(resp) {
                console.log('resp', resp);
                var catalog = resp["list"];
                $(".carousel-indicators").empty();
                for (var i = 0; i < catalog.length; i++) {
                    var $indicator = $("<li>");
                    $indicator.attr('data-target', '#myCarousel');
                    $indicator.attr('data-slide-to', i);
                    if (i === 0) {
                        $indicator.addClass("active");
                    }
                    $indicator.appendTo(".carousel-indicators");
                };

                $(".carousel-inner").empty();
                for (var i = 0; i < catalog.length; i++) {
                    var $item = $("<div>");
                    $item.addClass("item");
                    if (i === 0) {
                        $item.addClass("active");
                    }
                    $item.appendTo(".carousel-inner");


                    var $content = $("<div>");
                    $content.addClass("form-content news");
                    $content.appendTo($item);

                    // add block short info
                    var $shortInfo = $("<div>");
                    $shortInfo.addClass("short-info");
                    $shortInfo.appendTo($content);

                    // add img
                    var $newsImage = $("<div>");
                    $newsImage.addClass("news-image");
                    $newsImage.appendTo($shortInfo);

                    var $image = $("<img>");
                    $image.attr("src", catalog[i]['img']);
                    $image.attr("alt", catalog[i]['author']);
                    $image.appendTo($newsImage);

                    // add author
                    var $author = $("<div>");
                    $author.addClass("author")
                    $author.appendTo($shortInfo);

                    var $bold = $("<b>");
                    $bold.text("Author : ");
                    $bold.appendTo($author)

                    var $authorName = $("<span>");
                    $authorName.text(catalog[i]['author']);
                    $authorName.appendTo($author);
                    // add date
                    var $public = $("<div>");
                    $public.addClass("public");
                    $public.appendTo($shortInfo);

                    var $boldDate = $("<b>");
                    $boldDate.text("Public : ");
                    $boldDate.appendTo($public);


                    var $publicDate = $("<span>");
                    $publicDate.text(catalog[i]['date']);
                    $publicDate.appendTo($public);

                    // add block short content

                    var $shortContent = $("<div>");
                    $shortContent.addClass("short-content");
                    $shortContent.appendTo($content);

                    // add title
                    var $title = $("<a>");
                    $title.addClass("link-title");
                    $title.text(catalog[i]['author']);
                    $title.attr('href', catalog[i]['link']);
                    $title.appendTo($shortContent);

                    // add description
                    var $description = $("<p>");
                    $description.text(catalog[i]['description']);
                    $description.appendTo($shortContent);

                }

            });

    }



    getNews();
    getList();
});
