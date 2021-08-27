

/**
 * echart 扩展 数据展示
 * author 子山
 * 使用案例
 * option.nzData = [52,60,88,92];
 * option.nzSetintervalAnimation_01 = true;
 * myChart.init(我是dom);
 * myChart.setOption(option );
 */
; (function () {
    if (echarts != undefined) {
        function initNzEcharts() {
            var _this = this;
            // this.echartObjArray = [];
            this.nzSetintervalAnimationObj_01_array = [];
            this.nzSetintervalAnimationObj_02_array = [];

            var echartsInitFun = echarts.init;
            echarts.init = function () {

                // 劫持 init方法
                var echartObj = echartsInitFun.apply(undefined, arguments);

                // 劫持 setOption方法
                var echartsSetOptionFun = echartObj.setOption;
                echartObj.setOption = function () {
                    let option = arguments[0]

                    if (echartObj.id) {
                        echartObj
                    }
                    // if (_this.echartObjArray.indexOf(echartObj)) {
                    //     _this.echartObjArray.push(echartObj)
                    //     console.log("🚀 ~ file: common.js ~ line 176 ~ initNzEcharts ~ _this.echartObjArray", _this.echartObjArray)
                    // }
                    if (option.nzSetintervalAnimation_01 && _this.nzSetintervalAnimationObj_01_array.indexOf(echartObj)) {
                        _this.nzSetintervalAnimationObj_01_array.push(echartObj)
                    }
                    if (option.nzSetintervalAnimation_02 && _this.nzSetintervalAnimationObj_02_array.indexOf(echartObj)) {
                        _this.nzSetintervalAnimationObj_02_array.push(echartObj)
                    }
                    return echartsSetOptionFun.apply(echartObj, arguments);
                }

                // 劫持 clear方法
                // echartObj.clear = function(){}

                // _this.echartObjArray.push(echartObj)
                return echartObj;
            }

                // 展示信息  tooltip显示  高亮
                ; (function () {

                    // 显示 高亮方法
                    function echartDemonstration(eObj) {
                        var option = eObj.getOption();
                        var indexKey = 'echartDemonstrationIndex'
                        if (eObj[indexKey] != undefined) {

                            eObj[indexKey]++;

                            if (option.nzData != undefined && eObj[indexKey] == option.nzData.length) {
                                eObj[indexKey] = 0
                            }
                        } else {
                            eObj[indexKey] = 0;
                        }

                        eObj.dispatchAction({
                            type: 'downplay'
                        });
                        eObj.dispatchAction({
                            type: "highlight",
                            seriesIndex: 0,
                            dataIndex: eObj[indexKey]
                        });
                        eObj.dispatchAction({
                            type: "showTip",
                            seriesIndex: 0,
                            dataIndex: eObj[indexKey]
                        });
                    }
                    function playDemonstration() {
                        _this.nzSetintervalAnimationObj_01_array.forEach(echartDemonstration);
                    }
                    // playDemonstration()
                    // setTimeout(playDemonstration, 10);
                    setInterval(playDemonstration, 2400);
                })();

            // 为了播放加载动画从新渲染echart (为了看花要从新种花，就菜的离谱。哪个大佬知道echarts怎么直接重新播放初始化动画)
            ; (function () {

                // 重新渲染 方法
                function echartDemonstration(eObj) {
                    var option = eObj.getOption();
                    eObj.clear();
                    eObj.setOption(option);
                }
                function playDemonstration() {
                    _this.nzSetintervalAnimationObj_02_array.forEach(echartDemonstration);
                }
                setTimeout(playDemonstration, 10);
                setInterval(playDemonstration, 6000);
            })();

        }

        var nzEchartsObj = new initNzEcharts()

    }
})();