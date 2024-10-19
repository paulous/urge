//import { urge_backend } from "../../declarations/urge_backend"
import {useState} from "react";
import {
	AgentProvider,
	ActorProvider,
	CandidAdapterProvider,
	useAuthState
} from "@ic-reactor/react";
import { NoteActorProvider } from "./actorNote"
import Login from "./components/Login"
import Notes from "./components/Notes"

function App() {


	return (
		<AgentProvider withLocalEnv>
			<CandidAdapterProvider>
				{/* <ActorProvider
					withDevtools
					canisterId="ryjl3-tyaaa-aaaaa-aaaba-cai"
					loadingComponent={<div>Loading Icp Ledger...</div>}
					></ActorProvider> */}
				<NoteActorProvider
					canisterId="bd3sg-teaaa-aaaaa-qaaba-cai"
					loadingComponent={<div>Loading Note Actor...</div>}
					//withVisitor={true}
				>
					<Notes />
					<Login />
				</NoteActorProvider>
			</CandidAdapterProvider>
		</AgentProvider>
	);
}

export default App;
