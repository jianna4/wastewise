import {createContext, useContext ,useState} from 'react';
const AuthContext = createContext();//creating acontext object

export function AuthProvider({children}){
    const [auth,setAuth]= useState(()=>{
        const token = localStorage.getItem('access'); //checks for access token
        return token? {token} : null; //if token is avilable,return if ,if not stay null
    });
    const login = (token) =>{
        localStorage.setItem('access', token);//sets the token and savs it
        setAuth({token});
    };
    const logout = ()=>{
        localStorage.removeItem('access');
        setAuth(null);
    };
    return(
        <AuthContext.Provider value={{auth, login ,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);