$(function() {

//------------------------------счетчики----------------------
  // $('body').mouseleave(function(){
  //   $("#close").popup("show");
  // });

//------------------------------счетчики----------------------

$( document ).ready(function() {
  var online = getRandom(105, 115);
  countDownOnline(online);

  var slots = 20;
  countDownSlots(slots);


  var visible = [0];
  showUsers(4, visible);

    $('.users').slick({
      infinite: true,
      arrows: false,
      speed: 700,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      responsive: [
      {
        breakpoint: 1100,
        settings: {
        slidesToShow: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
        slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
        slidesToShow:1
        }
      }

      ]
    });

  var Counter = new (function() {
    var $secondcounter = $('#countdown1');

    var $countdown, // Stopwatch element on the page
      incrementTime = 70, // Timer speed in milliseconds
      currentTime = 60000, // Current time in hundredths of a second
      updateTimer = function() {

        if (currentTime >= 0){
          $countdown.html(formatTime(currentTime));

          if($secondcounter) $secondcounter.html(formatTime(currentTime));

          currentTime -= incrementTime / 10;

        }
      },
      init = function() {
        $countdown = $('#countdown');
        Counter.Timer = $.timer(updateTimer, incrementTime, true);
      };
    this.resetStopwatch = function() {
      currentTime = 0;
      this.Timer.stop().once();
    };
    $(init);
  });



});


  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function countDownOnline(online){
    $('.counter__number').text(online);

    if(online < 245){
      online = online + getRandom(-1, 3);
    }

    else{
      online = online - getRandom(1, 3);
    }

    var timer = getRandom(6, 9) * 1000;

    setTimeout(function(){
      countDownOnline(online);
    }, timer);
  }


  function countDownSlots(slots){

    $('.counter--red__number').text(slots);

    if(slots > 5){
      slots = slots - getRandom(1, 3);
    }
    else{
      slots = slots - getRandom(-2, 2);
    }

    if (slots < 2){
      slots = 1;
    }

    var timer = getRandom(6, 9) * 1000;

    setTimeout(function(){
      countDownSlots(slots);
    }, timer);
  }




// //-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        surname: "Введите Фамилию",
        mail: "Введите e-mail",
        pass: "Введите пароль",
        phone: "Введите Ваш телефон",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          surname: jQuery('.form-' + index).find("input[name=surname]").val(),
          mail: jQuery('.form-' + index).find("input[name=mail]").val(),
          pass: jQuery('.form-' + index).find("input[name=pass]").val(),
          number: jQuery('.form-' + index).find("input[name=number]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});

//----------------------------------------preloader----------------------------------

  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });



