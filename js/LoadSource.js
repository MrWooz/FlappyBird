/**
 * Created by Mr.Woo on 2016/5/10.
 */
//加载本地图片
(function () {
    window.LoadSource = Class.extend({
        init: function () {
            //所有的dom对象
            this.allImageObj = {};
        },

        loadImages: function (jsonUrl,callback) {
            var self = this;
            //创建对象
            var xhr = new XMLHttpRequest();
            //Ajax 三步走
            xhr.open('get',jsonUrl);
            xhr.send();
            xhr.onreadystatechange = function () { //判断是否请求成功
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //设置起始加载图片个数
                    var loadImagesCount = 0;
                    //获取请求数据
                    var responseText = xhr.responseText;
                    //转换json数据为对象
                    var responseJson = JSON.parse(responseText);
                    //设置数组
                    var dataArr = responseJson.images;
                    for (var i = 0; i < dataArr.length; i++) {
                        //创建图片dom对象
                        var img = new Image;
                        img.src = dataArr[i].src;
                        img.index = i;
                        img.onload = function () {
                            loadImagesCount ++;
                            //保存对象
                            var key = dataArr[this.index].name;
                            self.allImageObj[key] = this; //this是指图片img

                            callback(self.allImageObj,dataArr.length,loadImagesCount);
                        }

                    }
                }
            }
        }
    })
})()