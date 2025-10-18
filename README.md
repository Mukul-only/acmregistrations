# Event Registration Dashboard

A professional event registration management system built with Vite, React, Tailwind CSS, and MongoDB Atlas.

## Features

- 📊 **Real-time Statistics**: View total events, registrations, and participant counts
- 🎯 **Event Management**: Display all events with detailed information
- 👥 **User Details**: Expandable dropdown showing registered users for each event
- 🔍 **Filtering & Sorting**: Filter by event type and sort by registrations or name
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance**: Built with Vite for optimal development and production builds
- 🔄 **Real-time Data**: Fetches data directly from MongoDB Atlas

## Tech Stack

### Frontend
- **Vite** - Next generation frontend tooling
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Beautiful icon library

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **MongoDB Atlas** - Cloud database service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
event-registration-dashboard/
├── server/
│   └── index.js              # Express server with MongoDB integration
├── src/
│   ├── components/
│   │   ├── EventCard.jsx     # Event card with registration details
│   │   ├── Header.jsx        # Application header
│   │   ├── StatsOverview.jsx # Statistics dashboard
│   │   ├── LoadingSpinner.jsx # Loading state component
│   │   └── ErrorMessage.jsx  # Error handling component
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── postcss.config.js         # PostCSS configuration
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account with database setup

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   
   The `.env` file is already configured with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://mukulkushwahaa:ZsK%3ETAjMQ2x6%3ADB%24@cluster0.ylfhapq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   ```

3. **Database Setup**
   
   Ensure your MongoDB Atlas database has the following collections:
   - `registers` - Event registrations
   - `users` - User information
   - `events` - Event details (optional, using hardcoded data)

### Running the Application

1. **Start the Backend Server**
   ```bash
   npm run server
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

3. **Open in Browser**
   Navigate to http://localhost:3000

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## API Endpoints

### GET /api/events
Returns all events with registration counts and participant totals.

**Response:**
```json
[
  {
    "id": "66817b2f3a4b5c6d7e8f9a01",
    "title": "Algorithmia",
    "eventType": "technical",
    "playerMode": "single player",
    "registrationCount": 5,
    "totalParticipants": 5
  }
]
```

### GET /api/events/:eventId/registrations
Returns all registrations for a specific event with user details.

**Response:**
```json
[
  {
    "_id": "68f3b603d1278846fee5e90b",
    "eventId": "66817b2f3a4b5c6d7e8f9a03",
    "type": "group",
    "groupName": "Team Alpha",
    "registrationDate": "2024-01-15T10:30:00.000Z",
    "userDetails": [
      {
        "_id": "686f9e76834ede94092d1c4e",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
  }
]
```

### GET /api/stats
Returns overall statistics.

**Response:**
```json
{
  "totalEvents": 9,
  "totalRegistrations": 25,
  "totalUsers": 50,
  "groupRegistrations": 10,
  "individualRegistrations": 15
}
```

### GET /api/health
Health check endpoint.

## Features Breakdown

### Event Card Component
- Displays event information with badges for type and mode
- Shows registration count and total participants
- Expandable section to view all registered users
- Group registrations show group name and all members
- Individual registrations show user details

### Statistics Dashboard
- Total events count
- Total registrations
- Individual vs group registration breakdown
- Visual cards with icons

### Filtering & Sorting
- Filter by: All, Technical, Non-Technical
- Sort by: Registration count or Event name
- Real-time updates

### User Details Display
- User name, email, and phone (if available)
- Registration date and time
- Group leader indication for team events
- Expandable/collapsible interface

## Database Schema

### Registers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  eventId: ObjectId,
  registrationDate: Date,
  type: "group" | "individual",
  groupName: String (optional),
  members: [ObjectId] (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  // ... other user fields
}
```

## Customization

### Adding New Events
Edit the `eventsData` array in `server/index.js`:

```javascript
const eventsData = [
  {
    id: "66817b2f3a4b5c6d7e8f9a01",
    title: "Your Event Name",
    image: "/path/to/image.webp",
    eventType: "technical", // or "non-tech"
    playerMode: "single player", // or "team based"
    teamsize: "2", // optional
    subCategory: "webdev", // optional
    description: "Event description..."
  }
];
```

### Styling
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### API Configuration
Update `vite.config.js` proxy settings if your backend runs on a different port.

## Troubleshooting

### Server Connection Issues
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify the connection string in `.env`
- Check if port 5000 is available

### Frontend Not Loading Data
- Verify backend server is running
- Check browser console for errors
- Ensure proxy configuration in `vite.config.js` is correct

### CORS Errors
- Backend already configured with CORS middleware
- If issues persist, check allowed origins in `server/index.js`

## Performance Optimization

- Lazy loading for registration details
- Efficient MongoDB queries with proper indexing
- React component memoization where needed
- Tailwind CSS purging for smaller bundle size

## Security Considerations

- Environment variables for sensitive data
- MongoDB connection string should be kept secure
- Consider adding authentication for production
- Implement rate limiting for API endpoints

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Export registration data to CSV/Excel
- [ ] Email notifications for registrations
- [ ] Advanced analytics and charts
- [ ] Search functionality
- [ ] Pagination for large datasets
- [ ] Event creation and management UI

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
