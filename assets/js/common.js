$(function () {
    // 统一设置ajax请求的统一配置
    $.ajaxPrefilter(function (option) {
        option.url = 'http://www.liulongbin.top:3007' + option.url;
        option.complete = function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = 'login.html';
            }
        };
        option.headers = {
            Authorization: localStorage.getItem('token')
        };
    });
});