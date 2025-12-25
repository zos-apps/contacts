import React, { useState } from 'react';
import type { AppProps } from './types';

export interface Contact {
  id: string;
  name: string;
  subtitle?: string;
  avatar?: string | React.ReactNode;
  color?: string;
  platform?: string;
  url?: string;
  isPrimary?: boolean;
}

export interface ContactProfile {
  fullName: string;
  title?: string;
  tagline?: string;
  email?: string;
  website?: string;
  location?: string;
  bio?: string;
  roles?: Array<{ title: string; company: string; description?: string; icon?: string }>;
  socials?: Record<string, { platform: string; handle: string; url: string; color: string }>;
}

export interface ContactsConfig {
  contacts?: Contact[];
  profile?: ContactProfile;
}

const ZContacts: React.FC<AppProps & { config?: ContactsConfig }> = ({ className, config }) => {
  const [selectedContact, setSelectedContact] = useState<string>('main');
  const [searchQuery, setSearchQuery] = useState('');

  const defaultContacts: Contact[] = [
    { id: 'main', name: 'My Card', subtitle: 'Primary Contact', color: 'from-purple-500 to-pink-500', isPrimary: true },
    { id: 'work', name: 'Work', subtitle: 'Professional', color: 'from-blue-500 to-cyan-500', platform: 'linkedin' },
    { id: 'social', name: 'Social', subtitle: 'Social Media', color: 'from-pink-500 to-orange-500', platform: 'twitter' },
  ];

  const contacts = config?.contacts || defaultContacts;

  const defaultProfile: ContactProfile = {
    fullName: 'Your Name',
    title: 'Your Title',
    tagline: 'Your tagline',
    email: 'email@example.com',
    website: 'https://example.com',
    location: 'Your Location',
    bio: 'Your bio goes here.',
    roles: [
      { title: 'Position', company: 'Company', description: 'What you do', icon: '💼' },
    ],
    socials: {},
  };

  const profile = config?.profile || defaultProfile;

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentContact = contacts.find(c => c.id === selectedContact);

  const renderAvatar = (contact: Contact, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-8 h-8 text-sm';
    if (typeof contact.avatar === 'string') {
      return (
        <div className={`${sizeClass} rounded-full bg-gradient-to-br ${contact.color || 'from-gray-500 to-gray-700'} flex items-center justify-center text-white font-medium`}>
          {contact.avatar}
        </div>
      );
    }
    if (contact.avatar) {
      return contact.avatar;
    }
    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-br ${contact.color || 'from-gray-500 to-gray-700'} flex items-center justify-center text-white font-medium`}>
        {contact.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className={`flex h-full bg-transparent overflow-hidden ${className || ''}`}>
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-black/20">
        {/* Search */}
        <div className="p-3 border-b border-white/10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="px-4 py-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">All Contacts</span>
            <span className="text-white/40 text-xs">{contacts.length}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors outline-none ${
                selectedContact === contact.id ? 'bg-blue-500/30' : 'hover:bg-white/5'
              }`}
            >
              {renderAvatar(contact)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 truncate">{contact.name}</p>
                {contact.subtitle && <p className="text-white/50 text-xs truncate">{contact.subtitle}</p>}
              </div>
              {contact.isPrimary && (
                <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Add Contact */}
        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white text-sm transition-colors outline-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Contact
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentContact?.id === 'main' || currentContact?.isPrimary ? (
          // Main Profile View
          <div className="p-6">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${currentContact?.color || 'from-purple-500 to-pink-500'} flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg`}>
                {profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <h1 className="text-white text-2xl font-semibold">{profile.fullName}</h1>
              {profile.title && <p className="text-white/60">{profile.title}</p>}
              {profile.tagline && <p className="text-white/40 text-sm mt-1">{profile.tagline}</p>}
            </div>

            {/* Contact Actions */}
            <div className="flex justify-center gap-3 mb-6">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white/60 text-xs">email</span>
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-white/60 text-xs">website</span>
                </a>
              )}
              <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors outline-none">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-white/60 text-xs">share</span>
              </button>
            </div>

            {/* Work */}
            {profile.roles && profile.roles.length > 0 && (
              <div className="rounded-xl bg-white/5 overflow-hidden mb-4">
                <div className="px-4 py-2 border-b border-white/10">
                  <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Work</h3>
                </div>
                {profile.roles.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                      {role.icon || '💼'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{role.title} at {role.company}</p>
                      {role.description && <p className="text-white/50 text-xs">{role.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Info */}
            <div className="rounded-xl bg-white/5 overflow-hidden mb-4">
              <div className="px-4 py-2 border-b border-white/10">
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Contact</h3>
              </div>
              <div className="divide-y divide-white/5">
                {profile.email && (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white/40 text-xs">email</p>
                      <a href={`mailto:${profile.email}`} className="text-blue-400 text-sm hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <p className="text-white/40 text-xs">website</p>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                        {profile.website}
                      </a>
                    </div>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-white/40 text-xs">location</p>
                      <p className="text-white text-sm">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Accounts */}
            {profile.socials && Object.keys(profile.socials).length > 0 && (
              <div className="rounded-xl bg-white/5 overflow-hidden mb-4">
                <div className="px-4 py-2 border-b border-white/10">
                  <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Social Accounts</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {Object.entries(profile.socials).map(([key, social]) => (
                    <a
                      key={key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: social.color }}
                      >
                        {social.platform.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white/40 text-xs">{social.platform}</p>
                        <p className="text-blue-400 text-sm">@{social.handle}</p>
                      </div>
                      <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {profile.bio && (
              <div className="rounded-xl bg-white/5 overflow-hidden">
                <div className="px-4 py-2 border-b border-white/10">
                  <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Notes</h3>
                </div>
                <div className="px-4 py-3">
                  <p className="text-white/70 text-sm leading-relaxed">{profile.bio}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Individual Contact View
          <div className="p-6">
            {currentContact && (
              <>
                <div className="text-center mb-6">
                  {renderAvatar(currentContact, 'lg')}
                  <h1 className="text-white text-xl font-semibold mt-3">{currentContact.name}</h1>
                  {currentContact.subtitle && <p className="text-white/60">{currentContact.subtitle}</p>}
                </div>

                {currentContact.url && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-white/5 overflow-hidden">
                      <div className="px-4 py-2 border-b border-white/10">
                        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Profile</h3>
                      </div>
                      <a
                        href={currentContact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors group"
                      >
                        {renderAvatar(currentContact)}
                        <div className="flex-1">
                          <p className="text-white font-medium">{currentContact.platform || 'Website'}</p>
                          <p className="text-blue-400 text-sm">{currentContact.url}</p>
                        </div>
                        <svg className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    <a
                      href={currentContact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-medium transition-colors bg-gradient-to-r ${currentContact.color || 'from-blue-500 to-blue-600'} hover:opacity-90`}
                    >
                      Open {currentContact.platform || 'Profile'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZContacts;
