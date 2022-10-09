import { App } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function (app: App) {
  app.directive('date-format', {
    mounted(el, bindings) {
      const textContent: string = el.textContent
      const formatRule: string = bindings.value
      el.textContent = dayjs.utc(textContent).utcOffset(8).format(formatRule)
    }
  })
}
