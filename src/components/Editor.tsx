import { useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";
import { postNote } from "../utils/api";
import { getSessionText, setSessionText } from "../utils/session";
import { UsersDialog } from "./UsersDialog";
import { getCursorPosition, placeCaretAtEnd } from "../utils/dom";

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);

  // initialize the editor
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
      editor.innerText = getSessionText();
      placeCaretAtEnd(editor);
    }
  }, []);

  const handleChange = debounce(() => {
    const editor = editorRef.current as HTMLDivElement;
    const text = editor.innerText;
    setSessionText(text);
    postNote(text);
  }, 1000);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // close on Esc press
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "@") {
      const currentPosition = getCursorPosition();
      if (currentPosition) {
        const { top, left } = currentPosition;
        setPosition({ top: top + 16, left });
        setIsOpen(true);
      }
    }

    // close on back button press and the @ has been removed from last chunk
    if (event.key === "Backspace") {
      const editor = editorRef.current;
      if (editor) {
        const chunks = editor.innerText.split(/\s+/);
        const lastChunk = chunks?.[chunks.length - 1] ?? "";
        if (lastChunk.trim() === "" || !lastChunk.includes("@")) {
          setIsOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", handleChange);
      editor.addEventListener("keyup", handleKeyPress);
    }

    return () => {
      editor?.removeEventListener("input", handleChange);
      editor?.removeEventListener("keyup", handleKeyPress);
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
