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

    // ------------------表单提交------------------
    // 表单提交事件
    $('.link').on('submit', '.register', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // 获取用户输入的内容
        let data = $(this).serialize();
        $.ajaxPrefilter(function (option) {
            option.url = 'http://ajax.frontend.itheima.net' + option.url;
            option.headers = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYwMywidXNlcm5hbWUiOiJ5b2xvIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE1OTQ2NDk3MDAsImV4cCI6MTU5NDY4NTcwMH0.M0DqV6mcUbr2RIVQg5j1UyO1Iqs8dzyGPkCZdzzJdoE';
        });
        // 发起POST请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function (res) {
                console.log(res);
                // 提示登录是否成功的消息
                layer.msg(res.message);
            }
        });
    });

    // ------------------表单验证------------------
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
            let pwd = $('input[name=password]').val();
            if (pwd != val) {
                return '两次密码不一致';
            }
        }
    });
});