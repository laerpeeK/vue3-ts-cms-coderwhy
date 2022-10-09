import { App } from 'vue'
import registerDateFormat from './register-date-format'
export default function directivesRegister(app: App) {
  registerDateFormat(app)
}
