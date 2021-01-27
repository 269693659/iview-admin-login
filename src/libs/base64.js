import { Base64 } from 'js-base64'

export const encode = (data) => {
  return Base64.encode(data)
}

export const decode = (data) => {
  return Base64.decode(data)
}
