import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AddEquipmentModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    serial_number: '',
    equipmentCategory: '',
    purchase_date: '',
    location: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-slide-in">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
              <h2 className="text-xl font-bold">Register New Equipment</h2>
              <button onClick={onClose} className="p-1 hover:bg-blue-500 rounded-md">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Equipment Name</label>
                <input 
                  type="text" required
                  className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Serial Number</label>
                  <input 
                    type="text" required
                    className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, equipmentCategory: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Computers">Computers</option>
                    <option value="Machinery">Machinery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Purchase Date</label>
                <input 
                  type="date"
                  className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                <input 
                  type="text"
                  placeholder="e.g. Floor 2, Room 204"
                  className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </form>

            {/* Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
              >
                Save Equipment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEquipmentModal;