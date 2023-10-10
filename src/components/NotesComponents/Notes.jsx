import { useEffect, useState } from "react";
import Note from "./Note";
import { v4 as uuid } from "uuid";
import CreateNote from "./CreateNote";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState("true");

    const textHandler = (e) => {
        setInputText(e.target.value);
    };

    // add new note to the notes state
    const saveHandler = () => {
        setNotes((prevState) => [...prevState, { id: uuid(), text: inputText }]);
        setInputText("");
    };

    const deleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        setNotes(filteredNotes);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (Array.isArray(data) && data.length > 0) {
            setNotes(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem("Notes", JSON.stringify(notes));
        }
    }, [notes, loading]);

    if (loading) {
        return <div className="text">Loading ...</div>;
    }

    return (
        <div>
            <div className="notes">
                {notes.length &&
                    notes.map((note) => <Note key={note.id} note={note} deleteNote={deleteNote} />)}
                <CreateNote
                    textHandler={textHandler}
                    saveHandler={saveHandler}
                    inputText={inputText}
                />
            </div>
        </div>
    );
}
