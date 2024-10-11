import React, { useState } from "react";
import axios from "axios";
import "./PersonDetail.css"; // Importa el archivo CSS

const PersonDetail = () => {
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [personData, setPersonData] = useState(null);

  const handleChange = (e) => {
    setIdentificationNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8001/api/backend-python/people/${identificationNumber}`
      );
      setPersonData(response.data);
    } catch (error) {
      console.error("Error fetching person data:", error);
      alert("Error fetching person data: " + error.message);
    }
  };

  return (
    <div className="person-detail">
      <h2>Consult Person Information</h2>
      <form className="detail-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Identification Number</label>
          <input
            type="text"
            value={identificationNumber}
            onChange={handleChange}
            placeholder="Enter ID Number"
          />
        </div>
        <button className="submit-button" type="submit">
          Consult
        </button>
      </form>
      {personData && (
        <div className="person-data">
          <h3>Person Details</h3>
          <p>
            <strong>Identification Type:</strong>{" "}
            {personData.tipo_identificacion}
          </p>
          <p>
            <strong>First Name 1:</strong> {personData.nombre1}
          </p>
          <p>
            <strong>First Name 2:</strong> {personData.nombre2}
          </p>
          <p>
            <strong>Last Name 1:</strong> {personData.apellido1}
          </p>
          <p>
            <strong>Last Name 2:</strong> {personData.apellido2}
          </p>
          <p>
            <strong>Gender:</strong> {personData.sexo}
          </p>
          <p>
            <strong>Date of Birth:</strong> {personData.fecha_nacimiento}
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;
