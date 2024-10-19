import { useState, useRef } from "react";
import { useAuthState } from "@ic-reactor/react";
import { useNoteQueryCall, useNoteUpdateCall } from "../actorNote";
import Liker from "./Liker";
import Register from "./Register";
import AddNote from "./AddNote";
import Toast from "./Toast";
import { Success } from "./Success";
import { Timeout } from "./Timeout";

const Notes = () => {
	const { authenticated } = useAuthState();
	const [input, setInput] = useState("");
	const [message, setMessage] = useState("");
	const [whoLoad, setWhoLoad] = useState([]);
	const [toast, setToast] = useState("");

	let whoIsLoading = useRef(null);

	let waitTime = (time) =>
		setTimeout(() => {
			setMessage("");
			whoIsLoading.current(null);
		}, time);

	let likeResponse = (okErr) => {
		if ("ok" in okErr) {
			setToast("Liked Comment!"); //BAD
			callComments();
			callTreasure();
			callReg();
		} else if ("err" in okErr) {
			//'AnonNotAllowed' in okErr.err ? setLikeBtn('Anon not allowed') : {};
			//'AlreadyLiked' in okErr.err ? setLikeBtn('Already liked') : {};
			if ("TimeRemaining" in okErr.err) {

				setToast(
					`Wait for: ${Math.round(
						Number(okErr.err.TimeRemaining) / 10 ** 9
					)} seconds and try again. `
				);
				setMessage(() => {
					waitTime(
						(Number(okErr.err.TimeRemaining) / 10 ** 9) * 1000
					);

					return (
						"Wait " +
						Math.round(
							Number(okErr.err.TimeRemaining) / 10 ** 9
						) +
						" seconds"
					);
				})
			};
		}

		//console.log(" Like Success!",  name[Object.keys(name)].data.likes)
	};

	const { call: callLike, loading: loadingLike } = useNoteUpdateCall({
		functionName: "likeComment",
		//args: [hash.current ? hash.current : 0],
		onSuccess: (okerr) => likeResponse(okerr),
		//onLoading: () => console.log("Like Loading...", loadingLike),
		onError: (okerr) => likeResponse(okerr),
	});

	let notePostResponse = (okErr) => {
		if ("ok" in okErr) {
			callComments();
			callReg();
			callTreasure();
			setToast(`Comment: "${input}" Has been added.`);
			setInput("");
			document.getElementById("add_modal_1").close();
		} else if ("err" in okErr) {
			// "AnonNotAllowed" in okErr.err
			//     ? setMessage("Anon not allowed!")
			//     : {};
			// "InvalidComment" in okErr.err
			//     ? setMessage("Comment must be between 3 and 200 characters")
			//     : {};
			"TimeRemaining" in okErr.err
				? setMessage(() => {
					waitTime(
						(Number(okErr.err.TimeRemaining) / 10 ** 9) * 1000
					);

					return (
						"Wait " +
						Math.round(
							Number(okErr.err.TimeRemaining) / 10 ** 9
						) +
						" secs"
					);
				})
				: {};
			visible = true;
		}
	};

	const {
		call: callPost,
		error: errorPost,
		loading: loadingComment,
	} = useNoteUpdateCall({
		functionName: "postComment",
		args: [input],
		onSuccess: (okErr) => notePostResponse(okErr),
		//onLoading: () => console.log("Like Loading...", loadingComment),
		//onError: (error) => console.log("Like Error!", error),
	});

	const {
		data: dataComments,
		call: callComments,
		error,
	} = useNoteQueryCall({
		functionName: "latestComments",
	});

	const { data: dataTreasure, call: callTreasure } = useNoteQueryCall({
		functionName: "tokenTreasury",
	});

	const {
		data: dataReg,
		call: callReg,
		loading: loadingReg,
	} = useNoteQueryCall({
		functionName: "register",
		refetchOnMount: authenticated,
	});

	whoIsLoading.current = (indx) =>
		setWhoLoad(dataComments.map((_, i) => (i === indx ? true : false)));

	let timedout = () => {
		callComments()
		authenticated && callReg()//not done yet!!! cant register not logged in
	}

	return (
		<>
			<Register {...{ dataTreasure, dataReg }} />
			<AddNote
				{...{
					callPost,
					errorPost,
					setInput,
					input,
					message,
					loadingComment,
					whoIsLoading,
				}}
			/>
			<div className="inline-flex flex-wrap content-evenly w-full">
				{dataComments?.map((v, i) => (
					<div key={i} className="card bg-base-100 w-96 shadow-xl">
						<div className="card-body">
							<h2 className="card-title">
								<div className="flex justify-center content-center origin-center">
									🪙
									{whoLoad[i] && !loadingLike && !message && (
										<Success />
									)}
								</div>
								{Number(v.reward)}
							</h2>
							{v.comment}
							<div className="card-actions justify-end">
								{authenticated && (
									<Liker
										calllike={callLike}
										hash={v.hash}
										disabled={
											String(v.userId) ===
											"User" + Number(dataReg?.id)
										}
										liked={dataReg?.likes.some(
											(liked) => liked === v.hash
										)}
										message={message}
										indx={i}
										loadingLike={loadingLike}
										loadingReg={loadingReg}
										whoLoad={whoLoad}
										whoIsLoading={whoIsLoading.current}
									/>
								)}
							</div>
							<Timeout
								likes={Number(v.reward)}
								timedout={timedout}
								timeout={v.timeout}
								creation={v.created}
								loadingReg={loadingReg}
								indx={i}
								whoLoad={whoLoad}
							/>
						</div>
					</div>
				))}
			</div>
			<Toast {...{ toast }} />
		</>
	);
};

export default Notes;
