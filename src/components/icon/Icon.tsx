import Image from 'next/image'

interface IconProps {
  type: 'show' | 'hide'
  alt?: string
  [x: string]: any
}

const showPassword = '/auth/eye-open.svg'
const hidePassword = '/auth/eye-closed.svg'

export default function Icon({
  type,
  alt = '',
  width = 24,
  height = 24,
  ...restProps
}: IconProps) {
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

  return (
    <Image src={src} alt={alt} width={width} height={height} {...restProps} />
  )
}
