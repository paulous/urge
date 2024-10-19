//import { jsonToString } from "@ic-reactor/react/dist/utils"
import { useAuthState } from "@ic-reactor/react";

const Register = ({dataTreasure, dataReg}) => {

	const { authenticated, identity} = useAuthState();

	let likeTime = Number(String(dataReg?.lastLike).slice(0,13))
	let postTime = Number(String(dataReg?.lastPost).slice(0,13))

	return (<> {
		authenticated
		? <div className="stats shadow">
			<div className="stat">
				<div className="stat-title">Treasury</div>
				<div className="stat-value">🪙{Number(dataTreasure)}</div>
			</div>
			<div className="stat">
				<div className="stat-title">Last Like: {new Date(likeTime).toDateString()}</div>
				<div className="stat-title">Last Post: {new Date(postTime).toDateString()}</div>
			</div>
			<div className="stat max-w-md">
				<div className="stat-title">Id {dataReg?.id && Number(dataReg?.id)}</div>
				<div className="stat-value">Principal</div>
				<div className="stat-title text-wrap">{identity.getPrincipal().toText()}</div>
			</div>
			<div className="stat">
				<div className="stat-title">Wallet</div>
				<div className="stat-value">🪙{dataReg?.id && Number(dataReg?.balance)}</div>
			</div>
		</div>
		: <div className="stats shadow">
		<div className="stat">
			<div className="stat-title">Treasury</div>
			<div className="stat-value">🪙{Number(dataTreasure)}</div>
		</div>
	</div>
	}</>
	)
}

export default Register