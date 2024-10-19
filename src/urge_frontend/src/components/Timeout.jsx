import { useState} from 'react'
import { useInterval } from "./UseInterval"

export const Timeout = ({ likes, timedout, timeout, creation, loadingReg, whoLoad, indx }) => {

	const [percentage, setPercentage] = useState(0.0)
	const [intval, setIntval] = useState(true)

	const calculatePercentage = () => {
		const createMillsecs = Number(creation) / 1_000_000;
		//
		let tonum = Number(timeout) / 1_000_000
		const timeoutMillsecs = likes ? tonum * (likes + 1) : tonum;
		// Calculate percentage based on creationDate, destructionDate, and current time
		const now = new Date();
		const creationTime = new Date(createMillsecs).getTime();
		const destructionTime = new Date(createMillsecs + timeoutMillsecs).getTime();
		const elapsedTime = now.getTime() - creationTime;
		const totalTime = destructionTime - creationTime;
		const percent = (elapsedTime / totalTime) * 100;
		
		setPercentage(percent);
		
		if(percentage >= 100.0){ 
			timedout()
			setPercentage(100.0)
			setIntval(false)
			console.log("percent-->",percentage, "indx-->", indx)
		}
	};

	useInterval(() => {

		calculatePercentage()

	}, intval ? 3000 : null);

	return (
		<>
			<div className="relative flex text-xs stat-title">
				{new Date(Number(String(creation).slice(0, 13))).toLocaleDateString()}{" - "}
				{new Date(Number(String(creation).slice(0, 13))).toLocaleTimeString()}
				<div className="absolute right-0">{percentage.toFixed(2)}%</div>
			</div>
			{ (whoLoad[indx] && loadingReg) || (percentage === 0.0 && !loadingReg)
				? <progress className="progress"/>
				: <progress className={`progress ${percentage > 95 ? "progress-warning" : "progress-primary"} mr-3`} value={percentage} max="100" />
			}
		</>
	)
}
