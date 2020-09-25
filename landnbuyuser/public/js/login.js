function login() {
  var email = $('#email').val();
  var password = $('#password').val();
  if (email == '') {
    snackbar('Error! Please enter your email', 'red');
  } else if (password == '') {
    snackbar('Error! Please enter your password', 'red');
  } else {
    var obj = {
      "email": email,
      "password": password
    }
    $.ajax({
      url: "/login",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          window.location.href = data.url
        } else {
          snackbar(data.msg, 'red');
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

function agentLogin() {
  var email = $('#email').val();
  var password = $('#password').val();
  if (email == '') {
    snackbar('Error! Please enter your email', 'red');
  } else if (password == '') {
    snackbar('Error! Please enter your password', 'red');
  } else {
    var obj = {
      "email": email,
      "password": password
    }
    $.ajax({
      url: "/agent/login",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          console.log('was here')
          window.location.href = data.url
        } else {
          snackbar(data.msg, 'red');
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