import request from '../utils/request'

/**
 * 登陆/注册 
 */
export const login = (data)=>{
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}

/**
 * 发送短信验证码 
 */
export const sendSms = (mobile)=>{
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/${mobile}`
    })
}

/**
 * 获取用户信息 
 */
export const getUserInfo = ()=>{
    return request({
        method:'GET',
        url:`/app/v1_0/user`
    })
}