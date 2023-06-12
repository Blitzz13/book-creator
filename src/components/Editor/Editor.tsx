
import { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { DeltaStatic } from 'quill';
import 'react-quill/dist/quill.snow.css';
import IEditorData from '../../interfaces/IEditorData';

export default function Editor({ data, ...delegated }: IEditorData) {
  let quillRef = useRef<ReactQuill>(null);
  let toolbarSettings;

  if (data.modules?.toolbar) {
    toolbarSettings = Object.values(data.modules?.toolbar);
  }

  function getContent(): void {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const content = quill.getContents();
      if (data.onValueChange) {
        data.onValueChange(JSON.stringify(content))
      }

      console.log(content);
    }
  }

  function setContent(): void {
    const quill = quillRef.current?.getEditor();
    if (quill && data.setData) {
      quill.setContents(JSON.parse(data.setData) as unknown as DeltaStatic);
    }
  }

  useEffect(() => {
    setContent();
  });

  return (
    <ReactQuill modules={{
      toolbar: toolbarSettings
    }} ref={quillRef} theme="snow" {...delegated} onChange={getContent} />
  );
}