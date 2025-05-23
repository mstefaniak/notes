import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";
import { postNote } from "../utils/api";
import { getSessionText, setSessionText } from "../utils/session";
import { UsersDialog } from "./UsersDialog";
import { getCursorPosition, placeCaretAtEnd } from "../utils/dom";
import { Note, User } from "../types";

type Props = {
  currentNote: Note | undefined;
  onNoteAdded: (id: number) => void;
};

export const Editor = ({ onNoteAdded }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  // initialize the editor
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
      editor.innerText = getSessionText();
      placeCaretAtEnd(editor);
    }
  }, []);

  const handleChange = useCallback(
    debounce(() => {
      const editor = editorRef.current;
      if (editor) {
        const text = editor.innerText;
        console.log("internally saved");
        setSessionText(text);
      }
    }, 2000),
    []
  );

  const handleKeyPress = (event: KeyboardEvent) => {
    const editor = editorRef.current;
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (alphabet.includes(event.key)) {
      setSearchPhrase((prevState) => `${prevState}${event.key}`);
    }

    if (event.key === "@") {
      const currentPosition = getCursorPosition();
      if (currentPosition) {
        const { top, left } = currentPosition;
        setPosition({ top: top + 18, left });
        setIsOpen(true);
        setSearchPhrase("");
      }
    }

    // close on back button press and the @ has been removed from last chunk
    if (event.key === "Backspace") {
      if (editor) {
        const chunks = editor.innerText.split(/\s+/);
        const lastChunk = chunks?.[chunks.length - 1] ?? "";
        if (lastChunk.trim() === "" || !lastChunk.includes("@")) {
          setIsOpen(false);
        }
      }

      setSearchPhrase((prevState) => prevState.slice(0, -1));
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keyup", handleChange);
      editor.addEventListener("keyup", handleKeyPress);
    }

    return () => {
      editor?.removeEventListener("keyup", handleChange);
      editor?.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleChange]);

  const handleUserClick = (user: User) => {
    const editor = editorRef.current;
    if (editor) {
      editor.innerHTML = editor.innerHTML.replace(
        `@${searchPhrase}`,
        `<a href="https//google.com/${user.username}">${user.first_name} ${user.last_name}</a>`
      );
      setSearchPhrase("");
      setIsOpen(false);
    }
  };

  const sendNote = async () => {
    const editor = editorRef.current;
    if (editor) {
      const noteId = await postNote(editor.innerText);
      onNoteAdded(noteId);
      editor.innerText = "";
    }
  };

  return (
    <>
      <div className="editor" contentEditable ref={editorRef} />
      <button className="sendButton" onClick={sendNote}>
        Send
      </button>
      <UsersDialog
        isOpen={isOpen}
        onClick={handleUserClick}
        position={position}
        searchPhrase={searchPhrase}
      />
    </>
  );
};
