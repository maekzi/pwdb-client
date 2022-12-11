import { useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useField } from "formik";


/**
 * ToDo: TD-SLATE - Input Component
 * Implements a Slate Editor within a Formik input and Chakra UI Styling
 */
const RichTextEditor = ({...props}) => {
  const [editor] = useState(() => withReact(createEditor()))
  const [field, meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue } = helpers;

  // @ts-ignore
  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'link':
        return (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        )
      default:
        return <p {...attributes}>{children}</p>
    }
  }, []);

  return (
    <Slate
      {...field}
      {...props}
      editor={editor}
      value={value}
      onChange={v => setValue(v)}
    >
      <Editable renderElement={renderElement} />
    </Slate>
  )
}

export default RichTextEditor;