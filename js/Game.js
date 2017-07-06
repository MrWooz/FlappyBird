/**
 * Created by Mr.Woo on 2016/5/10.
 */
(function () {
    window.Game = Class.extend({
        init : function (option) {
            option = option || {};
            var self = this;
            this.fps = option.fps || 60;
            //实例化帧工具
            this.frameNumber = new FrameNumber;

            this.canvas = document.getElementById(option.canvasId);
            this.ctx = this.canvas.getContext('2d');

            //实例化加载图片工具
            this.loadSource = new LoadSource;
            //用来保存回调获得所有数据
            this.allImageObj = {};
            this.loadSource.loadImages('r.json',function (allImageObj,imageCount,loadImageCount) {
                if (imageCount == loadImageCount) {
                    self.allImageObj = allImageObj;
                    self.run();
                }

            });

            // 记录游戏是否运行
            this.isRun = true;

            //用于记录分数
            this.number = 0;
        },

        //运行游戏
        run: function () {
            var self = this;
            this.timer = setInterval(function () {
                self.runLoop();
            },self.fps);

            //创建房子
            this.fangzi = new Background({
                image: this.allImageObj['fangzi'],
                width: 300,
                height: 256,
                y: this.canvas.height - 256 - 100,
                speed : 2
            });
            //创建树
            this.shu = new Background({
                image: this.allImageObj['shu'],
                width: 300,
                height: 216,
                y: this.canvas.height - 216 - 50,
                speed : 3
            });
            //创建地板
            this.diban = new Background({
                image: this.allImageObj['diban'],
                width: 48,
                height: 48,
                y: this.canvas.height - 48,
                speed : 4
            })

            //创建一个管道数组
            this.pipeArr = [new Pipe];

            this.bird = new Bird();
        },

        //游戏循环
        runLoop: function () {
            //清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            //获得真实的fps
            this.frameNumber.render();
            //绘制真实的fps和总fps
            this.ctx.fillText('FPS/'+ this.frameNumber.realFps,15,15);
            this.ctx.fillText('FNO/'+ this.frameNumber.currentFrame,15,30);
            this.ctx.fillText('Number/'+ this.number,15,45);

            //绘制房子及更新
            this.fangzi.update();
            this.fangzi.render();


            //绘制树及更新
            this.shu.update();
            this.shu.render();


            //绘制地板及更新
            this.diban.update();
            this.diban.render();


            //每100帧创建一个管道
            if (this.isRun && this.frameNumber.currentFrame %100 == 0){
                //每过100帧分数加1
                this.number ++;

                this.pipeArr.push(new Pipe);
            }
            //最好分开遍历数组，才不会出现获不到管道而出现报错现象
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();

            };
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].render()

            }

            this.bird.update();
            this.bird.render();
        },

        //游戏暂停
        pause: function () {
            clearInterval(this.timer);
        },

        //游戏结合
        gameOver: function () {

            this.isRun = false;
            //暂停所有东西
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();

            };
            //当前小鸟的状态为死亡
            game.bird.die = true;
        }
    })
})()