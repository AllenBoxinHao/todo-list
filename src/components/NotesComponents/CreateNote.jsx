import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";

export default function CreateNote({ textHandler, saveHandler, inputText }) {
    const charLimit = 100;
    const charLeft = charLimit - inputText.length;
    return (
        <div className="note">
            <textarea
                cols="10"
                rows="5"
                value={inputText}
                placeholder="Type..."
                onChange={textHandler}
                maxLength={charLimit}
            ></textarea>
            <div className="note__footer">
                <span className="label">{charLeft} left</span>
                <button className="note__save" onClick={saveHandler}>
                    Save
                </button>
            </div>
            <LinearProgress className="char__progress" variant="determinate" value={charLeft} />
        </div>
    );
}

CreateNote.propTypes = {
    textHandler: PropTypes.func,
    saveHandler: PropTypes.func,
    inputText: PropTypes.string,
};
