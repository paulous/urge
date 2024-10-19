import {useEffect, useRef, useState} from "react";

export default function Toast({toast}) {

	let [toastUp, setToastUp] = useState("")
	let timeout = useRef(null)

	useEffect(() => {

		setToastUp(toast)

		timeout.current = setTimeout(() => {
			setToastUp("")
		}, 5000);

		return () => {
			timeout.current && clearTimeout(timeout.current)
		}

		}, [toast])
	
    return (
		<>
        { toastUp && <div className={`toast`} >
            <div className={`alert alert-info animate-jiggle`}>
                <span>{toastUp}</span>
            </div>
        </div>}
		</>
    );
}
