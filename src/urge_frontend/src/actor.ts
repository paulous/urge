// actor.ts
import { canisterId, idlFactory, urge_backend } from "../../declarations/urge_backend"
import { createReactor } from "@ic-reactor/react"

type Actor = typeof urge_backend

export const { useActorStore, useAuth, useQueryCall } = createReactor<Actor>({
  canisterId,
  idlFactory,
  host: "https://localhost:4943",
})