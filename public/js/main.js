$("#resulttable tr").click(function () {
  var childObjectID_ToPost = $(this).children("td").html();
  var data = {};
  data.childObjectID = $(this).children("td").html().trim();
  $.post('http://localhost:4004/welcome', data,
    function (data, status) {
      initMap(data)
    });
});

var map;
function initMap(val) {
  var locDet;
  if (val) {
    locDet = { lat: val.latitude, lng: val.longitude }
  } else {
    locDet = { lat: 21, lng: 23 }
  }

  map = new google.maps.Map(document.getElementById('map'), {

    center: locDet,
    zoom: 8
  });
}

$("#recordtable1 tr").click(function () {
  var childObjectID_ToPost = $(this).children("td").html();
  var data = {};
  data.childObjectID = $(this).children("td").html().trim();
  $.post('http://localhost:4004/record', data,
    function (data, status) {
      var tablearea = document.getElementById('latLongTable'),
        table = document.createElement('table');
      table.border = 1;

      for (var i = 0; i < data.locations.length; i++) {
        //alert(data.locations[0].Latitude);
        var tr = document.createElement('tr');

        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));

        tr.cells[0].appendChild(document.createTextNode('Latitude of the location ' + data.locations[i].Latitude));
        tr.cells[1].appendChild(document.createTextNode('Longitude of the location ' + data.locations[i].Longitude));
        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn";
        btn.setAttribute('value',"delete");
        tr.cells[2].appendChild(btn);
        table.appendChild(tr);
        btn.onclick = (function () { 
        alert("delted");
         tr.deleteCell(0);
         tr.deleteCell(1);
         tr.deleteCell(2);
      
        });
       

      }

      tablearea.appendChild(table);
      // if(table.contains(""));
    });
});