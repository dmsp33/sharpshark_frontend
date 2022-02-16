function wrapArrow() {
  $('.logo-wrap__arrow').click(function (e) {
    e.preventDefault();

    $(this).closest('.vertical-drop').toggleClass('active');
  })
}

function scrollList() {
  $('.card-scroll').mCustomScrollbar({
    theme: "dark-3",
    axis: "y"
  });

}

function activeTable(){
  console.log("coomin")
  $('#dinamicData').on("click",".table-parent", function (event) {
    console.log("coomin")
    $(this).nextUntil('.table-parent').toggleClass('active');
    $(this).toggleClass('active');
  });
}






