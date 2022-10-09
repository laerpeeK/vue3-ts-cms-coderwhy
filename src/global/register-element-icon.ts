import { App } from 'vue'
import {
  User,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  Refresh,
  Search,
  ArrowDown,
  CircleClose,
  Postcard,
  Edit,
  Delete
} from '@element-plus/icons-vue'
const elementIcons = [
  User,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  Refresh,
  Search,
  ArrowDown,
  CircleClose,
  Postcard,
  Edit,
  Delete
]

export default function (app: App): void {
  for (const elementIcon of elementIcons) {
    app.component(elementIcon.name, elementIcon)
  }
}
