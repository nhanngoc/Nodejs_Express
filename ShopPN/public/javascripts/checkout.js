Stripe.setPublishableKey('pk_test_HE9RiAaPhFiAkVOPGU50BUII');

let $form = $('#checkout-form');

$form.submit(function (event) {
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!

        // Show the errors on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        let token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}

var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');
context.lineWidth = 2;

var size = window.innerWidth;

canvas.width = size;
canvas.height = size;

function getRndColor() {
  var r = 255*Math.random()|0,
      g = 255*Math.random()|0,
      b = 255*Math.random()|0;
  return 'rgb(' + r + ',' + g + ',' + b + ', 0.7' +')';
}

let x = 0;
let y = 0;
let w = 160;
let l = size;
  
for(let i=0; i <= size; i++) {
context.fillStyle = getRndColor();
context.fillRect(x,y,w,l);
x+=w;
}

// Use as background image on main page
var showcase = document.querySelector('body');
showcase.style.background = "url(" + canvas.toDataURL("image/png")+ ")";
showcase.style.backgroundSize = "cover";
showcase.style.backgroundPosition = "center";
showcase.style.backgroundRepeat = "no-repeat";