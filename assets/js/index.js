$(function () {
    getUserInfo()

    var layer = layui.layer
    // 点击头像  实现退出功能
    1
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = 'login.html'

            // 关闭 confirm 询问框
            layer.close(index)

        })
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(res);
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // // 不论成功还是失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2, 强制跳转到登录页面
        //         location.href = 'login.html'
        //     }
        // }

    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //   3 渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        // 首字母大写
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}