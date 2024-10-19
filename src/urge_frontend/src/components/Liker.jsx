import { Success } from "./Success";
const Liker = ({
    disabled,
    calllike,
    hash,
    liked,
    message,
    loadingLike,
    loadingReg,
    indx,
    whoLoad,
    whoIsLoading,
}) => {
    //const callReg = useNoteVisitMethod('register')
    //const name = useNoteActorStore(state => state.methodState.register);
	
    return (
        <div className="flex justify-center content-center">
            {/* {whoLoad[indx] && !disabled && !loadingLike && !loadingReg && !message && <Success />} */}
            <button
                className={`btn btn-primary ${
                    (disabled ||
                        liked ||
                        (loadingLike && whoLoad[indx]) ||
                        (loadingReg && whoLoad[indx] ) ||
                        (message && whoLoad[indx] ) ||
                        whoLoad[indx]) &&
                    "btn-disabled"
                }`}
                onClick={(e) => {
                    if(!loadingLike && !loadingReg){
                        whoIsLoading(indx);
                        calllike([hash]);
                    }
                }}
            >
                {(loadingLike || loadingReg) && whoLoad[indx] && (
                    <span className="loading loading-spinner"></span>
                )}
                {liked
                    ? disabled
                        ? "My Comment"
                        : "Liked"
                    : whoLoad[indx] && message 
                        ? message
                        : "Like"
                }

            </button>
        </div>
    );
};

export default Liker;
