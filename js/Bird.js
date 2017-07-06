/**
 * Created by Mr.Woo on 2016/5/11.
 */
//创建鸟
(function () {
    window.Bird = Class.extend({
        init: function () {
            this.width = 85;
            this.height = 60;
            this.x = (game.canvas.width - this.width)*0.5;
            this.y = 100;

            //设置一个wing值用来改变翅膀状态 0 1 2
            this.wing = 0;

            //下落的增量
            this.dy = 0;
            //下落开始的帧数
            this.dropFrame = game.frameNumber.currentFrame;
            //下落的角度
            this.rotateAngle = 0;
            //设置小鸟的状态 0下落 1上升
            this.state = 0;
            //绑定点击事件
            this.bindClick();
            //空气阻力
            this.deletY = 1;

            //记录小鸟的死亡状态
            this.die = false;
            //小鸟死亡索引
            this.dieIndex = 0;


        },

        render: function () {
            //小鸟死，绘制鲜血
            if (this.die == true) {
                //裁剪热血的宽高
                var sWidth = 1625/5;
                var sHeight = 828 /6;

                //求出行号和列号
                var row = parseInt( this.dieIndex / 5);
                var col = this.dieIndex%5;

                game.ctx.drawImage(game.allImageObj['blood'],col*sWidth,row*sHeight,sWidth,sHeight,this.x-100,this.y,sWidth,sHeight);

                //绘制游戏结束文字图片
                var gameoverX = (game.canvas.width - 626)*0.5;
                var gameoverY = (game.canvas.height - 144)*0.5;
                game.ctx.drawImage(game.allImageObj['gameover'],gameoverX,gameoverY);


                return; //小鸟死亡后面代码不执行
            }

            game.ctx.save();
            game.ctx.translate(this.x + this.width*0.5,this.y + this.height*0.5);
            game.ctx.rotate(this.rotateAngle* Math.PI/180);
            //复位
            game.ctx.translate(-(this.x + this.width*0.5),-(this.y + this.height*0.5));
            game.ctx.drawImage(game.allImageObj['bird'],this.wing*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.ctx.restore();



        },

        update: function () {
            //更新鲜血的索引号
            if (this.die == true) {
                this.dieIndex ++ ;
                if (this.dieIndex >=30) {
                    game.pause();
                }
            }
            //更新翅膀变化
            if (game.frameNumber.currentFrame %5 ==0) {
                this.wing ++;
                this.wing = this.wing%2;
            }

            if (this.state == 0) { //下落的状态
                //更新下落状态
                this.dy = 0.02*Math.pow(game.frameNumber.currentFrame-this.dropFrame,2);
                this.rotateAngle++;

            }else if (this.state == 1){ //上升的状态

                //阻力越来越大
                this.deletY ++ ;
                //向上的冲力在减小
                this.dy = -15 + this.deletY;

                if (this.dy >= 0 ) { //改变为下落状态
                    this.state = 0;
                    //重新更新下落帧数
                    this.dropFrame = game.frameNumber.currentFrame;
                }
            }

            this.y += this.dy;

            //封锁小鸟上空
            if (this.y <=0) {
                this.y = 0;
            };

            //小鸟碰到地板游戏结束
            if (this.y >= game.canvas.height - this.height -48) {
                game.gameOver();
            }


        },

        bindClick: function () {
            var self = this;
            game.canvas.onmousedown = function () {
                self.state = 1;
                self.rotateAngle = -25;
                //重新复位阻力
                self.deletY = 1;
            }
        }
    })
})()