$(document).ready(function () {
  $('.glob-links').click(function (e) {
    e.preventDefault();

    $(this).addClass('active');
  });

  $('.toggler-trigger').click(function (e) {
    e.preventDefault();

    $(this).toggleClass('active');
    $(this).closest('.toggler').toggleClass('active')
    $(this).closest('.toggler').find('.toggler__content').stop().slideToggle();
  })


  $('.action-wrap__right button:first-child').click(function (e) {
    e.preventDefault();

    $(this).closest('.action-wrap').find('.action-wrap__left_search').toggleClass('active');
  
})



  // $('.table-parent').click(function (event) {
  //   $(this).nextUntil('.table-parent').toggleClass('active');
  // });

  $('.table-parent').click(function (event) {
    $(this).nextUntil('.table-parent').toggleClass('active');
    $(this).toggleClass('active');
  });

  if ($('#days-range').length) {
    $(document).find("#days-range").each(function (index) {
      console.log(index + ": ");

      var min = $(this).data('min');
      var max = $(this).data('max');
      var dataStart = $(this).data('start');
      noUiSlider.create(this, {
        start: [dataStart],
        tooltips: [true],
        step: 1,
        connect: [true, false],
        range: {
          'min': min,
          'max': max
        },
        pips: {
          mode: 'steps',
          density: 3,
        },
        format: wNumb({
          decimals: 0, // default is 2
          thousand: '.', // thousand delimiter
          postfix: ' days', // gets appended after the number
        })

      });

    });
  }

  if ($('#days-range2').length) {
    $(document).find("#days-range2").each(function (index) {
      console.log(index + ": ");

      var min = $(this).data('min');
      var max = $(this).data('max');
      var dataStart = $(this).data('start');
      noUiSlider.create(this, {
        start: [dataStart],
        tooltips: [true],
        step: 1,
        connect: [true, false],
        range: {
          'min': min,
          'max': max
        },
        pips: {
          mode: 'steps',
          density: 3,
        },
        format: wNumb({
          decimals: 0, // default is 2
          thousand: '.', // thousand delimiter
          postfix: ' docs', // gets appended after the number
        })

      });

    });
  }

  $('.btn-table').click(function (e) {
    e.preventDefault();

    $(this).closest('.table-row').addClass('active');
    $(this).closest('.table-body').addClass('table-disabled');
    $(this).closest('.card').find('.info__item').removeClass('hide');


    $('.card-table-auto').animate({ scrollTop: $('.hide-width').offset().top + "px" }, { duration: 1E3 });
  });

  $('.close').click(function (e) {
    e.preventDefault();

    $(this).closest('body').find('.table-disabled').removeClass('table-disabled')
  })

  // $('input:checkbox').change(function () {
  //   if ($(this).is(":checked")) {
  //     $('.custom-control').addClass("menuitemshow");
  //   } else {
  //     $('.custom-control').removeClass("menuitemshow");
  //   }
  // });

  // $('#customRadio').change(function () {
  //   if ($(this).is(':checked')) {
  //     $('.modal__dropdown').addClass('active');
  //   } else {
  //     $('.modal__dropdown').removeClass('active');
  //   }
  // });
  $('#customRadio').click(function () {
    var targets = $('.modal__dropdown');

    $(this).addClass('is-active');

    if ($(this).is('.is-active')) {
      targets.fadeIn(500);
    } else {
      $(this).closest('.modal-body').find(targets).hide(0);
    }
  });

  $('.custom-checkbox_dis').click(function () {
    var $target = $('#FormControlSelect5');

    $(this).toggleClass('is-active');

    if ($(this).is('.is-active')) {
      $target.removeAttr('disabled');
      $(this).closest('.modal__dropdown').find('.btn.dropdown-toggle').removeClass('disabled');
    } else {
      $(this).closest('.modal__dropdown').find($target).attr('disabled');
    }
  });


  if ($('.select_js').length) {
    $('.select_js').select2({
      width: '100%',
      height: '100%',
      minimumResultsForSearch: -1
    });
  }

  $('.table-left-side').click(function (e) {
    e.preventDefault();

    $(this).closest('.table-content').find('.table-b').toggleClass('active');
    $(this).closest('.table-content').find('.table-b').toggleClass('bord-right');

  });

  $('.table__cirle_glob').click(function (e) {
    e.preventDefault();

    $(this).closest('.table-content').find('.table__item .table__list_bord').toggleClass('active');

    $(this).closest('.table-content').find('.table__item .table-top-left').toggleClass('active');

    $(this).closest('.table-content').find('.table__item .table-top-right').toggleClass('active');

    $('.table__item-leftline').addClass('active')

    $(this).addClass('hide')
  });

  $('.logo-wrap__arrow').click(function (e) {
    e.preventDefault();

    $(this).closest('.vertical-drop').toggleClass('active')

  })

  $('.info-close').click(function (e) {
    e.preventDefault();

    $(this).closest('.info__item').addClass('hide');
  })

  $('.flag-dropdown a').click(function (e) {
    e.preventDefault();

    $(this).closest('.flag-dropdown').toggleClass('active');
    
  })


  $(".popup-navbar a").on("click", (function (e) {
    e.preventDefault();
    var slideIndex = $(this).index();
    console.log(slideIndex);
    $('.popup-slider').slick('slickGoTo', slideIndex, false);
  }));




  if ($('.modal-s-slider').length) {
    $('.modal-s-slider').slick({
      fade: true,
      arrows: false
    });
  }



  $(".modal-s__dots a").on("click", (function (e) {
    e.preventDefault();
    var slideIndex = $(this).index();
    console.log(slideIndex);
    $('.modal-s-slider').slick('slickGoTo', slideIndex, false);
  }));

  $('body').on('click', '.moda-s__next a', function () {
    $(this).closest('.modal-s__container').find('.slick-slider').slick('slickNext');
  });

  $('.modal-s-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.modal-s__dots a').eq(nextSlide).addClass('active').siblings().removeClass('active');
    $('.modal-s__desc').eq(nextSlide).addClass('active').siblings().removeClass('active');
  })

});

$(function ($) {
  $(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $(".pasting__item"); // тут указываем ID элемента
    var div3 = $(".modal__dropdown"); // тут указываем ID элемента
    var div4 = $('.vertical-drop');
    var table = $('.table__item');

    if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
      div.closest('.glob-links').removeClass('active'); // скрываем его
    }
    if (!div3.is(e.target) // если клик был не по нашему блоку
      && div3.has(e.target).length === 0) { // и не по его дочерним элементам
      div3.closest('.modal-body').find('#customRadio').removeClass('is-active'); // скрываем его
      div3.hide(0);
    }

    if (!div4.is(e.target) // если клик был не по нашему блоку
      && div4.has(e.target).length === 0) { // и не по его дочерним элементам
      div4.removeClass('active'); // скрываем его
    }

    if (!table.is(e.target) // если клик был не по нашему блоку
      && table.has(e.target).length === 0) { // и не по его дочерним элементам
      table.removeClass('active'); // скрываем его
      table.find('.table__item-leftline').removeClass('active');
      table.find('.table-top-left').removeClass('active');
      table.find('.table-top-right').removeClass('active');
      table.closest('.table-content').find('.table__cirle_glob').removeClass('hide');
      table.find('.table__list_bord').removeClass('active');
      table.removeClass('bord-right');
    }

  });
});


if ($('.scroll-content').length) {
  $('.scroll-content').mCustomScrollbar({
    theme: "dark-3",
    axis: "x" // horizontal scrollbar
  });
}

if ($('.table-scroll-x').length) {
  $('.table-scroll-x').mCustomScrollbar({
    theme: "dark-3",
    axis: "x" // horizontal scrollbar
  });
}

if ($('.scroll-content-y').length) {
  $('.scroll-content-y').mCustomScrollbar({
    theme: "dark-3",
    axis: "y" // horizontal scrollbar
  });
}

jQuery(function ($) {
  $(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $(".table-content"); // тут указываем ID элемента
    var div3 = $('.vertical-nav');
    if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
      div.closest('.table-content').find('.table-b').removeClass('active'); // скрываем его
      div.closest('.table-content').find('.table-top-left').removeClass('active');
      div.closest('.table-content').find('.table-top-right').removeClass('active');
      div.closest('.table-content').find('.table__item-leftline').removeClass('active');
      div.closest('.table-content').find('.table__cirle_glob').removeClass('hide');
    }
  });

});

