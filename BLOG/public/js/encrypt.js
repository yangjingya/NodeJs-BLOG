const crypto=require('crypto');

module.exports={
    md5:function (str) {
        var sth='HOISHUIHFhhfuihug3t4782%^&%$%&%#49)我们都是千纸鹤拉拉蓝首都华府';
        var obj=crypto.createHash('md5');
        obj.update(str+sth);
        return obj.digest('hex');
      }
}