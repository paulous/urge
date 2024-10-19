import { useAuthState } from "@ic-reactor/react";

const AddNote = ({callPost, errorPost, setInput, input, message, loadingComment, whoIsLoading}) => {

    const { authenticated } = useAuthState();

    const onInputChange = (event) => {
        const note = event.target.value;

        setInput(note);
    };


    return (
        <div>
            {authenticated && (
                <>
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document.getElementById("add_modal_1").showModal()
                        }
                    >
                        Create Comment
                    </button>
                    <dialog id="add_modal_1" className={`modal`}>
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                make a comment!
                            </h3>
                            <textarea
                                className="textarea textarea-primary textarea-lg w-full"
                                placeholder="what's on your mind?"
                                type="text"
                                value={input}
                                name="note"
                                onChange={onInputChange}
                            ></textarea>
                            <div className="modal-action">
                                <button className={`btn ${input.length > 3 ? "btn-primary" : "btn-disabled"}`} onClick={() => {callPost(); whoIsLoading.current(0)}}>
                                    {loadingComment && <span className="loading loading-spinner"></span>}
                                    Add Comment!
                                </button>
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                                {errorPost && (
                                    <div
                                        role="alert"
                                        className="alert alert-warning"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <span>{message}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </dialog>
                </>
            )}
        </div>
    );
};

export default AddNote;
