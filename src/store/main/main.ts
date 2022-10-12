import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
  getGoodsCategoryCount,
  getGoodsAddressSale,
  getGoodsCategorySale,
  getGoodsCategoryFavor
} from '@/service/main/main'
import {
  IUserList,
  IPageListQueryInfo,
  IRoleList,
  IGoodList,
  IMenuList,
  IGoodsAddressSale,
  IGoodsCategoryCount,
  IGoodsCategoryFavor,
  IGoodsCategorySale
} from '@/service/main/types'

const mainStateModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      goodsAddressSale: [],
      goodsCategoryCount: [],
      goodsCategoryFavor: [],
      goodsCategorySale: []
    }
  },
  mutations: {
    // system/user
    changeUsersList(state, usersList: IUserList[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },

    // system/role
    changeRoleList(state, roleList: IRoleList[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },

    // product/goods
    changeGoodsList(state, goodsList: IGoodList[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },

    // system/menu
    changeMenuList(state, menuList: IMenuList[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },

    // analysis
    changeCategoryGoodsCount(state, list: IGoodsCategoryCount[]) {
      state.goodsCategoryCount = list
    },
    changeCategoryGoodsSale(state, list: IGoodsCategorySale[]) {
      state.goodsCategorySale = list
    },
    changeCategoryGoodsFavor(state, list: IGoodsCategoryFavor[]) {
      state.goodsCategoryFavor = list
    },
    changeAddressGoodsSale(state, list: IGoodsAddressSale[]) {
      state.goodsAddressSale = list
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
    async getPageListAction(
      context,
      payload: { pageName: string; queryInfo: IPageListQueryInfo }
    ) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      context.commit(`change${changePageName}List`, list)
      context.commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataAction(context, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)

      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction(context, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction(context, payload) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async getDashBoardDataAction(context) {
      const categoryCountResult = await getGoodsCategoryCount()
      context.commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categorySaleResult = await getGoodsCategorySale()
      context.commit('changeCategoryGoodsSale', categorySaleResult.data)
      const categoryFavorResult = await getGoodsCategoryFavor()
      context.commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      const addressSaleResult = await getGoodsAddressSale()
      context.commit('changeAddressGoodsSale', addressSaleResult.data)
    }
  },
  modules: {}
}

export default mainStateModule
