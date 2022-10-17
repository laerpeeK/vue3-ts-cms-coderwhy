import { createStore, useStore as useVuexStore, Store } from 'vuex'
import type { IRootState, IStoreType } from './types'
import login from './login/login'
import main from './main/main'
import system from './system'
import { getPageListData } from '@/service/main/main'
import { IDeparmentList, IRoleList, IMenuList } from '@/service/main/types'
const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list: IDeparmentList[]) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list: IRoleList[]) {
      state.entireRole = list
    },
    changeEntireMenu(state, list: IMenuList[]) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data

      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    main,
    system
  }
})

// 查看本地是否有登录缓存记录
export function setupStore() {
  store.dispatch('login/loginByLocalCache')
}

// 确保编译时直接调用Store.login不报错
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
