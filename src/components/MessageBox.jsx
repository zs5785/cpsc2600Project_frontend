import '../css/msgbox.css';

function MessageBox(props){
    const {message, isError, onClose} = props;

    return (
        <div className={"container message-box " + (isError ? "error-msg" : "")}>
            <h2>{isError ? "Error" : "Success"}</h2>
            <p>{message}</p>
            <button className="clickable" onClick={onClose}>Close</button>
        </div>
    );
}

export default MessageBox;