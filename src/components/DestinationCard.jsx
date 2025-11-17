// src/components/DestinationCard.jsx
import React from 'react';

const DestinationCard = ({ image, name, ticketPrice, operationalHours, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-80">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
      <div className="mt-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">Estimasi Biaya: <span className="font-semibold">Rp {ticketPrice}</span></p>
        <p className="text-sm text-gray-600">Jam Operasional: {operationalHours}</p>
        <p className="text-sm text-gray-600">Lokasi: {location}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
