import { useStore } from '@/store'
/**
 * 返回当前菜单是否具有某个操作的权限
 * @param pageName 页面名
 * @param handleName 操作名
 * @returns
 */
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return !!permissions.find((item) => item === verifyPermission)
}
