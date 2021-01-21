$(function () {
    // 去注册账号
    $("#link_reg").on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 去登陆账号
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui 中获取form对象
    var form = layui.form
    var layer = layui.layer

    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //   校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码的内容
            // 还需要拿到密码框的内容 
            // 然后判断
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致！'
            }
        }
    })
    $("#form_reg").on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name = username]').val(), password: $('#form_reg [name = password]').val()
        }
        $.post("/api/reguser",
            data
            , function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
            }

        )
    })
    // 监听登录表单的提事件
    $("#form_login").submit(function (e) {
        e.preventDefault()
        // console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: "/api/login",
            // 获取用户输入的值
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = 'index.html'
            }
        })
    })

})