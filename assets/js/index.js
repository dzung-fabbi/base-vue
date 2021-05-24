var ctx = document.getElementById('myChart').getContext('2d');
let data = [7000, 12000, 18000, 14000, 25000, 25000, 32000];

var tooltipsLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 5, 10, 15, 20, 25, 30],
        datasets: [{
            data: data,
            borderColor: [
                '#000000',
            ],
            borderWidth: 1,
            pointRadius: 4,
            pointBackgroundColor: "#fff",
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
                                color: 'red',
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
                    custom: function (tooltip) {
                        if (!tooltip) return;
                        tooltip.displayColors = false;
                    }
                },
                backgroundColor: '#FFF',
                titleColor: '#3C3C43',
                bodyColor: '#000',
                displayColors: true,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 14,
                        family: "Noto Sans JP",
                    }
                },
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 40000,
                ticks: {
                    stepSize: 10000,
                    font: {
                        size: 14,
                        family: "Noto Sans JP",
                    },
                    callback: function (value, index, values) {
                        return Intl.NumberFormat().format(value).replace('.', ',')
                    },
                },
                grid: {
                    drawBorder: false,
                }
            }
        },
        bezierCurve: true,
    }
});
$('.tab-slider--trigger').on('click', function () {
    if ($(this).attr("rel") === "tab1") {
        data = [7000, 12000, 18000, 14000, 25000, 25000, 32000];
    } else if ($(this).attr("rel") === "tab2") {
        data = [2000, 4000, 18000, 5000, 25000, 3000, 32000];
    } else {
        data = [6000, 12000, 35000, 20000, 25000, 17000, 21000];
    }
    myChart.data.datasets[0].data = data;
    myChart.update();
});
