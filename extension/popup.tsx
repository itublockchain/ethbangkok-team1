import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";
import AddPassword from "~pages/addPassword";
import Authentication from "~pages/authentication";
import Passwrods from "~pages/passwords";

import { Storage } from "@plasmohq/storage";
import { useEffect, useState } from "react";

const sessionStorage = new Storage({area: "session"});

export default function IndexPopup () {
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {setisAuthenticated(await sessionStorage.get("salt") ? true : false)})();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/passwords" /> : <Navigate to="authentication" />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/passwords" element={<Passwrods />} />
                <Route path="/add-password" element={<AddPassword />} />
            </Routes>
        </Router>
    );
}