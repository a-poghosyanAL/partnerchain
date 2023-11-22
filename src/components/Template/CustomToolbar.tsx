import { colors } from '../../utils/constants'
import RedoIcon from '../../assets/icons/redo.svg'
import UndoIcon from '../../assets/icons/undo.svg'
import React from 'react'

const formats = [
  {
    className: 'ql-size',
    options: ['small', 'large', 'huge'],
  },
  {
    className: 'ql-align',
    options: ['right', 'center', 'justify'],
  },
  {
    className: 'ql-color',
    options: colors,
  },
  { className: 'ql-bold' },
  { className: 'ql-italic' },
  { className: 'ql-underline' },
  { className: 'ql-strike' },
  {
    className: 'ql-code-block',
  },
  {
    className: 'ql-script',
    value: 'sub',
  },
  {
    className: 'ql-script',
    value: 'super',
  },
  {
    className: 'ql-header',
    value: '1',
  },
  {
    className: 'ql-header',
    value: '2',
  },
  {
    className: 'ql-blockquote',
  },
  {
    className: 'ql-list',
    value: 'ordered',
  },
  {
    className: 'ql-list',
    value: 'bullet',
  },
  {
    className: 'ql-indent',
    value: '-1',
  },
  {
    className: 'ql-indent',
    value: '+1',
  },
  {
    className: 'ql-direction',
    value: 'rtl',
  },
  { className: 'ql-link with-border', },
  { className: 'ql-image' },
  { className: 'ql-video' },
  { className: 'ql-formula' }
]

const renderOptions = (formatData: { className: string; options: string[] }) => {
  const { className, options } = formatData
  return (
    <select key={2} className={className} defaultValue={""}>
      <option value={''}></option>
      {options.map((value, idx) => {
        return <option key={idx} value={value}></option>
      })}
    </select>
  )
}
const renderSingle = (formatData: { className: string; value?: string }) => {
  const { className, value } = formatData
  return <button key={3} className={className} value={value}></button>
}

const CustomToolbar = ({ quillRef }: any) => {
  const handleUndo = () => {
    const myEditor = quillRef?.current?.getEditor()
    return myEditor.history.undo()
  }

  const handleRedo = () => {
    const myEditor = quillRef.current?.getEditor()
    return myEditor.history.redo()
  }

  return (
    <div id='toolbar' className='border-0'>
      <span className='ql-formats'>
        {formats.map((formatData, idx) => {
          return (
            <React.Fragment key={idx}>
              {'options' in formatData && formatData.options
                ? renderOptions(formatData)
                : renderSingle(formatData)}
            </React.Fragment>
          )
        })}
      </span>
      <button className='ql-undo' onClick={handleUndo}>
        <img src={UndoIcon} alt='' />
      </button>
      <button className='ql-redo' onClick={handleRedo}>
        <img src={RedoIcon} alt='' />
      </button>
    </div>
  )
}
export default CustomToolbar
