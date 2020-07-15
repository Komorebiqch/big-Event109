$(function () {
    $.ajaxPrefilter(function (option) {
        option.url = 'http://www.liulongbin.top:3007' + option.url;
        option.headers = localStorage.getItem('token');
    });
});