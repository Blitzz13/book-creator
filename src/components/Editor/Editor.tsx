
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IEditorData from '../../interfaces/IEditorData';
import { DeltaStatic } from 'quill';

export default function Editor({ data, ...delegated }: IEditorData) {
  const [value, setValue] = useState('');
  let quillRef = useRef<ReactQuill>(null);
  let test;

  if (data.modules?.toolbar) {
    test = Object.values(data.modules?.toolbar);
  }

  function saveContent(): void {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const asd = [
        {
          "insert": "\n"
        },
        {
          "insert": {
            "video": "https://www.youtube.com/embed/ub12DkmRUnI?showinfo=0"
          }
        },
        {
          "insert": "\n"
        }
      ]

      // const asdas = new Delta(asd);
      quill.setContents(asd as unknown as DeltaStatic);

      const test = quill.getContents();
      console.log(test);
    }
  }

  // window.addEventListener("load", () => {
  //   const exists = $("#editor-container");
  //   if (!exists.children().length) {
  //     quill = new Quill('#editor-container', {
  //       modules: {
  //         toolbar: [
  //           ['bold', 'italic'],
  //           ['link', 'blockquote', 'code-block', 'image'],
  //           [{ list: 'ordered' }, { list: 'bullet' }]
  //         ]
  //       },
  //       placeholder: 'Compose an epic...',
  //       theme: 'snow',
  //     });
  //   }
  // })


  // asd()
  // var quill = new Quill('#editor-container', {
  //     modules: {
  //       toolbar: [
  //         ['bold', 'italic'],
  //         ['link', 'blockquote', 'code-block', 'image'],
  //         [{ list: 'ordered' }, { list: 'bullet' }]
  //       ]
  //     },
  //     placeholder: 'Compose an epic...',
  //     theme: 'snow',
  //   });


  //   function test(): DeltaStatic {
  //     return quill.getContents()
  //   }

  return (
    <ReactQuill modules={{
      toolbar: test
    }} ref={quillRef} theme="snow" {...delegated} value={value} onChange={setValue} />
  );
}