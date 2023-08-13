import { Component } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export class DefaultHeaders  extends Component{
    private auth = useAuthContext();

    public AUTH_HEADERS_CONTENT = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.auth.user?.token}`
    };
}