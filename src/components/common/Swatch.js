import React from 'react'
import reactCSS from 'reactcss'
import { handleFocus } from '../../helpers/interaction'

import Checkboard from './Checkboard'

const ENTER = 13

export const Swatch = ({ color, style, onClick = () => {}, onHover, title = color,
  children, focus, focusStyle = {}, name }) => {
  const transparent = color === 'transparent'
  const divider = color === 'divider'
  const styles = reactCSS({
    default: {
      swatch: {
        background: color,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        ...style,
        ...(focus ? focusStyle : {}),
      },
      divider: {
        background: 'rgba(0,0,0,0.2)',
        height: '100%',
        width: '1px',
        marginLeft: '8px',
      }
    },
  })

  const handleClick = e => onClick(color, e, name)
  const handleKeyDown = e => e.keyCode === ENTER && onClick(color, e, name)
  const handleHover = e => onHover(color, e)

  const optionalEvents = {}
  if (onHover) {
    optionalEvents.onMouseOver = handleHover
  }

  if (divider) {
    return (
        <div style={ styles.divider } />
    )
  }

  return (
    <div
      style={ styles.swatch }
      onClick={ handleClick }
      title={ title }
      tabIndex={ 0 }
      onKeyDown={ handleKeyDown }
      { ...optionalEvents }
    >
      { children }
      { transparent && (
        <Checkboard
          borderRadius={ styles.swatch.borderRadius }
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      ) }
    </div>
  )
}

export default handleFocus(Swatch)
