function saveAgent() {
  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');
  console.log('called')
  var firstName = $('#firstName').val();
  var lastName = $('#lastName').val();
  var email = $('#email').val();
  var phoneNo = $('#phoneNo').val();
  var location = $('#location').val();
  var county = $('#county').val();
  var image = $('#image').val();
  var image2 = $('#image2').val();
  var image3 = $('#image3').val();
  var password = $('#password').val();
  var password2 = $('#password2').val();
  var referee = $('#referee').val();
  var refereeContact = $('#refereeContact').val();
  if (firstName == '') {
    snackbar('Error! Enter your first name', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (lastName == '') {
    snackbar('Error! Enter your last name', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (email == '') {
    snackbar('Error! Enter your email', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (phoneNo == '') {
    snackbar('Error! Enter your phone number', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (location == '') {
    snackbar('Error! Enter your location', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  }else if (password == '') {
    snackbar('Error! Enter your password', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (image == '') {
    snackbar('Error! Please add the front side of your identity card photo', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (image2 == '') {
    snackbar('Error! Please add your passport photo', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  }else if (image3 == '') {
    snackbar('Error! Please add the back side of your identity card photo', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (referee == '') {
    snackbar('Error! Please add a referee', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (refereeContact == '') {
    snackbar('Error! Please add referee contact', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  }else if(password != password2){
    snackbar('Error! Passwords do not match.', 'red');
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else {
    console.log('submitting')
    var form = $('form')[1];
    var formData = new FormData(form);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNo', phoneNo);
    formData.append('image', image);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('password', password);
    formData.append('location', location);
    formData.append('county', county);
    formData.append('referee', referee);
    formData.append('refereeContact', refereeContact);
    $.ajax({
      url: '/agents/signup',
      data: formData,
      dataType: 'json',
      type: 'POST',
      processData: false,
      contentType: false,
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          // Redirect
          window.location.href = "/agent/signup/step2/" + data.userID;

          // window.location.replace("/agent/profile")
        } else {
          snackbar(data.msg, 'red');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
        }
      },
      error: function (xhr, status, error) {
        console.log('Error: ' + xhr);
        console.log('Error: ' + status);
        console.log('Error: ' + error);
        $('#nextStep').css('display', 'block');
        $('.loader').css('display', 'none');
        snackbar('' + error + '', 'red')
      }
    });
  }
}

function step3(user_id) {
  console.log('user_id')
  console.log(user_id)
  var form = $('form')[1];
  var formData = new FormData(form);
  $.ajax({
    url: '/agent/signup/step3/' + user_id,
    data: formData,
    dataType: 'json',
    type: 'POST',
    processData: false,
    contentType: false,
    success: function (data) {
      console.log(data)
      if (data.status == 'ok') {
        // Redirect
        window.location.href = "/agent/signup/complete";

        // window.location.replace("/agent/profile")
      } else {
        snackbar(data.msg, 'red')
      }
    },
    error: function (xhr, status, error) {
      console.log('Error: ' + xhr);
      console.log('Error: ' + status);
      console.log('Error: ' + error);
      snackbar('Error! Please check type of image', 'red')
    }
  });
}

function step2(user_id) {
  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');
  var interviewType;
  if ($('#interviewRadio2').is(':checked') == true) {
    interviewType = 'visit';
  } else {
    interviewType = 'online';
  }
  var obj = {
    "interviewType": interviewType,
    "date": $("#datetimepicker12").data("DateTimePicker").date().toDate(),
  }
  $.ajax({
    url: "/agent/signup/step2/" + user_id,
    type: "POST",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: function (data) {
      console.log(data)
      if (data.status == 'ok') {
        window.location.href = "/agent/signup/step2/awaiting/" + data.userID;
      } else {
        snackbar('Error! Try again later', 'red');
        $('#nextStep').css('display', 'block');
        $('.loader').css('display', 'none');
      }
    },
    error: function (xhr, text, err) {
      snackbar('Error! Try again later');
      $('.elipsis').css('display', 'none');
      $('.submitBTN').css('display', 'block');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    }
  });
}