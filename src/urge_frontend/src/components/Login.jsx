import {useState} from "react"
import { useAuth } from "@ic-reactor/react";
import Toast from "./Toast";

const Login = () => {

    const [toast, setToast] = useState(``)
    let toaster = (txt) => {
        setToast(txt)
    }
    const {
        login,
        logout,
        loginLoading,
        loginError,
        identity,
        authenticating,
        authenticated,
    } = useAuth({
        // onAuthentication(authPromise) {
        //     toaster("🪙 ~ onAuthentication ~ Authenticating...");
        //     authPromise()
        //         .then((identity) => {
        //             toaster(
        //                 "🪙 ~ onAuthentication ~ Authenticated as:",
        //                 identity.getPrincipal().toText()
        //             );
        //         })
        //         .catch((error) => {
        //             toaster("🪙 ~ onAuthentication ~ error:", error);
        //         });
        // },
        onLogin(loginPromise) {
            //toaster(`🪙 ~ onLogin ~ Logging in...`);
            loginPromise()
                .then((principal) => {
                    toaster(
                        `🪙 ~ onLogin ~ Logged in as:,
                        ${principal.toText()}`
                    );

                })
                .catch((error) => {
                    toaster("🪙 ~ onLogin ~ error:", error);
                });
        },
        onLoggedOut() {
            toaster("🪙 ~ onLoggedOut ~ Logged out!");
        },
        // onAuthenticationSuccess(identity) {
        //     toaster(
        //         "🪙 ~ onAuthenticationSuccess ~ identity:",
        //         identity.getPrincipal().toText()
        //     );

        //    // handleSubmit(identity)
        // },
        // onAuthenticationFailure(error) {
        //     toaster("🪙 ~ onAuthenticationFailure ~ error:", error);
        // },
        // onLoginError(error) {
        //     toaster("🪙 ~ onLoginError ~ error:", error);
        // },
        // onLoginSuccess(principal) {
        //     toaster(
        //         "🪙 ~ onLoginSuccess ~ Logged in as:",
        //         principal.toText()
        //     );
        // },
    });

    return (
        <>
            <div className="absolute right-1 top-1">
                {authenticated 
                    ? (
                        <div>
                            <button  className="btn" onClick={() => logout()}>Logout</button>
                        </div>
                    ) 
                    : (
                        <div>
                            <button  className="btn btn-primary" onClick={() =>
                                    login({
                                        identityProvider: process.env.DFX_NETWORK === 'ic'
                                        ? 'https://identity.ic0.app/#authorize'
                                        : `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/`,			
                                    })
                                }
                                disabled={authenticating}
                                >
                                Login
                            </button>
                        </div>
                )}
            </div>
			<Toast {...{toast}}/>
        </>
    );
};

export default Login;
