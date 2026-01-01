import { useState, useCallback } from 'react';
import type { AppProps } from '@zos-apps/config';
import { useLocalStorage } from '@zos-apps/config';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const defaultContacts: Contact[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '(555) 123-4567', company: 'Acme Inc' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', phone: '(555) 234-5678', company: 'TechCorp' },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', phone: '(555) 345-6789', company: 'StartupXYZ' },
  { id: '4', name: 'David Brown', email: 'david@example.com', phone: '(555) 456-7890', company: 'BigCo' },
];

const Contacts: React.FC<AppProps> = ({ onClose: _onClose }) => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', defaultContacts);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedContact = contacts.find(c => c.id === selected);
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addContact = useCallback(() => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: 'New Contact',
      email: '',
      phone: '',
      company: '',
    };
    setContacts(prev => [...prev, newContact]);
    setSelected(newContact.id);
  }, [setContacts]);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    if (selected === id) setSelected(null);
  }, [selected, setContacts]);

  const updateContact = useCallback((id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, [setContacts]);

  return (
    <div className="h-full flex bg-gray-100">
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b flex gap-2">
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded"
          />
          <button
            onClick={addContact}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {filteredContacts.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left px-4 py-3 border-b flex items-center gap-3 ${selected === c.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {c.name[0]}
              </div>
              <div className="truncate">{c.name}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        {selectedContact ? (
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
                {selectedContact.name[0]}
              </div>
              <div className="flex-1">
                <input
                  value={selectedContact.name}
                  onChange={e => updateContact(selectedContact.id, { name: e.target.value })}
                  className="text-2xl font-bold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full"
                />
                <input
                  value={selectedContact.company}
                  onChange={e => updateContact(selectedContact.id, { company: e.target.value })}
                  placeholder="Company"
                  className="text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase">Email</div>
                <input
                  value={selectedContact.email}
                  onChange={e => updateContact(selectedContact.id, { email: e.target.value })}
                  placeholder="email@example.com"
                  className="text-blue-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full"
                />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Phone</div>
                <input
                  value={selectedContact.phone}
                  onChange={e => updateContact(selectedContact.id, { phone: e.target.value })}
                  placeholder="(555) 000-0000"
                  className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full"
                />
              </div>
              <button
                onClick={() => deleteContact(selectedContact.id)}
                className="mt-6 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Delete Contact
              </button>
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
