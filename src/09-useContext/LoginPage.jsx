import { useContext } from "react"
import { UserContext } from "./context/UserContext";

export const LoginPage = () => {

  const { user, setUser } = useContext(UserContext);

    return (
      <>
      <h1>LoginPage</h1>
      <hr />
      <pre aria-label="pre">
        {JSON.stringify( user, null, 3 )}
      </pre>
      <button 
      onClick={() => setUser({id:123, name:'Jose', email:'pepito123@google.com'})} 
      className="btn btn-primary">
        Establecer Usuario
      </button>
      </>
    )
  }
  