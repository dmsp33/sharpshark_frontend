function reportCertificate() {
$('a.trig').on('click', function () {
    var elementClick = $(this).attr("href");
    var elementArr = elementClick.split("#");

    destination = $("#" + elementArr[1]).offset().top;

    $("html, body").animate({ scrollTop: destination }, 1100);

    return false;
  });
}