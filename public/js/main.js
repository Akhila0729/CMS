function submit(){
    debugger;
    console.log("function is called");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = []
    data = {}
    data.username = username;
    data.password = password;
    var root = "http://localhost:4001/login";
    $.ajax({
        url : root,
        type : 'POST',
        data : JSON.stringify(data),
        contentType : 'application/json',
        success : function(response){
            console.log('submitted');
        },
        complete : function(response){
            console.log('submitted-1');
           reloadPage();
        }
    });
}

function reloadPage() {
    window.location = '/user';
    // $('#getTime')[0].click();
}