import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/StronaUzyt.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Header from "./Header";
import Status from "./Status";
export default function Stronauzyt() {
	const { id } = useParams();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	async function resolveID(value) {
		const isSteamID64 = /^[0-9]{17}$/.test(value);
		if (isSteamID64) return value;
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/resolve?name=${value}`);
		const data = await res.json();
		if (data.response.success === 1) {
			return data.response.steamid;
		}
		throw new Error("Nie znaleziono profilu o takiej nazwie.");
	}
	async function fetchProfile(steamId) {
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/profile?id=${steamId}`);
		const data = await res.json();
		const p = data.response.players[0];
		if (!p) throw new Error("Nie udało się pobrać danych tego użytkownika.");
		return {
			steamId,
			name: p.personaname,
			rname: p.realname,
			avatar: p.avatarfull,
			created: p.timecreated
				? new Date(p.timecreated * 1000).toLocaleDateString()
				: "Brak danych",
			status: p.personastate,
			gameinfo: p.gameextrainfo,
			country: p.loccountrycode,
			comm: p.commentpermision,
		};
	}
	useEffect(() => {
		async function load() {
			setLoading(true);
			setError("");
			try {
				const steamId = await resolveID(id);
				const profileData = await fetchProfile(steamId);
				setProfile(profileData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [id]);
	const navigate = useNavigate();
	return (
		<div className="container">
			<Header naglowek="Profil użytkownika"/>
			{loading && <p>Ładowanie...</p>}
			{error && <p className="error">{error}</p>}
			{profile && (
				<div className="user-card">
					<img className="avatar" src={profile.avatar} alt="avatar" />
					<Button onClick={() => navigate(`/avatar/${profile.steamId}`)}>
  						Pokaż pełny avatar
			</Button>
						<div className="info">
						<h2>{profile.name}</h2>
						<h2>Prawdziwe imie: {profile.rname || "Nie podano"}</h2>
						<p>
							<strong>Kraj pochodzenia: </strong> {profile.country}
						</p>
						<p>
							<strong>Data założenia konta:</strong> {profile.created}
						</p>
						<p>
							<strong>Aktualnie gra w :</strong> {profile.gameinfo || "Nic"}
						</p>
						<p>
							<strong>Status: </strong> <Status status={profile.status}/>
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
