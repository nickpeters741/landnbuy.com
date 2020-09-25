function signup() {
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password').val();

  if (username == '') {
    snackbar('Error! Please enter your username', 'red')
  } else if (email == '') {
    snackbar('Error! Please enter your email', 'red')
  } else if (password == '') {
    snackbar('Error! Please enter your password', 'red')
  } else {
    var obj = {
      "username": username,
      "email": email,
      "password": password,
    }
    $.ajax({
      url: "/signup",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          console.log('iko sawa')
          window.location.href = "/";
        } else {
          console.log('kuna shida')
          snackbar(data.msg, 'red')
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}

function login() {
  var email = $('#email').val();
  var password = $('#password').val();

  if (email == '') {
    snackbar('Error! Please enter your email', 'red')
  } else if (password == '') {
    snackbar('Error! Please enter your password', 'red')
  } else {
    var obj = {
      "email": email,
      "password": password,
    }
    $.ajax({
      url: "/login",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          console.log('iko sawa')
          window.location.href = "/";
        } else {
          console.log('kuna shida')
          snackbar(data.msg, 'red')
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}

function getBuilding(id) {
  window.location.href = "/buildings/" + id;
}
function getLand(id) {
  window.location.href = "/lands/" + id;
}
function getAgent(id) {
  window.location.href = "/agents/" + id;
}

function deleteAmenity(amenity) {
  $('#' + amenity).remove();
}
$(document).on('click', '.saveAmenity', function () {
  var amenity = $('#amenityToSave').val();
  $('.amenitiesDisplay').append('<li>' + amenity + ' <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.992 511.992" style="width: 11px; margin-left: 10px;"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#8a0000"></path></svg></span></li>');
  snackbar('Successfully added amenity');
})
$(document).on('click', '.amenitiesDisplay li', function () {
  var toDelete = $(this)
  $('#amenityDelete').modal('show');
  $('.yesDeleteAmenity').click(function () {
    toDelete.remove();
    $('#amenityDelete').modal('hide');
    snackbar('Successfully deleted amenity');
  })
});

function saveBuilding(id, uploader) {
  var heading = $('#heading').val();
  var description = $('#description').val();
  var commission = $('#commission').val();
  var googleLocation = $('#googleLocation').val();
  var listingType = $('#listingType').val();
  var category = $('#category').val();
  var type = $('#type').val();
  var ameminties = new Array();
  var price = $('#price').val();
  var location = $('#location').val();
  if (heading == '') {
    snackbar('Error! Enter heading');
  } else if (description == '') {
    snackbar('Error! Enter description');
  } else if (commission == '') {
    snackbar('Error! Enter commission');
  } else if (price == '') {
    snackbar('Error! Enter price');
  } else if (location == '') {
    snackbar('Error! Enter location');
  } else {
    var amenitiesList = $('.amenitiesDisplay').children();
    for (i = 0; i < amenitiesList.length; i++) {
      ameminties.push(amenitiesList[i].innerText);
    }
    var obj = {
      "heading": heading,
      "description": description,
      "commission": commission,
      "googleLocation": googleLocation,
      "listingType": listingType,
      "category": category,
      "type": type,
      "ameminties": ameminties,
      "price": price,
      "location": location,
      "id": id,
    }
    console.log(obj)
    $.ajax({
      url: "/saveBuilding",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}

function approved(id, status) {
  console.log('clicked')
  if (status == 'yes') {
    var obj = {
      "id": id,
      "approved": true,
    }
    console.log(obj)
    $.ajax({
      url: "/approved-building",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  } else {
    var obj = {
      "id": id,
      "approved": false,
    }
    console.log(obj)
    $.ajax({
      url: "/approved-building",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}
function approvedLand(id, status) {
  console.log('clicked')
  if (status == 'yes') {
    var obj = {
      "id": id,
      "approved": true,
    }
    console.log(obj)
    $.ajax({
      url: "/approved-land",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  } else {
    var obj = {
      "id": id,
      "approved": false,
    }
    console.log(obj)
    $.ajax({
      url: "/approved-land",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}
function approvedAgent(id, status) {
  console.log('clicked')
  if (status == 'yes') {
    var obj = {
      "id": id,
      "approved": true,
    }
    console.log(obj)
    $.ajax({
      url: "/approved-agent",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log('hr')
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  } else {
    var obj = {
      "id": id,
      "approved": false,
    }
    console.log(obj)
    $.ajax({
      url: "/approved-agent",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log('here')
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Updated successfully');
        } else {
          snackbar('Error! Please try again later');
        }
      },
      error: function (xhr, text, err) {
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}


function interview(id) {
  window.location.href = "/interviewee/" + id;
}
function step2Approve(id){
  $.ajax({
    url: "/interviewee/step2/"+id+"/approve",
    type: "POST",
    contentType: "application/json",
    success: function (data) {
      console.log(data)
      if (data.status == 'ok') {
        location.reload();
      } else {
        snackbar('Error! Please try again later');
      }
    },
    error: function (xhr, text, err) {
      snackbar('Error! Try again later');
      $('.elipsis').css('display', 'none');
      $('.submitBTN').css('display', 'block');
    }
  });
}
function step3Approve(id){
  $.ajax({
    url: "/interviewee/step3/"+id+"/approve",
    type: "POST",
    contentType: "application/json",
    success: function (data) {
      console.log(data)
      if (data.status == 'ok') {
        location.reload();
        snackbar('Updated successfully');
      } else {
        snackbar('Error! Please try again later');
      }
    },
    error: function (xhr, text, err) {
      snackbar('Error! Try again later');
      $('.elipsis').css('display', 'none');
      $('.submitBTN').css('display', 'block');
    }
  });
}