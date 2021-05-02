$(window).on('load', function () {
  'use strict';

  // LOADER

  $('.preloader').fadeOut();

  // RESPONSIVE MOBILE MENU

  $('.menu-btn').on('click', function () {
    $('.responsive-mobile-menu').toggleClass('show');
    return false;
  });

  $('.responsive-menu-option').on('click', function () {
    $('.responsive-mobile-menu').removeClass('show');
    return true;
  });

  $('html').on('click', function () {
    $('.responsive-mobile-menu').removeClass('show');
  });
  $('.menu-btn, .responsive-mobile-menu').on('click', function (e) {
    e.stopPropagation();
  });

  // CONTACT FORM VALIDATION

  if ($('#contact-form').length) {
    $('#submit').click(function () {
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      var name = $('#contact-form .name').val();
      var email = $('#contact-form .email').val();
      var message = $('#message').val();

      if (name == '' || email == '' || message == '') {
        $('#contact-form .response').html(
          '<div class="failed">Please fill the required fields.</div>'
        );
        return false;
      }

      if (!mailformat.test(String(email).toLowerCase())) {
        $('#contact-form .response').html(
          '<div class="failed">Please enter valid email id.</div>'
        );
        return false;
      }

      // ================Email Js ========//
      var service_id = 'default_service';
      var template_id = 'template_contactus';
      emailjs.init('user_WOpltFhJdjpxyZ4advTkD');

      var data = {
        name: name,
        email: email,
        message: message,
      };
      emailjs.send(service_id, template_id, data).then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          $('form').trigger('reset');
          $('#contact-form .response').fadeIn().html(data);
          setTimeout(function () {
            $('#contact-form .response').fadeOut('slow');
          }, 5000);
          $('#contact-form .response').html(
            '<div class="success">Email has been sent successfully.</div>'
          );
        },
        function (error) {
          console.log('FAILED...', error);
          $('#contact-form .response').html(
            '<div class="failed">Oops some error! could not send email</div>'
          );
        }
      );
    });
  }

  // ============= Newsletter =========== //

  if ($("#newsletter-form").length) {
    $("#nsubmit").click(function () {
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      var email = $("#nemail").val();

      if (email == "") {
        $("#newsletter-form .response").html(
          '<div class="failed">Please enter your email.</div>'
        );

        return false;
      }

      if (!mailformat.test(String(email).toLowerCase())) {
        $("#newsletter-form .response").html(
          '<div class="failed">Please enter valid email id.</div>'
        );
        return false;
      }
    });
  }
});
