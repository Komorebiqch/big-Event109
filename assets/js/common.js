$(function () {
    // 统一设置ajax请求的统一配置
    $.ajaxPrefilter(function (option) {
        option.url = 'http://www.liulongbin.top:3007' + option.url;
        option.headers = {
            Authorization: localStorage.getItem('token')
        };
    });
});