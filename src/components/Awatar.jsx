import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AvatarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");
    useEffect(() => {
        async function load() {
            const res = await fetch(`/api/profile?id=${id}`);
            const data = await res.json();
            const p = data.response.players[0];
            setAvatar(p.avatarfull);
        }
        load();
    }, [id]);
    return (
        <div style={{
            textAlign: "center",
            paddingTop: "50px",
            color: "white"
        }}>
            <h1>Pełny avatar</h1>
            {avatar ? (
                <img 
                    src={avatar} 
                    alt="avatar" 
                    style={{ borderRadius: "10px", width: "512px" }}
                />
            ) : (
                <p>Ładowanie...</p>
            )}
            <button 
                onClick={() => navigate(-1)}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "18px",
                    cursor: "pointer",
                    borderRadius: "10px"
                }}
            >
                Powrót
            </button>
        </div>
    );
}