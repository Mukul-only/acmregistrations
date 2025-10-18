# Frontend-Only Event Registration Dashboard

This project has been converted to a **frontend-only** application that uses JSON files for data storage instead of a backend server.

## 📁 Data Structure

All data is stored in JSON files located in the `public/data/` directory:

### 1. **events.json**

Contains all event information:

```json
[
  {
    "id": "1",
    "title": "Event Name",
    "description": "Event description",
    "eventType": "technical" | "non-tech",
    "playerMode": "single player" | "team",
    "teamsize": 4,
    "subCategory": "Category name",
    "registrationCount": 0,
    "totalParticipants": 0
  }
]
```

### 2. **users.json**

Contains user information:

```json
[
  {
    "_id": "user1",
    "name": "User Name",
    "username": "username",
    "email": "user@example.com",
    "phone": "+1234567890"
  }
]
```

### 3. **registrations.json**

Contains registration records:

```json
[
  {
    "_id": "reg1",
    "eventId": "1",
    "type": "individual" | "group",
    "userId": "user1",
    "userIds": ["user1", "user2"],
    "groupName": "Team Name",
    "registrationDate": "2024-10-15T10:30:00Z"
  }
]
```

## 🚀 How to Run

1. **Install dependencies** (first time only):

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

## 📝 How to Update Data

Simply edit the JSON files in `public/data/`:

- `events.json` - Add/edit events
- `users.json` - Add/edit users
- `registrations.json` - Add/edit registrations

The application will automatically recalculate:

- Registration counts per event
- Total participants per event
- Statistics (total events, registrations, individual/group counts)

## 🔧 Data Service

The `src/services/dataService.js` handles:

- Loading JSON files
- Calculating registration counts
- Joining user data with registrations
- Providing data to components

## 🎨 Features

- ✅ No backend required
- ✅ Pure frontend with React + Vite
- ✅ Data loaded from JSON files
- ✅ Automatic calculation of statistics
- ✅ Filter events by type (All, Technical, Non-Technical)
- ✅ Sort events by registrations or name
- ✅ View detailed registration information
- ✅ Responsive dark theme UI

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.
