var mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

function localDate(timestamp)
{
  var dt = new Date(timestamp);
  var mm = mmToMonth[dt.getMonth()];
  return dt.getDate() + "-" + mm + "-" + dt.getFullYear() + " " +
  dt.getHours() + ":" + dt.getMinutes();
}

function google_plus_feed() {
    var url = "https://www.googleapis.com/plus/v1/people/104831275312843762750/activities/public?alt=json&pp=1&key=AIzaSyAKK3jjSdCIe8BTEF5YYkkw_bqk_H9tF9g";
    $.ajax({
      url: url,
      data: {maxResults: 5},
      dataType: 'jsonp',
      success: function(data, textStats, jqXHR) {
          console.log('Data:', data);
          var gp = $("#google_plus");
          var ul = $('<ul>');
          for (i=0; i < 5; i++) {
              var item = data.items[i];
              var title = item["annotation"] || item["title"];
              var date = localDate(new Date(item["updated"]));
              var url = item["url"];

              ul.append('<li>' +
                        '"' + title + '"' +
                        '<a href="' + url + '"> ' + date + '</a>' +
                        '</li>');
          }
          gp.append(ul);
      }
    });
}