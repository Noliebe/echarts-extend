

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
            this.nzAnimationObjArrayMap = {};

            var nzAnimationNameMap = ['setinterval01', 'setinterval02'];

            var echartsInitFun = echarts.init;
            echarts.init = function () {

                // 劫持 init方法
                var echartObj = echartsInitFun.apply(undefined, arguments);

                // 劫持 setOption方法
                var echartsSetOptionFun = echartObj.setOption;
                echartObj.setOption = function () {
                    let option = arguments[0]

                    // 
                    if (option.nzAnimation != undefined) {
                        var amtName = option.nzAnimation.mationName;
                        var amtNameIndex = nzAnimationNameMap.indexOf(amtName);

                        var befFunKey = nzAnimationNameMap[amtNameIndex] + 'Before'
                        _this[befFunKey] == undefined || _this[befFunKey](option)
                        console.log('option', option)

                        if (amtName && amtNameIndex >= 0) {
                            var key = nzAnimationNameMap[amtNameIndex]
                            var a = _this.nzAnimationObjArrayMap;
                            if (a[key] == undefined) {
                                a[key] = [];
                            }
                            // 是否未添加到数组中
                            if(a[key].indexOf(echartObj) < 0){
                                a[key].push(echartObj)
                            }
                        }
                    }
                    return echartsSetOptionFun.apply(echartObj, arguments);
                }

                // 劫持 clear方法
                // echartObj.clear = function(){}

                return echartObj;
            };
            this.setinterval02Before = function (option) {
                // 运行时间
                // var nAwait = option.nzAnimation.await || 0;
                // 等待时间
                var nAwait = option.nzAnimation.await || 0;
                return option = Object.assign(option, {
                    animationDelay: function (idx) {
                        // 越往后的数据延迟越大
                        return nAwait + (idx * 200);
                    },
                    animationDelayUpdate: function (idx) {
                        // 越往后的数据延迟越大
                        return nAwait + (idx * 200);
                    }
                });
            };

            // 展示信息  tooltip显示  高亮
            ; (function () {

                // 显示 高亮方法
                function echartDemonstration(eObj) {
                    var option = eObj.getOption();
                    var nzDataLen = option.nzAnimation.dataLength
                    var key = 'setinterval01'
                    if (eObj.nzEchartsData == undefined) {
                        eObj.nzEchartsData = {}
                    }
                    if (eObj.nzEchartsData[key] != undefined) {
                        eObj.nzEchartsData[key]++;

                        if (eObj.nzEchartsData[key] == nzDataLen) {
                            eObj.nzEchartsData[key] = 0
                        }
                    } else {
                        eObj.nzEchartsData[key] = 0;
                    }


                    eObj.dispatchAction({
                        type: 'downplay'
                    });
                    eObj.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: eObj.nzEchartsData[key]
                    });
                    eObj.dispatchAction({
                        type: "showTip",
                        seriesIndex: 0,
                        dataIndex: eObj.nzEchartsData[key]
                    });
                }
                function playDemonstration() {
                    var arr = _this.nzAnimationObjArrayMap.setinterval01
                    if (arr) {
                        arr.forEach(echartDemonstration);
                    }
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

                    // 
                    eObj.setOption(option)
                }
                function playDemonstration() {
                    var arr = _this.nzAnimationObjArrayMap.setinterval02
                    if (arr.length) {
                        arr.forEach(echartDemonstration);
                    }
                }
                setInterval(playDemonstration, 6000);
            })();

        }

        var nzEchartsObj = new initNzEcharts()

    }
})();