import React, { useRef, useEffect } from 'react';
import tinymce from 'tinymce/tinymce';

// Import the specific theme you want (e.g., modern or classic)
import 'tinymce/themes/silver';

// Import plugins you need (e.g., autosave, link, image, lists)
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';

const TinyMCEEditor = ({ initialValue, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    tinymce.init({
      selector: `#${editorRef.current.id}`,
      plugins: 'autosave link image lists',
      toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      autosave_ask_before_unload: false,
      setup: (editor) => {
        editor.on('change', () => {
          const content = editor.getContent();
          onChange(content);
        });
      },
    });

    return () => {
      tinymce.remove(`#${editorRef.current.id}`);
    };
  }, [onChange]);

  useEffect(() => {
    tinymce.activeEditor.setContent(initialValue);
  }, [initialValue]);

  return <div ref={editorRef} id={`editor-${Math.random().toString(36).substr(2, 10)}`} />;
};

export default TinyMCEEditor;
