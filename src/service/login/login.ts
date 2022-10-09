import axRequest from '../index'
import { IDataType } from '../types'
import {
  IAccountRequest,
  ILoginData,
  IUserInfoData,
  TUserMenusData
} from './type'

/**
 *  完整拼接方式
 *  AccountLogin {{baseURL}}/login
 *  LoginUserInfo  {{baseURL}}/users/{{id}}
 *  UserMenus {{baseURL}}/role/{{id}}//menu
 */
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccountRequest) {
  return axRequest.post<IDataType<ILoginData>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return axRequest.get<IDataType<IUserInfoData>>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusById(id: number) {
  return axRequest.get<IDataType<TUserMenusData>>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
