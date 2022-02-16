(function () {
  'use strict';

  function hoverFormLabel() {
    function float() {
      $(this).parents('.form-group').children('label').addClass('input-focus');
    }
    function unFloat() {
      $(this).parents('.form-group').children('label').removeClass('input-focus');
    }

    $('.form-control').on('focus', float);
    $('.form-control').on('blur', unFloat);

    $('.selectpicker').on('show.bs.select', float);
    $('.selectpicker').on('hide.bs.select', unFloat);
  }

  function setOverviewChart() {
    if ($('#lineChart').length) {
      let ctx = document.getElementById('lineChart').getContext('2d');
      let gradient = ctx.createLinearGradient(0, 0, 600, 0);
      gradient.addColorStop(0, 'rgba(55, 81, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255, 0.1)');
      let lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
          datasets: [{
            data: [10, 15, 10, 15, 20, 22, 25, 28, 25, 30, 28, 20, 25, 30, 35, 40, 35, 35, 30, 38, 40, 38, 30],
            label: 'Today',
            borderColor: '#3751FF',
            backgroundColor: gradient,
          }, {
            data: [20, 28, 30, 25, 15, 30, 32, 35, 38, 35, 20, 15, 18, 25, 30, 35, 35, 32, 25, 25, 30, 25, 15],
            label: 'Yesterday',
            borderColor: '#DFE0EB',
            fill: false
          }
          ],
          borderWidth: 2
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                display: false
              },
              gridLines: {
                drawBorder: false,
              },
            }],
          },
          elements: {
            point: {
              radius: 1
            }
          },
          tooltips: {
            backgroundColor: '#fff',
            xPadding: 12,
            yPadding: 12,
            bodyFontColor: '#252733',
            callbacks: {
              title: function (tooltipItems, data) {
                return '';
              },
              label: function (tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              }
            }
          },
        }
      });
    }
  }

  $(document).ready(function () {
    hoverFormLabel();
    setOverviewChart();
  });
})();


if ($('.scroll-content').length) {
  $('.scroll-content').mCustomScrollbar({
    theme: "dark-3",
    axis: "x" // horizontal scrollbar
  });
}
