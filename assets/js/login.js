$(function () {

    // ------------------输入框获得/失去焦点------------------
    // 输入框获得焦点事件
    $('.layui-form input').focus(function () {
        // 获取当前输入框placeholder的内容
        let content = $(this).attr('placeholder');
        // 清楚输入框的placeholder
        $(this).attr('placeholder', '');
        // 输入框是去焦点事件
        $(this).blur(function () {
            // 将该输入框的placeholder内容重新输出在输入框上
            $(this).attr('placeholder', content);
        });
    });

    // ------------------a链接点击切换------------------
    // a链接注册点击事件
    $('.link').on('click', '#reglink', function () {
        $(this).parents('.link').hide().siblings('.link').show();
    });

    // ------------------注册表单提交------------------
    // 表单提交事件
    $('.register').on('submit', 'form', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // 获取用户输入的内容
        let data = $(this).serialize();
        // 发起POST请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                console.log(res);
                // 提示注册是否成功的消息
                layer.msg(res.message);
                if (!res.status) {
                    // 如果注册成功,隐藏注册盒子显示登陆盒子
                    $('.login').show().next().hide();
                }
            }
        });
    });

    // ------------------登陆表单提交------------------
    $('.login form').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // 获取用户输入的账号密码
        let data = $(this).serialize();
        // 发起POST请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: data,
            success: function (res) {
                // 提示登录是否成功的消息
                layer.msg(res.message);
                if (res.status) {
                    return '用户名或密码有误';
                }
                // 保存header值
                localStorage.setItem('token', res.token);
                window.setTimeout(function () {
                    // 登录成功跳转页面
                    location.href = 'index.html';
                }, 2000);
            }
        });
    });

    // ------------------表单验证------------------
    (function () {
        let form = layui.form;
        form.verify({
            user: function (val) {
                // 正则表达式
                // 用户名不能为空格感叹号问号
                let reg = /^[^\s!?]{0,12}$/;
                if (!reg.test(val)) {
                    return '输入的用户名不符合规范';
                }
            },

            pwd: function (val) {
                // 密码必须大于6位小于12位并且不能为空格
                let reg = /^\S{6,12}$/;
                if (!reg.test(val)) {
                    return '密码必须大于6位小于12位并且不能为空格';
                }
            },

            same: function (val) {
                let pwd = $('.register input[name=password]').val();
                if (pwd !== val) {
                    return '两次密码不一致';
                }
            }
        });
    })();
});