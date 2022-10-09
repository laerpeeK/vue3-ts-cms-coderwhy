import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import localCache from '@/utils/cache'

import type {
  IAccountRequest,
  IUserInfoData,
  TUserMenusData
} from '@/service/login/type'
import type { IRootState } from '../types'
import type { ILoginState } from './types'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: IUserInfoData) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: TUserMenusData) {
      state.userMenus = userMenus

      //添加跟userMenus匹配的route
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction(context, payload: IAccountRequest) {
      // 1. 发起登录请求, 获取校验token与用户id
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      context.commit('changeToken', token)
      localCache.setCache('token', token)

      // 2. 请求该用户信息
      const userInfoResult = await requestUserInfoById(id)
      context.commit('changeUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)

      // 3.请求该用户菜单列表
      const userMenusResult = await requestUserMenusById(id)
      context.commit('changeUserMenus', userMenusResult.data)
      localCache.setCache('userMenus', userMenusResult.data)

      // 4.跳到首页
      router.push('/main')

      //5.获取部分/角色权限
      context.dispatch('getInitialDataAction', null, { root: true })
    },
    loginByLocalCache(context) {
      // 根据本地缓存更新vuex login state
      const token = localCache.getCache('token')
      if (token) {
        context.commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo') as unknown as
        | IUserInfoData
        | undefined
      if (userInfo) {
        context.commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus') as unknown as
        | TUserMenusData
        | undefined
      if (userMenus) {
        context.commit('changeUserMenus', userMenus)
      }

      context.dispatch('getInitialDataAction', null, { root: true })
    }
  }
}

export default loginModule
