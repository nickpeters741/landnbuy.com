(function ($) {
  "use strict";

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  /*--/ ScrollReveal /Easy scroll animations for web and mobile browsers /--*/
  window.sr = ScrollReveal();
  sr.reveal('.foo', {
    duration: 1000,
    delay: 15
  });

  /*--/ Carousel owl /--*/
  $('#carousel').owlCarousel({
    loop: true,
    margin: -1,
    items: 1,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  /*--/ Animate Carousel /--*/
  $('.intro-carousel').on('translate.owl.carousel', function () {
    $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
    $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
    $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
  });

  $('.intro-carousel').on('translated.owl.carousel', function () {
    $('.intro-content .intro-title').addClass('zoomIn animated').show();
    $('.intro-content .intro-price').addClass('fadeInUp animated').show();
    $('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
  });

  /*--/ Navbar Collapse /--*/
  $('.navbar-toggle-box-collapse').on('click', function () {
    $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
  });
  $('.close-box-collapse, .click-closed').on('click', function () {
    $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
    $('.menu-list ul').slideUp(700);
  });

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).bind('scroll', function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-default').addClass('navbar-reduce');
      $('.navbar-default').removeClass('navbar-trans');
    } else {
      $('.navbar-default').addClass('navbar-trans');
      $('.navbar-default').removeClass('navbar-reduce');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Property owl /--*/
  $('#property-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });
  $('#property-carousel2').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });
  $('#land-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });

  /*--/ Property owl owl /--*/
  $('#property-single-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  /*--/ News owl /--*/
  $('#new-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });

  /*--/ Testimonials owl /--*/
  $('#testimonial-carousel').owlCarousel({
    margin: 0,
    autoplay: true,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeInUp',
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

})(jQuery);


if (window.location.pathname == '/') {
  $('#requestPathName').attr('href', '#section-special-request')
} else {
  $('#requestPathName').attr('href', '/#section-special-request')
}


function requestProperty() {
  $('.theText').css('display', 'none');
  $('.dots').css('display', 'block');
  var requestName = $('#requestName').val();
  var requestEmail = $('#requestEmail').val();
  var requestPhoneNo = $('#requestPhoneNo').val();
  var requestDetails = $('#requestDetails').val();
  if (requestName == '') {
    $('.theText').css('display', 'block');
    $('.dots').css('display', 'none');
    snackbar('Ooops! Please enter your name');
  } else if (requestEmail == '') {
    $('.theText').css('display', 'block');
    $('.dots').css('display', 'none');
    snackbar('Ooops! Please enter your email');
  } else if (requestPhoneNo == '') {
    $('.theText').css('display', 'block');
    $('.dots').css('display', 'none');
    snackbar('Ooops! Please enter your phone numer');
  } else if (requestDetails == '') {
    $('.theText').css('display', 'block');
    $('.dots').css('display', 'none');
    snackbar('Ooops! Please enter your request');
  } else {
    var obj = {
      "requestName": requestName,
      "requestEmail": requestEmail,
      "requestPhoneNo": requestPhoneNo,
      "requestDetails": requestDetails,
    }
    $.ajax({
      url: "/send-property-request",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Request sent successfully', '#0080F7');
          $('#requestModal').modal('hide');
          $('#requestName').val('')
          $('#requestEmail').val('')
          $('#requestDetails').val('')
        } else {
          snackbar(data.err, 'red');
        }
        $('.theText').css('display', 'block');
        $('.dots').css('display', 'none');
      },
      error: function (xhr, text, err) {
        $('.theText').css('display', 'block');
        $('.dots').css('display', 'none');
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}
$('.theText').css('display', 'block')
$('.dots').css('display', 'block')
$.ajax({
  url: "/get-dates",
  type: "POST",
  contentType: "application/json",
  success: function (data) {
    var s = data.data
    if (data.status == 'ok') {
      $(document).ready(function () {
        $(function () {
          $('#datetimepicker12').datetimepicker({
            inline: true,
            sideBySide: true,
            daysOfWeekDisabled: [0, 6],
            disabledDates:s
          });
        });
      });
    } else {
      $(document).ready(function () {
        $(function () {
          $('#datetimepicker12').datetimepicker({
            inline: true,
            sideBySide: true,
            daysOfWeekDisabled: [0, 6],
          });
        });
      });
    }
    $('.theText').css('display', 'block');
    $('.dots').css('display', 'none');
  },
  error: function (xhr, text, err) {
    $('.theText').css('display', 'block');
    $('.dots').css('display', 'none');
    snackbar('Error! Try again later');
    $('.elipsis').css('display', 'none');
    $('.submitBTN').css('display', 'block');
  }
});

function searchEmpty() {
  var name = $('#requestName').val();
  var email = $('#requestEmail').val();
  console.log('name')
  console.log(name)
  console.log(email)
  if (name == '') {
    snackbar('Opps! Enter your full name.', 'red');
  } else if (email == '') {
    snackbar('Opps! Enter your email address.', 'red');

  } else {
    var obj = {
      "name": name,
      "email": email,
    }
    $.ajax({
      url: "/saveSearchEmptyUsers",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar(data.msg, '#0080F7');
          $('#searchEmpty').modal('hide')

        } else {
          snackbar(data.msg, 'red');
        }
        $('.theText').css('display', 'block');
        $('.dots').css('display', 'none');
      },
      error: function (xhr, text, err) {
        $('.theText').css('display', 'block');
        $('.dots').css('display', 'none');
        snackbar('Error! Try again later');
        $('.elipsis').css('display', 'none');
        $('.submitBTN').css('display', 'block');
      }
    });
  }
}

function viewPassword(input) {
  var x = document.getElementById(input);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function contactustMessage() {

  var name = $('#name').val();
  var email = $('#email').val();
  var subject = $('#subject').val();
  var message = $('#message').val();

  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');

  if (name == '') {
    snackbar('Error! Please enter your name', 'red')
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (email == '') {
    snackbar('Error! Please enter your email', 'red')
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (subject == '') {
    snackbar('Error! Please enter subject', 'red')
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else if (message == '') {
    snackbar('Error! Please enter message', 'red')
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
  } else {
    var obj = {
      "name": name,
      "email": email,
      "subject": subject,
      "message": message,
    }
    $.ajax({
      url: "/save-message",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar('Message sent successfully', '#0091F8');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
        } else {
          snackbar('Error! Please try again later', 'red');
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
}

function resetPasswordRequest() {
  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');
  var email = $('#email').val();
  if (email == '') {
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Enter email', 'red');
  } else {
    var obj = {
      "email": email,
    }
    $.ajax({
      url: "/reset-password/request",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          window.location.href = "/reset-password/reset/" + data.email
        } else {
          snackbar(data.error, 'red');
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
}

function resetPassword(email) {
  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');
  var pin = $('#pin').val();
  var password1 = $('#password').val();
  var password2 = $('#password2').val();
  if (pin == '') {
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Enter pin', 'red');
  }else if(password1 == ''){
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Enter password', 'red');
  }else if(password2 == ''){
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Confirm password', 'red');
  }else if(password1 != password2){
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Passwords do not match.', 'red');
  } else {
    var obj = {
      "pin": pin,
      "password": password1,
    }
    $.ajax({
      url: "/reset-password/reset/" + email,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          $('#resetPasswordForm').css('display', 'none');
          $('#afterSuccess').css('display', 'block');
          $('#resetHeader').html('Reset password successful');
          $('#resetText').html('You have successfully reset your password. Click on the button below to log in with your new password');
        } else {
          snackbar(data.error, 'red');
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
}
function buyRequest(){
  var name = $('#name').val();
  var email = $('#email').val();
  var phoneNo = $('#phoneNo').val();
  var propertyID = window.location.href.split('/').slice(-2)[0];

  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');

  if(name == ''){
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Enter your full name', 'red');
  }else if(email == ''){
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Enter email', 'red');
  }else if(phoneNo == ''){
    $('#nextStep').css('display', 'block');
    $('.loader').css('display', 'none');
    snackbar('Error! Enter phone number', 'red');
  }else{
    var obj = {
      "name": name,
      "email": email,
      "phoneNo": phoneNo,
      "propertyID": propertyID,
    }
    $.ajax({
      url: "/property-buy-request",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (data) {
        console.log(data)
        if (data.status == 'ok') {
          snackbar("Success! Your request has been received.", '#0091F8');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
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
}
function buyProperty(){
  window.location.href = window.location.href + '/buy'
}