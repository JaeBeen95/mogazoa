import Image from 'next/image'

import showPassword from '@/assets/eye-open.svg'
import hidePassword from '@/assets/eye-closed.svg'

interface IconProps {
  type: 'show' | 'hide'
  alt?: string
  [x: string]: any
}

export default function Icon({ type, alt = '', ...restProps }: IconProps) {
  let src = ''

  switch (type) {
    case 'show':
      src = showPassword
      break
    case 'hide':
      src = hidePassword
      break
    default:
      throw new Error('지원하는 아이콘 타입이 존재하지 않습니다.')
  }

  return <Image src={src} alt={alt} {...restProps} />
}
