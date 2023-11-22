import { useRef, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import './template.css';
import CustomToolbar from './CustomToolbar'
import DefaultHtml from './DefaultTemplate'

const BlockEmbed = Quill.import('blots/block/embed');
const Block = Quill.import('blots/block');

Block.tagName = "DIV";

class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

Quill.register(Block, true);
Quill.register(DividerBlot, true);

const EmailTemplate = () => {
  const [text, setText] = useState(DefaultHtml())

  function handleChange(value: string) {
    setText(value)
  }

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: true,
    },
  }

  const quillRef = useRef<ReactQuill | null>(null)

  return (
    <div className='border bg-white pb-20'>
      <div className='h-[50px] w-full border-b pl-4'>
        <span className='roboto text-sm font-medium leading-[50px] text-dark-grey'>
          Design E-mail Template
        </span>
      </div>
      <div className='w-max border-r border-b'>
        <CustomToolbar quillRef={quillRef} />
        <ReactQuill ref={quillRef} value={text} onChange={handleChange} modules={modules} />
      </div>
      <div className='flex gap-4 pt-4 pl-4'>
        <button className='flex h-[40px] w-[85px] items-center justify-center rounded bg-light-blue text-sm leading-5 text-white'>
          Preview
        </button>
        <button className='flex h-[40px] w-[67px] items-center justify-center rounded bg-green-120 text-sm leading-5 text-white'>
          Save
        </button>
      </div>
    </div>
  )
}

export default EmailTemplate
