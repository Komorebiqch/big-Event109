$(function () {
    (function () {
        // 发送GET请求获取用户的基本信息
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
            }
        });
    })();
});