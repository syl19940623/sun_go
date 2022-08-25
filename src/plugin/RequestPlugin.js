import {
  get,
  post
} from '../network/request'

export default {
  install: Vue => {
    Vue.mixin({
      methods: {
        $get(url, params, headers) {
          return get(url, params, headers)
        },
        $post(url, data, headres) {
          return post(url, data, headres)
        }
      }
    })
  }
}