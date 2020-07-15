$(function () {
    function getUserInfo() {
        // 发送GET请求获取用户的基本信息
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {

                // 获取用户名
                var userName = res.data.nickname || res.data.username;

                // 将用户名渲染到标签中
                $('.welcome em').html('欢迎 &nbsp' + userName);

                // 判断用户的头像是否为图片
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic);
                    $('.layui-nav-img').show().siblings('.userportrait').hide();
                } else {
                    $('.layui-nav-img').hide();
                    $('.userportrait').html(userName.substr(0, 1).toUpperCase()).css('display', 'inline-block');
                }

            }
        });
    }

    getUserInfo();

    // 点击退出按钮事件
    $('.logout').click(function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除本地存储的令牌
            localStorage.removeItem('token');
            location.href = 'login.html';
            layer.close(index);
        });
    });
});