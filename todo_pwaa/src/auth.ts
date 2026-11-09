import { setAuth } from "./api.ts";
import {clearLocalData, ensureLocalOwner} from "./offline/db.ts";
import { unsubscribePush } from "./push.ts";

/**Guarda la sesion tras login/registro */
export async function startSession(token: string, userId:string) 
{
    localStorage.setItem("token", token);
    setAuth(token);
    await ensureLocalOwner(String(userId));
}

/**cierra sesion : se deja de recibir notis y se borran
los datos locales */

export async function logout() {
    try{
        await unsubscribePush(); //necesita el token, por eso va a borrarlo
    }catch{

    }
    await clearLocalData();
    localStorage.removeItem("token");
    setAuth(null);
    window.location.href = "/";
    
}