import { useFetch } from "./components/useFetch.js";
import { UserRow } from "./components/UserRow.jsx";
import {useState} from "react";


export function Users() {

    const { data, loading, error } = useFetch( "https://jsonplaceholder.typicode.com/users" );
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);


    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    const list = Array.isArray(data) ? data : [];

    const filtered = list.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Recherche par nom"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table>
                <thead>
                <tr>
                    <td>Nom</td>
                    <td>Email</td>
                    <td>Téléphone</td>
                    <td>Ville</td>
                    <td>Entreprise</td>
                </tr>
                </thead>

                <tbody>
                {filtered.map((user) => (
                    <UserRow key={user.id} user={user} onSelect={setSelectedUser} />
                ))}
                </tbody>
            </table>

            {selectedUser && (
                <div>
                    <h2>Fiche Details</h2>
                    <p>Nom : {selectedUser.name}</p>
                    <p>Email : {selectedUser.email}</p>
                    <p>Telephone : {selectedUser.phone}</p>
                    <p>
                        Adresse  :<br />
                        {selectedUser.address.street}, {selectedUser.address.suite}<br />
                        {selectedUser.address.zipcode}
                    </p>
                    <p>Entreprise : {selectedUser.company.name}</p>
                    <em>{selectedUser.company.catchPhrase}</em>
                    <p>Site : {selectedUser.website}</p>
                </div>
            )}
        </div>
    );

}