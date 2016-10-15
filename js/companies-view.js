var MAXDESCRIPTION = 100;

$(function() {

	/**
	* Show Number of companies in set
	* @param {array} data  - collection of companies
	* @return undefined
	*/
	function showTotal(data){
        $(".total-content").empty();
        var list = data["list"];
        var $item = $("<span>");
        var $totalCompany = list.length;
        $item.text($totalCompany);
        $item.appendTo(".total-content")	
	}

	/**
	* Show companies in the list
	* @param {array} data  - collection of companies
	* @return undefined
	*/
	function showCompanies(data){
        console.log('data', data);
        $(".companies-list").empty();
        var list = data["list"];
        for (var i = 0; i < list.length; i++) {
            var $item = $("<li>");
            $item.text(list[i]['name']);
            $item.appendTo(".companies-list");
        }
	}


	/**
	* Get companies set from the server
	* @return undefined
	*/
    function getList() {
        $.getJSON('http://codeit.pro/frontTestTask/company/getList',
            function(response) {
                showTotal(response);
                showCompanies(response);
            });
    }

	/**
	* Get news set from the server
	* @return undefined
	*/
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
                    $publicDate.text(formatDate(catalog[i]["date"]));
                    $publicDate.appendTo($public);

                    // add block short content

                    var $shortContent = $("<div>");
                    $shortContent.addClass("short-content");
                    $shortContent.appendTo($content);

                    // add title
                    var $title = $("<a>");
                    $title.addClass("link-title");
                    $title.text(catalog[i]['link']);
                    $title.attr('href', catalog[i]['link']);
                    $title.appendTo($shortContent);

                    // add description
                    var $description = $("<p>");
                    var text = catalog[i]['description'];
                    if (text.length > MAXDESCRIPTION) {
                        text = text.slice(0, MAXDESCRIPTION);
                        text += "...";
                    }
                    $description.text(text);
                    $description.appendTo($shortContent);

                }

            });

    }


    /**
    * Format date
    * @param {number} timestamp - timestamp in seconds
    * @return {string} - formatted date
    */
    function formatDate(timestamp) {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var result = "";
        if (day < 10) {
            result += "0";
        }
        result += day;
        result += ".";
        if (month < 10) {
            result += "0";
        }
        result += month;
        result += ".";
        result += year
        return result;

    }

    getList();
    getNews();
});
