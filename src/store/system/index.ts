import { Module } from 'vuex'
import { IRootState } from '../types'
import { TSystemState, IDepartmentState } from './types'
import { IListQuery } from '@/service/system/type'
import {
  getDepartMentList,
  deleteSystemData,
  createSystemData,
  editSystemData
} from '@/service/system'
const systemState: Module<TSystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    changeDepartment(state, payload: IDepartmentState) {
      state.departmentList = payload.departmentList
      state.departmentCount = payload.departmentCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as Record<string, any>)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as Record<string, any>)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageUrl = `/${payload.pageName}/list`
      const queryInfo: IListQuery = payload.queryInfo
      const result = await (await getDepartMentList(pageUrl, queryInfo)).data
      commit('changeDepartment', {
        departmentList: result.list,
        departmentCount: result.totalCount
      })
    },

    async deletePageDataAction({ dispatch }, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deleteSystemData(pageUrl)

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createSystemData(pageUrl, newData)

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editSystemData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemState
