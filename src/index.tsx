import React, { useState } from 'react';

interface ContactsProps { onClose: () => void; }

const CONTACTS = [
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '(555) 123-4567', company: 'Acme Inc' },
  { name: 'Bob Smith', email: 'bob@example.com', phone: '(555) 234-5678', company: 'TechCorp' },
  { name: 'Carol Williams', email: 'carol@example.com', phone: '(555) 345-6789', company: 'StartupXYZ' },
  { name: 'David Brown', email: 'david@example.com', phone: '(555) 456-7890', company: 'BigCo' },
];

const Contacts: React.FC<ContactsProps> = ({ onClose }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedContact = CONTACTS.find(c => c.name === selected);

  return (
    <div className="h-full flex bg-gray-100">
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b"><input placeholder="Search" className="w-full px-3 py-2 bg-gray-100 rounded" /></div>
        <div className="overflow-auto">
          {CONTACTS.map(c => (
            <button key={c.name} onClick={() => setSelected(c.name)} className={`w-full text-left px-4 py-3 border-b flex items-center gap-3 ${selected === c.name ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">{c.name[0]}</div>
              <div className="truncate">{c.name}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        {selectedContact ? (
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">{selectedContact.name[0]}</div>
              <div><h2 className="text-2xl font-bold">{selectedContact.name}</h2><p className="text-gray-500">{selectedContact.company}</p></div>
            </div>
            <div className="space-y-4">
              <div><div className="text-xs text-gray-500 uppercase">Email</div><div className="text-blue-600">{selectedContact.email}</div></div>
              <div><div className="text-xs text-gray-500 uppercase">Phone</div><div>{selectedContact.phone}</div></div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">Select a contact</div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
