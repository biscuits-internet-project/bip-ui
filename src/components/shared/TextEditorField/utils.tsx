import React from 'react'

export const renderMark = (props, editor, next) => {
  const { children, mark, attributes } = props
  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underline':
      return <u {...attributes}>{children}</u>
    case 'fontFamily':
      return (
        <span style={{ fontFamily: mark.data.get('fontFamily') }} {...attributes}>
          {children}
        </span>
      )
    case 'fontSize':
      return (
        <span style={{ fontSize: `${mark.data.get('fontSize')}px` }} {...attributes}>
          {children}
        </span>
      )
    default:
      return next()
  }
}

export const renderBlock = (props, editor, next) => {
  const { attributes, children, node } = props

  switch (node.type) {
    case 'leftAlign':
      return (
        <div style={{ textAlign: 'left' }} {...attributes}>
          {children}
        </div>
      )
    case 'centerAlign':
      return (
        <div style={{ textAlign: 'center' }} {...attributes}>
          {children}
        </div>
      )
    case 'rightAlign':
      return (
        <div style={{ textAlign: 'right' }} {...attributes}>
          {children}
        </div>
      )
    case 'justify':
      return (
        <div style={{ textAlign: 'justify' }} {...attributes}>
          {children}
        </div>
      )
    case 'indent':
      return (
        <div style={{ paddingLeft: `${25 * node.data.get('level')}px` }} {...attributes}>
          {children}
        </div>
      )
    default:
      return next()
  }
}

const blockTags = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
}

const markTags = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
}

export const rules = [
  {
    deserialize(el, next) {
      const block = blockTags[el.tagName.toLowerCase()]

      if (block) {
        return {
          object: 'block',
          type: block,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'quote':
            return <blockquote>{children}</blockquote>
          case 'leftAlign':
            return <div style={{ textAlign: 'left' }}>{children}</div>
          case 'centerAlign':
            return <div style={{ textAlign: 'center' }}>{children}</div>
          case 'rightAlign':
            return <div style={{ textAlign: 'right' }}>{children}</div>
          case 'justify':
            return <div style={{ textAlign: 'justify' }}>{children}</div>
          case 'indent':
            return <div style={{ paddingLeft: `${25 * obj.data.get('level')}px` }}>{children}</div>
          case 'unordered-list':
            return <ul>{children}</ul>
          case 'ordered-list':
            return <ol>{children}</ol>
          case 'list-item':
            return <li>{children}</li>
          case 'list-item-child':
            return <>{children}</>
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = markTags[el.tagName.toLowerCase()]

      if (mark) {
        return {
          object: 'mark',
          type: mark,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'underline':
            return <u>{children}</u>
          case 'italic':
            return <em>{children}</em>
          case 'fontSize': {
            const { fontSize } = obj.toJSON().data
            return <span style={{ fontSize: `${fontSize}pt` }}>{children}</span>
          }
          case 'fontFamily': {
            const { fontFamily } = obj.toJSON().data
            return <span style={{ fontFamily }}>{children}</span>
          }
        }
      }
    },
  },
  {
    deserialize(el, next) {
      if (el.tagName === 'SPAN') {
        const styleChange = el.style[0]

        if (styleChange === 'font-size') {
          const size = el.style.fontSize.replace('pt', '')
          return {
            object: 'mark',
            type: 'fontSize',
            data: {
              fontSize: size,
            },
            nodes: next(el.childNodes),
          }
        } else if (styleChange === 'font-family') {
          const { fontFamily } = el.style
          return {
            object: 'mark',
            type: 'fontFamily',
            data: {
              fontFamily,
            },
            nodes: next(el.childNodes),
          }
        }
      }
    },
  },
]
