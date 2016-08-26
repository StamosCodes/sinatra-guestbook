// Window load get json, if empty toggle no registrants div
$(function() {
$.ajax({
  type: "GET",
  url: "/",
  datatype: "json",
  //data : $("#form").serialize(),
  success: function(){
    // Reset input fields & declare ul variable for sorting
    document.getElementById("form").reset();
    var registrantData = $('#sortable');
    // Start script to grab json
    $.getJSON('/', function (data) {
      console.log(data);

      var guests = data.guests.map(function (guest) {
        return guest.name + '<span class="closestemail">' + ' (' + guest.email + ")" + '</span>';
      });

      registrantData.empty();

      if (guests.length) {
        var content = '<li class="ui-state-default">' + '<span class="glyphicon glyphicon-menu-hamburger">' + '</span>' + guests.join('<button class="glyphicon glyphicon-remove removebutton"></button></li><li class="ui-state-default"><span class="glyphicon glyphicon-menu-hamburger"></span>') + '<button class="glyphicon glyphicon-remove removebutton"></button></li>';
        registrantData.append(content);
      }
      else {
        $( "#no-registrants" ).toggle(true);
      }
      // Fire refresh after initialization to allow sorting
     registrantData.sortable("refresh")
    });
  registrantData.sortable()
  },
});
});

//Submit script - post path
$('#pushSubmit').click(function(e) {
e.preventDefault();
var inputName = $("#input-name").val();

$.ajax({
  type: "POST",
  url: "/",
  datatype: "json",
  data : $("#form").serialize(),
  success: function(){
    // Reset input fields & declare ul variable for sorting
    document.getElementById("form").reset();
    var registrantData = $('#sortable');

    // Toggle false no registrants div
    $( "#no-registrants" ).toggle(false);

    // Start script for bootstrap alert
    $(".thanks-alert").html('<div class="alert alert-success alert-dismissable" role="alert">' + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + '<span aria-hidden="true">&times;</span></button>' + '<p>Thanks for registering ' + inputName + '</p></div>');
    // Start script for adding users to json
    $.getJSON('/', function (data) {

      var guests = data.guests.map(function (guest) {
          return guest.name + '<span class="closestemail">' + ' (' + guest.email + ")" + '</span>';
      });

      registrantData.empty();

      if (guests.length) {
        var content = '<li class="ui-state-default">' + '<span class="glyphicon glyphicon-menu-hamburger">' + '</span>' + guests.join('<button class="glyphicon glyphicon-remove removebutton"></button></li><li class="ui-state-default"><span class="glyphicon glyphicon-menu-hamburger"></span>') + '<button class="glyphicon glyphicon-remove removebutton"></button></li>';
        registrantData.append(content);
      }
      // Fire after initialization
     registrantData.sortable("refresh")
    });
  registrantData.sortable()
  },
  error: function(){
    $("#sortable").html("No good")
  }
});
});
// Delete script
$(document).on('click', '.removebutton', function(){
var $emailtestvariable = $(this).closest('li.ui-state-default').find('span.closestemail').text();
var $emailtestvariable = $.trim($emailtestvariable.replace(/[()]/g, ''));
$.ajax({
  type: "POST",
  url: "/" + $emailtestvariable,
  datatype: "json",
  data: {"_method":"delete"},
  success: function(){
    location.reload();
  },
  error: function(){
    console.log("Nothing happened lol")
  },
});
});
