import type { RouteRecordRaw } from 'vue-router'
import type { TUserMenusData, IMenu } from '@/service/login/type'
interface Ibreadcrumbs {
  name: string
  path?: string
}

// firstMenu 匹配到的第一个菜单选项
let firstMenu: IMenu | undefined

/**
 * 匹配前后端菜单数据,输出最终在前端渲染的菜单列表
 * @param userMenus 后端返回菜单数据
 * @return
 */
export function mapMenusToRoutes(userMenus: TUserMenusData): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('@/router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('@/router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据后端返回的菜单数据,动态获取需要添加的routes
  const _recurseGetRoute = (menus: TUserMenusData) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
          firstMenu = firstMenu ? firstMenu : menu
        }
      } else if (menu.type === 1) {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

/**
 * 返回与当前页面路径匹配的菜单项
 * @param userMenus 后端返回菜单数据
 * @param currentPath 当前页面路径
 * @param breadcrumbs 面包屑数据数组, 不传时单纯匹配页面路径
 * @returns
 */
export function pathMapToMenu(
  userMenus: TUserMenusData,
  currentPath: string,
  breadcrumbs?: Ibreadcrumbs[]
): IMenu | undefined {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2) {
      if (menu.url === currentPath) {
        return menu
      }
    }
  }
}

/**
 * @userMenus 后端返回菜单数据
 * @currentPath 当前页面路径
 * @returns 返回面包屑数据数组
 */
export function pathMapBreadCrumbs(
  userMenus: TUserMenusData,
  currentPath: string
) {
  const breadcrumbs: Ibreadcrumbs[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

/**
 * 返回当前用户权限
 * @param userMenus 后端返回菜单数据
 * @returns
 */
export function mapMenusToPermissions(userMenus: TUserMenusData) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: TUserMenusData) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission!)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

/**
 * 返回菜单列表id集合
 * @param menuList  后端返回菜单数据
 * @returns
 */
export function menuMapLeafKeys(menuList: TUserMenusData) {
  const leafKeys: number[] = []
  const _recurseGetLeaf = (menuList: TUserMenusData) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}
export { firstMenu }
