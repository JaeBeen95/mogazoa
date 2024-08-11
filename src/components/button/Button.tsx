import classNames from 'classnames'
import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  backgroundColor?: string
  textColor?: string
  width?: string
  [x: string]: any
}

export default function Button({
  type = 'button',
  variant = 'primary',
  backgroundColor,
  width,
  ...restProps
}: ButtonProps) {
  const composeStyle = classNames(styles.button, styles[variant])

  const style = {
    backgroundColor,
    width,
  }

  return (
    <button className={composeStyle} type={type} style={style} {...restProps} />
  )
}
