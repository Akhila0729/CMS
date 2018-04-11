
var map;
function initMap() {
  //console.log(logitude)
map = new google.maps.Map(document.getElementById('map'), {
center: { lat: -34.397, lng: 150.644 },
zoom: 8
});
}
//code to retrieve the child object from 
// function clickForObjectID()
// {
// $("#resulttable tr").click(function () {
//   var childObjectID_ToPost = $(this).children("td").html();
//   var data = {};
//   data.childObjectID = $(this).children("td").html().trim();
//   $.post('http://localhost:4002/welcome', data,
//       function (data, status) {
//           var parseData = $.parseJSON(data);
//           console.log('success' + parseData);
//       });
// });
// }


// function submit(){
//     debugger;
//     console.log("function is called");
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var data = []
//     data = {}
//     data.username = username;
//     data.password = password;
//     var root = "http://localhost:4001/login";
//     $.ajax({
//         url : root,
//         type : 'POST',
//         data : JSON.stringify(data),
//         contentType : 'application/json',
//         success : function(response){
//             console.log('submitted');
//         },
//         complete : function(response){
//             console.log('submitted-1');
//            reloadPage();
//         }
//     });
// }



// function form() {
//     var username = document.getElementById("#username");
//     var password = document.getElementById("#password");

//         $(document).ready(function () {
//         $('#memployboxes-1').change(function () {
//             $('#motherdiv').fadeIn();
//         });
//         $('#memployboxes-0').change(function () {
//             $('#motherdiv').fadeOut();
//         });
//         $('#femployboxes-1').change(function () {
//             $('#fatherdiv').fadeIn();
//         });
//         $('#femployboxes-0').change(function () {
//             $('#fatherdiv').fadeOut();
//         });

//     });
// };

// form();
// var optionvalue = document.getElementById("editphnnumber").value;
// console.log("the option value is "+optionvalue);