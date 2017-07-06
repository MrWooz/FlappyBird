/**
 * Created by Mr.Woo on 2016/5/10.
 */
(function () {
    window.FrameNumber = Class.extend({
        init: function () {
            //起始的时间
            this.sTime = new Date();
            //起始的帧数
            this.sFrame = 0;
            //当前的总帧数
            this.currentFrame = 0;
            //真实的fps
            this.realFps = 0;

        },

        //获取真实的fps方法（每一帧都要执行）
        render: function () {
            this.currentFrame ++;
            //当前时间
            var currentTime = new Date();
            if (currentTime - this.sTime >= 1000) {
                //得出真实的fps
                this.realFps = this.currentFrame - this.sFrame;
                //更新起始时间
                this.sTime = new Date();
                //更新其实帧数
                this.sFrame = this.currentFrame;
            }
        }
    })
})()