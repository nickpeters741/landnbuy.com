var path = window.location.pathname

function sharePage(propertyID) {
  if (navigator.share) {
    navigator.share({
        title: 'landNbuy',
        text: 'Check out this property',
        url: 'https://landnbuy.com' + path,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  } else {
    snackbar("Error! Can't share using a desktop. Use your smartphone", 'red')
  }
}