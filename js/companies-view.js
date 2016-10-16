var MAXDESCRIPTION = 100;

$(function() {



    var sortKey = 'name';
    var sortReverse = false;
    var currentPartners = [];

    /**
     * Show Number of companies in set
     * @param {array} data  - collection of companies
     * @return undefined
     */
    function showTotal(list) {
        $(".total-content").empty();
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
    function showCompanies(list) {
        console.log('list', list);
        $(".companies-list").empty();
        for (var i = 0; i < list.length; i++) {
            var $item = $("<li>");
            $item.text(list[i]['name']);
            $item.data('id', i);
            $item.click(function() {
                var $partners = $('.partners');
                $partners.show();
                var index = $(this).data("id");
                showPartners(list[index]['partners']);
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            })
            $item.appendTo(".companies-list");
        }
    }


    /**
     * Get companies set from the server
     * @return undefined
     */
    function getList() {
        var $loader = $('.companies-box .loader');
        $loader.show();
        $.getJSON('http://codeit.pro/frontTestTask/company/getList',
            function(response) {
                $loader.hide();
                showTotal(response['list']);
                showCompanies(response['list']);
                calcCompanies(response['list']);
            });
    }

    function sortPartners(list) {
        list.sort(function(x, y) {
            if (x[sortKey] > y[sortKey]) {
                return sortReverse ? -1 : 1;
            } else if (x[sortKey] < y[sortKey]) {
                return sortReverse ? 1 : -1;
            } else {
                return 0;
            }
        })
        return list;
    }


    function showSort() {
        $(".sort").empty();
        var $sortBold = $("<b>");
        $sortBold.text("Sort by : ");
        $sortBold.appendTo(".sort");

        var $sortName = $("<span>");
        $sortName.text("Name");
        if (sortKey === 'name') {
            $sortName.addClass("active");
        }
        $sortName.click(function() {
            if (sortKey === 'name') {
                sortReverse = !sortReverse;
            } else {
                sortReverse = false;
            }
            sortKey = 'name';
            showSort();
            showPartners(currentPartners);
        })
        $sortName.appendTo(".sort");

        var $icon = $("<i>");
        if (sortKey === 'name' && sortReverse) {
            $icon.addClass("fa fa-sort-amount-desc");
        } else {
            $icon.addClass("fa fa-sort-amount-asc");
        }
        $icon.appendTo($sortName);

        var $sortPercentage = $("<span>");
        $sortPercentage.text("Percentage");
        if (sortKey === 'value') {
            $sortPercentage.addClass("active");
        }
        $sortPercentage.click(function() {
            if (sortKey === 'value') {
                sortReverse = !sortReverse;
            } else {
                sortReverse = false;
            }
            sortKey = 'value';
            showSort();
            showPartners(currentPartners);
        })
        $sortPercentage.appendTo(".sort");

        var $icon2 = $("<i>");
        if (sortKey === 'value' && sortReverse) {
            $icon2.addClass("fa fa-sort-amount-desc");
        } else {
            $icon2.addClass("fa fa-sort-amount-asc");
        }
        $icon2.appendTo($sortPercentage);

    }


    function showPartners(values) {
        values = sortPartners(values);
        currentPartners = values;
        $(".company-partners").empty();
        for (var i = 0; i < values.length; i++) {
            var $partner = $("<div>");
            $partner.addClass("partner");
            $partner.appendTo(".company-partners");

            var $shares = $("<div>");
            $shares.addClass("shares");
            $shares.text(values[i]['value'] + "%");
            $shares.appendTo($partner);

            var $border = $("<div>");
            $border.addClass("border");
            $border.appendTo($partner);

            var $companyName = $("<div>");
            $companyName.addClass("company-name");
            var $box = $("<span>");
            $box.text(values[i]['name']);
            $box.appendTo($companyName);
            $companyName.appendTo($partner);
        }
    }







    /**
     * Get news set from the server
     * @return undefined
     */
    function getNews() {
        $.getJSON('http://codeit.pro/frontTestTask/news/getList',
            function(resp) {
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




    function buildChart(dataPoints) {
        var chart = new CanvasJS.Chart("chartContainer", {
            data: [{
                indexLabelFontSize: 20,
                indexLabelFontFamily: "Monospace",
                indexLabelFontColor: "darkgrey",
                indexLabelLineColor: "darkgrey",
                indexLabelPlacement: "outside",
                type: "pie",
                click: function(e) {
                    console.log(e['dataPoint']);
                    $("#chartContainer").hide();
                    $(".companies-location").show();
                    var $back = $("<i>");
                    $back.addClass("fa fa-arrow-left");
                    $back.click(function() {
                        $(".companies-location").hide();
                        $back.hide();
                        $("#chartContainer").show();
                    })
                    $back.appendTo(".back");
                    showLocation(e['dataPoint']['item']);
                },
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }


    function showLocation(list) {
        console.log('list', list);
        $(".companies-location").empty();
        for (var i = 0; i < list.length; i++) {
            var $items = $("<li>");
            $items.text(list[i]['name']);
            $items.addClass("local-company")
            $items.appendTo(".companies-location");
        }
    }

    function calcCompanies(list) {

        var result = {};

        for (var i = 0; i < list.length; i++) {
            var code = list[i]['location']['code'];
            if (!result[code]) {
                result[code] = [];
            }
            result[code].push(list[i]);
        }
        console.log(result);

        var chartData = [];
        for (var code in result) {
            chartData.push({ item: result[code], indexLabel: code, y: result[code].length })
        }
        console.log('chartData', chartData);

        buildChart(chartData);
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

    showSort()
    getList();
    getNews();
});
