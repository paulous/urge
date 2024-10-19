// Balance.tsx
import { useQueryCall } from "../actor"

const Balance = ({ principal }) => {
  const { call, data, loading, error } = useQueryCall({
    functionName: "get_balance",
    args: [principal],
    refetchInterval: 1000,
    refetchOnMount: true,
    onLoading: () => console.log("Loading..."),
    onSuccess: (data) => console.log("Success!", data),
    onError: (error) => console.log("Error!", error),
  })

  return (
    <div>
      <button onClick={call} disabled={loading}>
        {loading ? "Loading..." : "Refresh"}
      </button>
      {loading && <p>Loading...</p>}
      {data && <p>Balance: {data}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}

export default Balance