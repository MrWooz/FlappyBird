/**
 * Created by Mr.Woo on 2016/5/10.
 */
//绘制背景相关
(function () {
    window.Background = Class.extend({
        //初始化数据
        init: function (option) {
            option = option || {};
            this.image = option.image;
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width;
            this.height = option.height;
            //绘制总个数
            this.count = parseInt(game.canvas.width/this.width)+1; //加上1防止出现图片加载不到
            this.speed = option.speed || 1;
        },

        //绘制背景
        render: function () {
            for (var i = 0; i < this.count*2; i++) {
               game.ctx.drawImage(this.image,this.x+this.width*i,this.y,this.width,this.height);

            }
        },

        //更新
        update: function () {
            this.x -= this.speed;
            if (this.x <= -this.count*this.width) {
                this.x = 0;
            }
        },

        //暂停
        pause: function () {
            this.speed = 0;
        }
    })
})()