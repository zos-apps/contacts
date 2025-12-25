# 👤 Contacts

> Contact manager with social profiles

Part of the [zOS Apps](https://github.com/zos-apps) ecosystem.

## Installation

```bash
npm install github:zos-apps/contacts
```

## Usage

```tsx
import App from '@zos-apps/contacts';

function MyApp() {
  return <App />;
}
```

## Package Spec

App metadata is defined in `package.json` under the `zos` field:

```json
{
  "zos": {
    "id": "ai.hanzo.contacts",
    "name": "Contacts",
    "icon": "👤",
    "category": "productivity",
    "permissions": ["storage"],
    "installable": true
  }
}
```

## Version

v4.2.0

## License

MIT © Hanzo AI
