
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
// import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor(data: any) {
  const [value, setValue] = useState('');
  let quillRef = useRef({});
  // const asd: ReactQuill;
  // function sda(): void {
  //   setValue("awdhauwh auhd iauwd uhawudh auwhd uahwd uawd hauwhd auwdh iuahwd uahwdu awudh auwhd uawdh uahwd uawhud ads");
  // };

  // function saveContent(): void {
  //   const quill = (quillRef.current as Quill).getEditor();
  //   const test = quill.getContents();
  //   console.log(test);
  // }

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
    <ReactQuill ref={quillRef} theme="snow" id="editor-container" {...data} value={value} onChange={setValue} />
  );
}