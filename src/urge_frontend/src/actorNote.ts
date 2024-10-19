import { createActorContext } from "@ic-reactor/react"
import { urge_backend, idlFactory } from "../../declarations/urge_backend"

export type Backend = typeof urge_backend

export const {
  ActorProvider: NoteActorProvider,
  useQueryCall: useNoteQueryCall,
  useUpdateCall: useNoteUpdateCall,
  useActorStore: useNoteActorStore,
  useVisitMethod:useNoteVisitMethod,
  useMethod:useNoteMethod
} = createActorContext<Backend>({
  idlFactory,
})