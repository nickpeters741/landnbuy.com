var amenitiesList;

function submitBuilding(uploader) {
  var commisionSetting;
  if ($('#option1').is(':checked') == true) {
    commisionSetting = 'percentage';
    if ($('#commission').val() > 100) {
      snackbar('Error! Please enter a commision value less than 100%', 'red');
      return;
    }
  } else {
    commisionSetting = 'cash'
  }
  console.log('commisionSetting====================================')
  console.log(commisionSetting)
  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');
  if (uploader == 'agent') {
    console.log('agent======================');
    var heading = $('#heading').val();
    var description = $('#description').val();
    var commision = $('#commission').val();
    var commisionSetting = commisionSetting;
    var price = $('#price').val();
    var bedrooms = $('#bedrooms').val();
    var googleLocation = $('#googleLocation').val();
    var ownerName = $('#ownerName').val();
    var owenrPhoneNumber = $('#owenrPhoneNumber').val();
    var county = $('#county').val();
    var location = $('#location').val();
    var image = $('#image').val();
    var category = $('.categories').find('[active]')[0].innerHTML;
    var listingType = $('.listingType').find('[active]')[0].innerHTML;
    var houseType;
    if ($('.houseType').find('[active]').length == 0) {
      houseType = ''
    } else {
      houseType = $('.houseType').find('[active]')[0].innerHTML;
    }

    var amenities = amenitiesList;

    if (heading == '') {
      snackbar('Error! Please enter heading', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (description == '') {
      snackbar('Error! Please enter description', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (commision == '') {
      snackbar('Error! Please enter commision', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (ownerName == '') {
      snackbar("Error! Please enter owner's name", 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (owenrPhoneNumber == '') {
      snackbar("Error! Please enter owner's phone number", 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (price == '') {
      snackbar('Error! Please enter price', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (bedrooms == '') {
      snackbar('Error! Please enter bedrooms', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (location == '') {
      snackbar('Error! Please enter location', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (image == '') {
      snackbar('Error! Please add an image', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else {
      var form = $('form')[1];
      var formData = new FormData(form);
      formData.append(heading, heading);
      formData.append('description', description);
      formData.append(price, price);
      formData.append('commissionSetting', commisionSetting);
      formData.append('commission', commission);
      formData.append('county', county);
      formData.append('location', location);
      formData.append('category', category);
      formData.append('listingType', listingType);
      formData.append('houseType', houseType);
      formData.append('amenities', amenities);
      formData.append('googleLocation', googleLocation);
      formData.append('commissionSetting', commisionSetting);
      formData.append('uploaderID', $('#agentID').attr('agent'));
      $.ajax({
        url: '/buildings/upload/agent',
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
          console.log(data)
          if (data.status == 'ok') {
            if (houseType) {
              window.location.href = "/buildings/awaiting/" + houseType + '/' + data.buildingId + "";

            } else {
              window.location.href = "/buildings/null/" + data.buildingId + "";

            }
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
          snackbar('Error! Connection lost. Check your internet!', 'red');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
        }
      });
    }
  } else if (uploader == 'owner') {
    console.log('owner======================');
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var heading = $('#heading').val();
    var phoneNo = $('#phoneNo').val();
    var description = $('#description').val();
    var commision = $('#commission').val();
    var price = $('#price').val();
    var bedrooms = $('#bedrooms').val();
    var county = $('#county').val();
    var location = $('#location').val();
    var image = $('#image').val();
    var category = $('.categories').find('[active]')[0].innerHTML;
    var listingType = $('.listingType').find('[active]')[0].innerHTML;
    var houseType;
    if ($('.houseType').find('[active]').length == 0) {
      houseType = ''
    } else {
      houseType = $('.houseType').find('[active]')[0].innerHTML;
    }

    var amenities = amenitiesList;

    if (first_name == '') {
      snackbar('Error! Please enter your first name', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (last_name == '') {
      snackbar('Error! Please enter your last name', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (heading == '') {
      snackbar('Error! Please enter heading', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (phoneNo == '') {
      snackbar('Error! Please enter phone number', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (description == '') {
      snackbar('Error! Please enter description', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (commision == '') {
      snackbar('Error! Please enter commision', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (price == '') {
      snackbar('Error! Please enter price', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (bedrooms == '') {
      snackbar('Error! Please enter bedrooms', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (location == '') {
      snackbar('Error! Please enter location', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (image == '') {
      snackbar('Error! Please add an image', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else {
      var form = $('form')[1];
      var formData = new FormData(form);
      formData.append(first_name, first_name);
      formData.append(last_name, last_name);
      formData.append(heading, heading);
      formData.append('description', description);
      formData.append(price, price);
      formData.append('commissionSetting', commisionSetting);
      formData.append('commission', commission);
      formData.append('county', county);
      formData.append('location', location);
      formData.append('category', category);
      formData.append('listingType', listingType);
      formData.append('houseType', houseType);
      formData.append('amenities', amenities);
      formData.append('commissionSetting', commisionSetting);
      var phoneNo = $('#phoneNo').val();
      formData.append('phoneNo', phoneNo);
      $.ajax({
        url: '/buildings/upload/owner',
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
          console.log(data)
          if (data.status == 'ok') {
            // Redirect
            console.log('data.url')
            console.log(houseType)
            if (houseType) {
              window.location.href = "/buildings/awaiting/" + houseType + '/' + data.buildingId + "";

            } else {
              window.location.href = "/buildings/null/" + data.buildingId + "";

            }
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
          snackbar('Error! Connection lost. Check your internet!', 'red');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
        }
      });
    }
  }
}

$("#image").change(function () {
  if (typeof (FileReader) != "undefined") {
    var dvPreview = $("#imagePreview");
    dvPreview.html("");
    $($(this)[0].files).each(function () {
      var file = $(this);
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = $("<img />");
        img.attr("style", "width: 150px; height:100px; padding: 10px");
        img.attr("src", e.target.result);
        dvPreview.append(img);
      }
      reader.readAsDataURL(file[0]);
    });
  } else {
    $("#imagePreview").html('Images added. Go ahead and post.')
  }
});
$("#panorama").change(function () {
  if (typeof (FileReader) != "undefined") {
    var dvPreview = $("#panoramaPreview");
    dvPreview.html("");
    $($(this)[0].files).each(function () {
      var file = $(this);
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = $("<img />");
        img.attr("style", "width: 150px; height:100px; padding: 10px");
        img.attr("src", e.target.result);
        dvPreview.append(img);
      }
      reader.readAsDataURL(file[0]);
    });
  } else {
    $("#panoramaPreview").html('Images added. Go ahead and post.')
  }
});

function submitLand(uploader) {
  var commisionSetting;
  $('#nextStep').css('display', 'none');
  $('.loader').css('display', 'block');
  if ($('#option1').is(':checked') == true) {
    commisionSetting = 'percentage'
    if ($('#commission').val() > 100) {
      snackbar('Error! Please enter a commision value less than 100%', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
      return;
    }
  } else {
    commisionSetting = 'cash'
  }
  if (uploader == 'agent') {
    console.log('agent======================');
    var heading = $('#heading').val();
    var description = $('#description').val();
    var commision = $('#commission').val();
    var price = $('#price').val();
    var county = $('#county').val();
    var location = $('#location').val();
    var ownerName = $('#ownerName').val();
    var owenrPhoneNumber = $('#owenrPhoneNumber').val();
    var googleLocation = $('#googleLocation').val();
    var category = $('#category').val();
    var listingType = $('.listingType').find('[active]')[0].innerHTML;
    var amenities = amenitiesList;
    var images = $('#image').val();

    if (heading == '') {
      snackbar('Error! Please enter heading', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (phoneNo == '') {
      snackbar('Error! Please enter phone number', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (description == '') {
      snackbar('Error! Please enter description', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (commision == '') {
      snackbar('Error! Please enter commision', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (ownerName == '') {
      snackbar("Error! Please enter owner's name", 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (owenrPhoneNumber == '') {
      snackbar("Error! Please enter owner's phone number", 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (price == '') {
      snackbar('Error! Please enter price', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (location == '') {
      snackbar('Error! Please enter location', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (images == '') {
      snackbar('Error! Please add images', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else {
      var form = $('form')[1];
      var formData = new FormData(form);
      formData.append(heading, heading);
      formData.append('description', description);
      formData.append('commissionSetting', commisionSetting);
      formData.append('commission', commission);
      formData.append('ownerName', ownerName);
      formData.append('owenrPhoneNumber', owenrPhoneNumber);
      formData.append('price', price[0]);
      formData.append('county', county);
      formData.append('location', location[0]);
      formData.append('category', category);
      formData.append('listingType', listingType);
      formData.append('amenities', amenities);
      formData.append('googleLocation', googleLocation);
      formData.append('uploader', 'agent');
      formData.append('uploaderID', $('#agentID').attr('agent'));
      $.ajax({
        url: '/lands/upload/owner',
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 'ok') {
            // Redirect
            console.log('should redirect')
            window.location.href = "/lands/awaiting/" + data.landCategory + '/' + data.landId + "";
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
          snackbar('Error! Connection lost. Check your internet!', 'red');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
        }
      });
    }
  } else if (uploader == 'owner') {
    console.log('owner======================');
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var heading = $('#heading').val();
    var phoneNo = $('#phoneNo').val();
    var description = $('#description').val();
    var commision = $('#commission').val();
    var commisionSetting = commisionSetting;
    var price = $('#price').val();
    var county = $('#county').val();
    var location = $('#location').val();
    var googleLocation = $('#googleLocation').val();
    var category = $('#category').val();
    var listingType = $('.listingType').find('[active]')[0].innerHTML;
    var amenities = amenitiesList;
    var images = $('#image').val();

    if (first_name == '') {
      snackbar('Error! Please enter your first name', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (last_name == '') {
      snackbar('Error! Please enter your last name', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (heading == '') {
      snackbar('Error! Please enter heading', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (phoneNo == '') {
      snackbar('Error! Please enter phone number', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (description == '') {
      snackbar('Error! Please enter description', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (commision == '') {
      snackbar('Error! Please enter commision', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (price == '') {
      snackbar('Error! Please enter price', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (location == '') {
      snackbar('Error! Please enter location', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else if (images == '') {
      snackbar('Error! Please add images', 'red');
      $('#nextStep').css('display', 'block');
      $('.loader').css('display', 'none');
    } else {
      var form = $('form')[1];
      var formData = new FormData(form);
      formData.append(first_name, first_name);
      formData.append(last_name, last_name);
      formData.append(heading, heading);
      formData.append('description', description);
      formData.append('commissionSetting', commisionSetting);
      formData.append('commission', $('#commission').val());
      formData.append(price, price);
      formData.append('county', county);
      formData.append('location', location);
      formData.append('category', category);
      formData.append('listingType', listingType);
      formData.append('amenities', amenities);
      formData.append('uploader', 'owner');
      var phoneNo = $('#phoneNo').val();
      formData.append('phoneNo', phoneNo);
      $.ajax({
        url: '/lands/upload/owner',
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 'ok') {
            // Redirect
            console.log('should redirect')
            window.location.href = "/lands/awaiting/" + data.landCategory + '/' + data.landId + "";
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
          snackbar('Error! Connection lost. Check your internet!', 'red');
          $('#nextStep').css('display', 'block');
          $('.loader').css('display', 'none');
        }
      });
    }
  }

}

function listingType(isActive) {
  console.log(isActive)
  var active = $('#' + isActive).is('[active]');

  if (active == false) {
    if (isActive == 'forSale') {
      $('#forRent').removeClass('isActive');
      $('#forRent').removeAttr('active');

      $('#forSale').addClass('isActive');
      $('#forSale').attr('active', '');
    } else {
      $('#forSale').removeClass('isActive');
      $('#forSale').removeAttr('active');
      $('#forRent').addClass('isActive');
      $('#forRent').attr('active', '');
    }
  } else {

  }
}

function amenity(isActive) {
  var active = $('#' + isActive).is('[active]');
  console.log(active);
  if (active == false) {
    $('#' + isActive).addClass('isActive');
    $('#' + isActive).attr('active', '');
  } else {
    $('#' + isActive).removeClass('isActive');
    $('#' + isActive).removeAttr('active', '');
  }
}

function saveAmenities() {
  amenitiesList = new Array;
  $('.smallCards').html('')
  var amenities = $('.amenitiesArray').find('[active]');
  for (i = 0; i < amenities.length; i++) {
    amenitiesList.push(amenities[i].innerHTML)
  }
  if (amenitiesList.length >= 1) {
    for (i = 0; i < amenitiesList.length; i++) {
      console.log(amenitiesList[i])
      $('.smallCards').append('<li>' + amenitiesList[i] + '</li>')
    }

    snackbar('Added amenities successfully', '#0091F8')
  } else {
    snackbar("Ooops! You've not added any amenity", '#0091F8')
  }

}

function houseType(isActive) {
  var active = $('#' + isActive).is('[active]');
  var categoryType = $('.categories').find("[active]")[0].innerHTML

  if (active == false) {
    if (isActive == 'bedsitterType') {
      if (categoryType == 'Commercial') {

      } else if (categoryType == 'Industrial') {} else {
        $('#apartmentType').removeClass('isActive');
        $('#apartmentType').removeAttr('active');
        $('#bangalowType').removeClass('isActive');
        $('#bangalowType').removeAttr('active');
        $('#mansionType').removeClass('isActive');
        $('#mansionType').removeAttr('active');

        $('#bedsitterType').addClass('isActive');
        $('#bedsitterType').attr('active', '');
      }


    } else if (isActive == 'bangalowType') {
      if (categoryType == 'Commercial') {

      } else if (categoryType == 'Industrial') {} else {
        $('#apartmentType').removeClass('isActive');
        $('#apartmentType').removeAttr('active');
        $('#bedsitterType').removeClass('isActive');
        $('#bedsitterType').removeAttr('active');
        $('#mansionType').removeClass('isActive');
        $('#mansionType').removeAttr('active');

        $('#bangalowType').addClass('isActive');
        $('#bangalowType').attr('active', '');
      }


    } else if (isActive == 'apartmentType') {
      if (categoryType == 'Commercial') {

      } else if (categoryType == 'Industrial') {} else {
        $('#bangalowType').removeClass('isActive');
        $('#bangalowType').removeAttr('active');
        $('#bedsitterType').removeClass('isActive');
        $('#bedsitterType').removeAttr('active');
        $('#mansionType').removeClass('isActive');
        $('#mansionType').removeAttr('active');

        $('#apartmentType').addClass('isActive');
        $('#apartmentType').attr('active', '');
      }


    } else if (isActive == 'mansionType') {
      if (categoryType == 'Commercial') {

      } else if (categoryType == 'Industrial') {} else {

        $('#bangalowType').removeClass('isActive');
        $('#bangalowType').removeAttr('active');
        $('#bedsitterType').removeClass('isActive');
        $('#bedsitterType').removeAttr('active');
        $('#apartmentType').removeClass('isActive');
        $('#apartmentType').removeAttr('active');

        $('#mansionType').addClass('isActive');
        $('#mansionType').attr('active', '');
      }

    } else {
      $('#forSale').removeClass('isActive');
      $('#forSale').removeAttr('active');
      $('#forRent').addClass('isActive');
      $('#forRent').attr('active', '');
    }
  } else {

  }
}

function categoryType(isActive) {
  console.log(isActive)
  var active = $('#' + isActive).is('[active]');

  if (active == false) {
    if (isActive == 'categoryCommercialProperties') {
      $('#categoryResidential').removeClass('isActive');
      $('#categoryResidential').removeAttr('active');
      $('#categoryIndustrial').removeClass('isActive');
      $('#categoryIndustrial').removeAttr('active');

      $('#categoryCommercialProperties').addClass('isActive');
      $('#categoryCommercialProperties').attr('active', '');


      //make all TYPES inactive goes here
      $('#apartmentType').removeClass('isActive');
      $('#apartmentType').removeAttr('active');
      $('#bedsitterType').removeClass('isActive');
      $('#bedsitterType').removeAttr('active');
      $('#mansionType').removeClass('isActive');
      $('#mansionType').removeAttr('active');
      $('#bangalowType').removeClass('isActive');
      $('#bangalowType').removeAttr('active', '');
    } else if (isActive == 'categoryResidential') {
      $('#categoryCommercialProperties').removeClass('isActive');
      $('#categoryCommercialProperties').removeAttr('active');
      $('#categoryIndustrial').removeClass('isActive');
      $('#categoryIndustrial').removeAttr('active');

      $('#categoryResidential').addClass('isActive');
      $('#categoryResidential').attr('active', '');

      $('#apartmentType').addClass('isActive');
      $('#apartmentType').attr('active', '');
    } else if (isActive == 'categoryIndustrial') {
      $('#categoryResidential').removeClass('isActive');
      $('#categoryResidential').removeAttr('active');
      $('#categoryCommercialProperties').removeClass('isActive');
      $('#categoryCommercialProperties').removeAttr('active');

      $('#categoryIndustrial').addClass('isActive');
      $('#categoryIndustrial').attr('active', '');

      //make all TYPES inactive goes here
      $('#apartmentType').removeClass('isActive');
      $('#apartmentType').removeAttr('active');
      $('#bedsitterType').removeClass('isActive');
      $('#bedsitterType').removeAttr('active');
      $('#mansionType').removeClass('isActive');
      $('#mansionType').removeAttr('active');
      $('#bangalowType').removeClass('isActive');
      $('#bangalowType').removeAttr('active', '');
    } else if (isActive == 'categoryShops') {
      $('#categoryCommercialProperties').removeClass('isActive');
      $('#categoryCommercialProperties').removeAttr('active');
      $('#categoryBungalows').removeClass('isActive');
      $('#categoryBungalows').removeAttr('active');
      $('#categoryOffices').removeClass('isActive');
      $('#categoryOffices').removeAttr('active');
      $('#categoryHouses').removeClass('isActive');
      $('#categoryHouses').removeAttr('active');
      $('#categoryTownhouses').removeClass('isActive');
      $('#categoryTownhouses').removeAttr('active');

      $('#categoryShops').addClass('isActive');
      $('#categoryShops').attr('active', '');
    } else if (isActive == 'categoryHouses') {
      $('#categoryCommercialProperties').removeClass('isActive');
      $('#categoryCommercialProperties').removeAttr('active');
      $('#categoryBungalows').removeClass('isActive');
      $('#categoryBungalows').removeAttr('active');
      $('#categoryShops').removeClass('isActive');
      $('#categoryShops').removeAttr('active');
      $('#categoryOffices').removeClass('isActive');
      $('#categoryOffices').removeAttr('active');
      $('#categoryTownhouses').removeClass('isActive');
      $('#categoryTownhouses').removeAttr('active');

      $('#categoryHouses').addClass('isActive');
      $('#categoryHouses').attr('active', '');
    } else if (isActive == 'categoryTownhouses') {
      $('#categoryCommercialProperties').removeClass('isActive');
      $('#categoryCommercialProperties').removeAttr('active');
      $('#categoryBungalows').removeClass('isActive');
      $('#categoryBungalows').removeAttr('active');
      $('#categoryShops').removeClass('isActive');
      $('#categoryShops').removeAttr('active');
      $('#categoryOffices').removeClass('isActive');
      $('#categoryOffices').removeAttr('active');
      $('#categoryHouses').removeClass('isActive');
      $('#categoryHouses').removeAttr('active');

      $('#categoryTownhouses').addClass('isActive');
      $('#categoryTownhouses').attr('active', '');
    } else {
      $('#forSale').removeClass('isActive');
      $('#forSale').removeAttr('active');
      $('#forRent').addClass('isActive');
      $('#forRent').attr('active', '');
    }
  } else {

  }
}

function commissionState() {
  if ($('#option1').is(':checked') == true) {
    $('#commission').attr('placeholder', 'Enter the commission in percentage');
  } else {
    $('#commission').attr('placeholder', 'Enter the commission in KES')
  }
}