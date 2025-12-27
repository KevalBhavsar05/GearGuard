import React, { useState } from 'react';
import AddEquipmentModal from '../components/AddEquipmentModal';
import Navbar from '../components/manager/Navbar';
import EmpFooter from '../components/emp/EmpFooter';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  CpuChipIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

const EquipmentPage = () => {
  // Manual local state instead of database/TanStack Query
  const [equipmentList, setEquipmentList] = useState([
    { _id: '1', name: 'Samsung Monitor 15"', serial_number: 'MT/125/22778837', equipmentCategory: 'Monitors', assigned_to: { name: 'Tejas Modi' }, department_id: { name: 'Admin' }, is_scrapped: false },
    { _id: '2', name: 'Acer Laptop', serial_number: 'MT/122/11112222', equipmentCategory: 'Computers', assigned_to: { name: 'Bhaumik P' }, department_id: { name: 'IT' }, is_scrapped: false }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to add equipment locally
  const handleAddManualEntry = (newData) => {
    const newEntry = {
      ...newData,
      _id: Date.now().toString(), // Generate temporary ID
      is_scrapped: false,
      // Mocking populated objects for the UI
      assigned_to: { name: newData.assigned_to || "Unassigned" },
      department_id: { name: newData.department || "General" }
    };
    setEquipmentList([newEntry, ...equipmentList]);
    setIsModalOpen(false);
  };

  const filteredData = equipmentList.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.serial_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto flex-1 p-4 md:p-8">
        
        {/* --- STATS OVERVIEW CARD --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><CpuChipIcon className="w-6 h-6"/></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Assets</p>
              <h3 className="text-2xl font-bold text-slate-800">{equipmentList.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-xl text-green-600"><CheckCircleIcon className="w-6 h-6"/></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Status</p>
              <h3 className="text-2xl font-bold text-slate-800">{equipmentList.filter(e => !e.is_scrapped).length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><WrenchScrewdriverIcon className="w-6 h-6"/></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Categories</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {new Set(equipmentList.map(e => e.equipmentCategory)).size}
              </h3>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT HEADER --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Equipment Inventory</h2>
              <p className="text-slate-500 text-sm">Manage and track company hardware manually</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <PlusIcon className="w-5 h-5 stroke-2" />
                Add New
              </button>
            </div>
          </div>

          {/* --- TABLE --- */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Asset Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Serial Number</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700">{item.name}</div>
                      <div className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1 font-medium">
                        {item.equipmentCategory}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-600">{item.assigned_to?.name}</div>
                      <div className="text-xs text-slate-400">{item.department_id?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-slate-100 p-1 rounded font-mono text-slate-600 border border-slate-200">
                        {item.serial_number}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.is_scrapped ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.is_scrapped ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        {item.is_scrapped ? 'Scrapped' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AddEquipmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddManualEntry} 
      />

      <EmpFooter />
    </div>
  );
};

export default EquipmentPage;