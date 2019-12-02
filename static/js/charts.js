google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let data = google.visualization.arrayToDataTable([
        ['2019-11-01', 20, 28, 38, 45],
        ['2019-11-02', 31, 38, 55, 66],
        ['2019-11-03', 50, 55, 77, 80],
        ['2019-11-04', 77, 77, 66, 50],
        ['2019-11-05', 68, 66, 22, 15]
      // Treat first row as data as well.
    ], true);

    let options = {
        legend:'none'
    };

    let chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}
