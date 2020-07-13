$(function () {

    // -----------------------------------------
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

    // -----------------------------------------
    // a链接注册点击事件
    $('.link').on('click', '#reglink', function () {
        $(this).parents('.link').hide().siblings('.link').show();
    });

    // -----------------------------------------
    // 表单提交事件
    $('.link').on('submit', 'form', function (e) {
        // 阻止默认事件
        e.preventDefault();
    });
});