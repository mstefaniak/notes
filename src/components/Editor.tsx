import { useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";
import { postNote } from "../utils/api";
import { getSessionText, setSessionText } from "../utils/session";
import { UsersDialog } from "./UsersDialog";

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
      editor.innerText = getSessionText();
    }
  }, []);

  const handleChange = debounce(() => {
    const editor = editorRef.current as HTMLDivElement;
    const text = editor.innerText;
    setSessionText(text);
    postNote(text);
  }, 1000);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.querySelectorAll("div")[0].focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        // close on Esc press
        if (e.key === "Escape") {
          setIsOpen(false);
        }

        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          // TODO: implement navigation through the list
        }
      };
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyDown = (e: Event) => {
    const event = e as KeyboardEvent;
    if (event.key === "@") {
      // get the current position of the cursor
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const currentPosition = range?.getBoundingClientRect();
      if (currentPosition) {
        setPosition(currentPosition);
        setIsOpen(true);

        // focus first element
        const firstElement = dialogRef.current?.querySelector("div");
        if (firstElement) {
          firstElement.focus();
        }
      }
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", handleChange);
      editor.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      editor?.removeEventListener("input", handleChange);
      editor?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleChange]);

  return (
    <>
      <div className="editor" contentEditable ref={editorRef} />
      <UsersDialog
        ref={dialogRef}
        isOpen={isOpen}
        position={position}
        searchPhrase=""
      />
    </>
  );
};
