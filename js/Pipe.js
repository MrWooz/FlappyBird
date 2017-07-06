/**
 * Created by Mr.Woo on 2016/5/11.
 */
//创建管道
(function () {
    window.Pipe = Class.extend({
        init: function () {
            //设置管道方向 0在下 1在上
            this.dir = _.random(0,1);
            this.width = 148;
            this.height = _.random(100,(game.canvas.height-48)*0.5);
            this.x = game.canvas.width;
            this.y = this.dir == 0? game.canvas.height-this.height-48 : 0;
            //速度跟地板速度一样
            this.speed = 4;

        },

        //绘制管道
        render: function () {
            if (this.dir == 0) {
                game.ctx.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);

            }else if (this.dir == 1){
                game.ctx.drawImage(game.allImageObj['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },

        //更新
        update: function () {
            this.x -= this.speed;
            //删除离开画布的管道
            if (this.x <= -this.width) {
                game.pipeArr = _.without(game.pipeArr,this);
            };

            //碰撞检测
            //小鸟进入到柱子的范围内
            if (game.bird.x+game.bird.width > this.x && game.bird.x <this.x + this.width) {

                if (this.dir == 0) { //柱子在下
                    if (game.bird.y + game.bird.height > this.y) {
                        game.gameOver();
                    }

                }else if (this.dir == 1) { //柱子在上
                    if (game.bird.y  < this.height) {
                        game.gameOver();
                    }
                }
            }

        },

        pause: function () {
            this.speed = 0;
        }
    })
})()