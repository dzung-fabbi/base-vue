var ctx = document.getElementById('myChart').getContext('2d');
var gradient = ctx.createLinearGradient(0, 0, 0, 1500);
gradient.addColorStop(0, 'rgba(99,164,255, 0.25)')
gradient.addColorStop(0.5, 'rgba(189,217,255, 0.10)');
gradient.addColorStop(1, 'rgba(255,255,255, 0)');
ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 150, 100);

var tooltipsLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [{
            data: [2000, 4000, 5000, 11000, 12000, 35000, 22000, 22000, 35000, 12000, 11000, 5000],
            backgroundColor: [gradient],
            borderColor: [
                '#63A4FF',
            ],
            borderWidth: 4,
            lineTension: .5,
            fill: 'start',
            pointBorderWidth: 0,
        }],
    },
    options: {
        elements: {
            point: {
                hitRadius: 10,
                hoverRadius: 10
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '',
                align: 'start',
                position: 'top',
                fontSizes: 25,
                padding: {
                    top: 10,
                    bottom: 10
                },
            },
            tooltip: {
                callbacks: {
                    labelColor: function (context) {
                        return {
                            borderColor: '#fff',
                            backgroundColor: '#fff',
                            titleColor: 'red',
                            titleFont: {
                                weight: 'bold',
                                titleAlign: 'center',
                                color: 'red'
                            },
                        };
                    },
                    labelPointStyle: function (context) {
                        return {
                            pointStyle: 'triangle',
                            rotation: 0
                        };
                    },
                    label: function (context) {
                        var label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(context.parsed.y) + ' ¥';
                        }
                        return label;
                    },
                    title: function (tooltipItem, data) {
                        return "Tháng: " + tooltipsLabel[tooltipItem[0].dataIndex];
                    },
                    custom: function(tooltip) {
                        if (!tooltip) return;
                        tooltip.displayColors = false;
                    }
                },
                backgroundColor: '#FFF',
                titleColor: '#3C3C43',
                bodyColor: '#000',
                displayColors: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 40000,
                ticks: {
                    stepSize: 10000
                },
                grid: {
                    drawBorder: false,
                }
            }
        },
        bezierCurve: true,
    }
});
