import { notification } from 'ant-design-vue'

export default function modalNotification(value) {
  notification[value.type]({
    message: value.message,
    description: value?.description
  })
}
