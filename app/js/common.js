$(function() {


//------------------------------счетчики----------------------
  $('.absolute').mouseleave(function(){
    $("#modal--one").popup("show");
  });


// //-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});


  $('#video1').popup({
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top' //optional
  });
  $('#video2').popup({
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top' //optional
  });
//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
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




//------------------------------счетчики----------------------


var PrevY = 0;

var names = ["Виталий","Константин","Андрей","Валентин","Георгий","Николай","Данила","Вячеслав","Алексей","Николай","Роман","Степан","Егор","Никита","Фёдор","Александр","Григорий","Руслан","Руслан","Ярослав","Богдан","Анатолий","Дмитрий","Филипп","Пётр","Семён","Ян","Александр","Павел","Семён","Эльдар","Степан","Эрик","Тимофей","Станислав","Валентин","Иван","Роман","Никита","Илья","Валерий","Тимофей","Святослав","Владимир","Станислав","Анатолий","Валерий","Ярослав","Николай","Борис","Игорь","Олег","Пётр","Егор","Валерий","Василий","Вячеслав","Леонид","Геннадий","Максим","Артём","Яков","Роман","Михаил","Сергей","Михаил","Эдуард","Олег","Леонид","Илья","Валентин","Василий","Степан","Руслан","Пётр","Лев","Антон","Даниил","Аркадий","Артём","Роман","Анатолий","Тимур","Павел","Михаил","Рустам","Владислав","Андрей","Михаил","Алексей","Роберт","Яков","Филипп","Сергей","Лев","Глеб","Максим","Александр","Михаил","Виктор","Денис","Сергей","Василий","Леонид","Илья","Алексей","Валерий","Никита","Ольга","Ирина","Виктория","Алёна","Алина","Вероника","Любовь","Алевтина","Маргарита","Лилия","Ангелина","Таисия","Анна","Мария","Юлия","Мария","Анна","Александра","Елизавета","Вероника","Екатерина","Валерия","Алина","Марина","Полина","Маргарита","Юлия","Наталья","Светлана","Ирина","Яна","Марина","Ольга","Татьяна","Инна","Светлана","Лариса","Вера","Евгения","Элеонора","Елена","Антонина","Светлана","Валентина","Александра","Любовь","Ольга","Кристина","Виктор","Сергей","Анатолий","Антон","Виталий","Глеб","Александр","Марк","Алексей","Павел","Николай","Давид","Максим","Олег","Александр","Артем","Василий","Матвей","Арсен","Григорий","Иван","Виталий","Лев","Владислав","Иван","Сергей","Вячеслав","Никита","Святослав","Дмитрий","Степан","Евгений","Алексей","Илья","Сергей","Евгений","Михаил","Георгий"];


function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return (setStr);
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }

    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

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

  // var Counter = new (function() {
  //   var $secondcounter = $('#countdown1');

  //   var $countdown, // Stopwatch element on the page
  //     incrementTime = 70, // Timer speed in milliseconds
  //     currentTime = 60000, // Current time in hundredths of a second
  //     updateTimer = function() {

  //       if (currentTime >= 0){
  //         $countdown.html(formatTime(currentTime));

  //         if($secondcounter) $secondcounter.html(formatTime(currentTime));

  //         currentTime -= incrementTime / 10;

  //       }
  //     },
  //     init = function() {
  //       $countdown = $('#countdown');
  //       Counter.Timer = $.timer(updateTimer, incrementTime, true);
  //     };
  //   this.resetStopwatch = function() {
  //     currentTime = 0;
  //     this.Timer.stop().once();
  //   };
  //   $(init);
  // });



});




function showUsers(number, visible) {

  var shown = $( ".users .user" ).length;
  var user;
  if(shown == 0){

    for( var i=0; i<number; i++){
      user = newUser(visible);

      var card = user[0];
      var id = user[1];

      $( ".users" ).append(card);
      visible[i] = id;
    }
  }
  else{

    var userid = getRandom(0, shown);

    user = newUser(visible);

    var card = user[0];
    var id = user[1];

    $('.users .slick-slide > div')[userid].outerHTML = card;
    visible[userid] = id;

  }



  var timer = getRandom(3, 8) * 1000;

  setTimeout(function(){
    showUsers(1, visible);
  }, timer);

}
var arrru = new Array ('Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э');
var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e');

function cyrill_to_latin(text){
  for(var i=0; i<arrru.length; i++){
    var reg = new RegExp(arrru[i], "g");
    text = text.replace(reg, arren[i]);
    }
  return text;
}

function newUser(visible){
  var allusers = names.length;

  var user = getRandom(0, allusers);

  while (include(visible,user)){
    user = getRandom(0, allusers);
  }

  var sum = getRandom(100, 600);
  var card = "<div><div class='user testimonial__list-bottom_item'><div class='circle'><img src='img/users/"+user+".jpg' alt='" + names[user] + "' /></div><span>"+ names[user] +"</span><strong>" + sum + "$</strong> <p>только что<br>заработал(а)</p></div></div>";

  if ($('body').hasClass('langde')) {
    var card = "<div><div class='user testimonial__list-bottom_item'><img src='img/users/"+user+".jpg' alt='" + names[user] + "' /><span>"+ names[user] +"</span><strong>" + sum + "$</strong> <p>только что<br>заработал(а)</p></div></div>";
  }

  return [card, user];

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


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

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}



// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);

    var parsed = "<b>"+ (min > 0 ? pad(min, 2) : "00") + "</b>:<b>" + pad(sec, 2) + "</b>:<b>" + hundredths + "</b>";
    return  parsed;
}
