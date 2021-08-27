; (function () {

    var data1 = [111, 111, 111, 111, 111];
    var data2 = [400, 126, 211, 122, 133];

    var myEchartObj = echarts.init(document.getElementById('myEchartNode'));
    var option = {
        backgroundColor:"#333",
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                color: '#666',//字体颜色
                fontSize: 12
            }
        },
        legend: {
            data: ['预算', '支出'],
            itemWidth: 8,
            itemHeight: 8,
            left: "center",
            bottom: "5%",
            textStyle: {
                color: '#b0caee',//字体颜色
                fontSize: 12
            }
        },
        grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ["2017", "2018", "2019", "2020", "2021"],
            axisLabel: {
                textStyle: {
                    color: '#b0caee',//坐标值得具体的颜色
                    fontSize: 12
                },
                interval: 0,
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type: 'dotted',
                    color: '#355e7e'
                }
            },
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                textStyle: {
                    color: '#b0caee',//坐标值得具体的颜色
                    fontSize: 12
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#4d5f93'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#4d5f93',
                }
            }
        },
        series: [
            {
                name: '预算',
                type: 'bar',
                barCategoryGap: '60%',
                itemStyle: {
                    normal: {
                        color: '#54eaeb',
                    }

                },
                data: data1
                // data: dataY1
            },
            {
                name: '支出',
                type: 'bar',
                barCategoryGap: '60%',
                itemStyle: {
                    normal: {
                        color: '#27e786',
                    }
                },
                data: data2
                // data: dataY2
            }
        ],
        animationDelay: function (idx) {
            // 越往后的数据延迟越大
            return idx * 200;
        },
        animationDelayUpdate: function (idx) {
            // 越往后的数据延迟越大
            return idx * 200;
        }
    };

    option.nzData = data2;
    option.nzSetintervalAnimation_01 = true;
    myEchartObj.setOption(option);
})();