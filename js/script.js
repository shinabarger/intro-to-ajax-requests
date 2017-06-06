function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");


  //This takes whatever the user puts into the text input id street and assigns it to a
  //variable called StreetString, then just repeats the same thing again
  var streetString = $('#street').val();
  var cityString = $('#city').val();
  var address = streetString + ', ' + cityString;

  $greeting.text('So live there.');

  // load streetview
  var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

  $body.append('<img class="bmimg" src="' + streetViewUrl + '">');

  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityString + '&format=json&callback=wikiCallback';

  var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text("failed to get wiki resources");
  }, 8000);

  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(response) {
      var articleList = response[1];

      for(var i = 0; i < articleList.length; i++) {
        articleStr=articleList[i];
        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
        $wikiElem.append('<li><a href="' + url + '">' +
        articleStr + '</a></li>');
      };

      clearTimeout(wikiRequestTimeout);
    }
  })


  return false;
};

$('#form-container').submit(loadData);
