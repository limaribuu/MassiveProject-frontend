import React, { useState } from 'react';

const AddDestinationButton = ({ onAdd }) => {
    const [showForm, setShowForm] = useState(false);
    const [newDestination, setNewDestination] = useState({
        name: '',
        ticketPrice: 0,
        operationalHours: '',
        location: '',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDestination((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (newDestination.name && newDestination.ticketPrice) {
            onAdd(newDestination);
            setNewDestination({
                name: '',
                ticketPrice: 0,
                operationalHours: '',
                location: '',
                image: ''
            });
            setShowForm(false);
        }
    };

    return (
        <div>
            <button
                className="bg-orange-500 text-white p-3 rounded-full"
                onClick={() => setShowForm(!showForm)}
            >
                +
            </button>
            {showForm && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nama Destinasi"
                        value={newDestination.name}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <input
                        type="number"
                        name="ticketPrice"
                        placeholder="Harga Tiket"
                        value={newDestination.ticketPrice}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <input
                        type="text"
                        name="operationalHours"
                        placeholder="Jam Operasional"
                        value={newDestination.operationalHours}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Lokasi"
                        value={newDestination.location}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="URL Gambar"
                        value={newDestination.image}
                        onChange={handleInputChange}
                        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <button
                        className="bg-orange-500 text-white p-2 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Tambah Destinasi
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddDestinationButton;
