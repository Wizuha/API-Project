import { useState } from "react";
import "./App.css";

function App() {
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");
  const [content, setContent] = useState("");
  const [number, setNumber] = useState("");
  const [object, setObject] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    let form = {
      lastname: lastname,
      firstname: firstname,
      address: address,
      mail: mail,
      number: number,
      content: content,
      object: object,
    };
    e.preventDefault();
    async function fetchData() {
      fetch(`http://localhost:3000/content-pdf`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.blob())
        .then((data) => {
          console.log(data);
          setData(window.URL.createObjectURL(data));
        });
      // const data = await response.blob();
      // console.log(data)
    }
    fetchData();
  };
  return (
    <div className="all">
      <div className="pdf">
        <iframe
          src={data}
          width="500px"
          height="800px"
          frameborder="0"
        ></iframe>
      </div>
      <div className="formulaire">
        <form onSubmit={handleSubmit}>
          <h1>Créer ta lettre de motivation</h1>
          <div className="content">
             <label htmlFor="lastname">Nom</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Nom"
            value={lastname}
          />
          <label htmlFor="firstname">Prénom</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
            value={firstname}
          />
          <label htmlFor="address">Adresse</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="address"
            id="address"
            placeholder="Adresse"
            value={address}
          />
          <label htmlFor="mail">Adresse Email</label>
          <input
            onChange={(e) => setMail(e.target.value)}
            type="text"
            name="mail"
            id="mail"
            placeholder="Email"
            value={mail}
          />
          <label htmlFor="number">Numéro</label>
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            name="number"
            id="number"
            placeholder="Numéro"
            value={number}
          />
          <label htmlFor="object">Objet</label>
          <input
            onChange={(e) => setObject(e.target.value)}
            type="text"
            name="object"
            id="object"
            placeholder="Objet"
            value={object}
          />
          <label htmlFor="content">Contenu de la lettre</label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            id="content"
            placeholder="Ecrivez votre lettre..."
            value={content}
          />
          <input type="submit" />
          </div>
         
        </form>
      </div>
    </div>
  );
}

export default App;
