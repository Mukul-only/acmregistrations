# Troubleshooting Guide

Common issues and their solutions for the Event Registration Dashboard.

## 🔧 Installation Issues

### Issue: `npm install` fails

**Symptoms:**
- Error messages during installation
- Missing dependencies

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

3. Check Node.js version (requires v18+):
   ```bash
   node --version
   ```

4. Try using npm instead of yarn or vice versa

---

## 🗄️ Database Connection Issues

### Issue: Cannot connect to MongoDB Atlas

**Symptoms:**
- "Failed to connect to MongoDB" error
- Server crashes on startup
- Timeout errors

**Solutions:**

1. **Check Internet Connection**
   - Ensure you have active internet
   - Try accessing other websites

2. **Verify MongoDB URI**
   - Check `.env` file exists
   - Verify connection string is correct
   - Ensure no extra spaces or line breaks

3. **IP Whitelist in MongoDB Atlas**
   - Log into MongoDB Atlas
   - Go to Network Access
   - Add your current IP address
   - Or add `0.0.0.0/0` for all IPs (development only)

4. **Check MongoDB Atlas Status**
   - Visit MongoDB Atlas dashboard
   - Verify cluster is running
   - Check for any service disruptions

5. **Test Connection String**
   - Try connecting with MongoDB Compass
   - Use the same connection string from `.env`

6. **Firewall/Antivirus**
   - Temporarily disable firewall
   - Check if antivirus is blocking connection

---

## 🖥️ Server Issues

### Issue: Server won't start

**Symptoms:**
- "Port already in use" error
- Server crashes immediately
- No response from server

**Solutions:**

1. **Port Already in Use**
   ```bash
   # Find process using port 5000
   netstat -ano | findstr :5000
   
   # Kill the process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

2. **Change Port**
   - Edit `.env` file:
     ```
     PORT=5001
     ```

3. **Check for Syntax Errors**
   - Review `server/index.js` for errors
   - Check console for error messages

4. **Missing Dependencies**
   ```bash
   npm install express mongodb cors dotenv
   ```

---

## 🌐 Frontend Issues

### Issue: Frontend won't start

**Symptoms:**
- Vite server fails to start
- Port 3000 already in use
- Build errors

**Solutions:**

1. **Port Already in Use**
   - Change port in `vite.config.js`:
     ```javascript
     server: {
       port: 3001
     }
     ```

2. **Clear Vite Cache**
   ```bash
   rmdir /s /q node_modules\.vite
   npm run dev
   ```

3. **Rebuild Dependencies**
   ```bash
   npm install
   npm run dev
   ```

---

## 📡 API Connection Issues

### Issue: Frontend can't connect to backend

**Symptoms:**
- "Failed to load data" error
- Network errors in console
- Empty dashboard

**Solutions:**

1. **Verify Backend is Running**
   - Check if server terminal shows "Server running"
   - Visit http://localhost:5000/api/health
   - Should return `{"status":"OK"}`

2. **Check Proxy Configuration**
   - Verify `vite.config.js` has correct proxy:
     ```javascript
     proxy: {
       '/api': {
         target: 'http://localhost:5000',
         changeOrigin: true,
       }
     }
     ```

3. **CORS Issues**
   - Check browser console for CORS errors
   - Verify `server/index.js` has CORS enabled:
     ```javascript
     app.use(cors());
     ```

4. **Check Network Tab**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for failed requests
   - Check request/response details

---

## 📊 Data Display Issues

### Issue: No events showing

**Symptoms:**
- Empty dashboard
- "No events found" message
- Statistics show 0

**Solutions:**

1. **Seed Database**
   ```bash
   npm run seed
   ```

2. **Check Database Connection**
   - Verify MongoDB connection is successful
   - Check server logs for errors

3. **Verify Event Data**
   - Check `server/index.js` has `eventsData` array
   - Ensure event IDs match MongoDB ObjectId format

4. **Check Browser Console**
   - Look for JavaScript errors
   - Check API response in Network tab

---

### Issue: Registration counts are wrong

**Symptoms:**
- Incorrect numbers
- Counts don't match database
- Missing registrations

**Solutions:**

1. **Verify Database Data**
   - Check MongoDB Atlas
   - Verify `registers` collection has data
   - Check `eventId` fields match event IDs

2. **Check ObjectId Format**
   - Ensure eventId in database matches event IDs
   - ObjectIds are case-sensitive

3. **Refresh Data**
   - Reload the page
   - Check for caching issues

---

### Issue: User details not showing

**Symptoms:**
- "Unknown User" displayed
- Missing email/phone
- Empty user cards

**Solutions:**

1. **Check Users Collection**
   - Verify `users` collection exists
   - Check user documents have required fields

2. **Verify User IDs**
   - Ensure userId in registrations matches user _id
   - Check members array in group registrations

3. **Check API Response**
   - Open Network tab
   - Check `/api/events/:id/registrations` response
   - Verify userDetails are populated

---

## 🎨 UI/Styling Issues

### Issue: Styles not loading

**Symptoms:**
- Plain HTML with no styling
- Tailwind classes not working
- Broken layout

**Solutions:**

1. **Rebuild Tailwind**
   ```bash
   npm run dev
   ```

2. **Check Tailwind Configuration**
   - Verify `tailwind.config.js` exists
   - Check `content` array includes all files:
     ```javascript
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ]
     ```

3. **Verify CSS Import**
   - Check `src/index.css` has Tailwind directives:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

4. **Clear Browser Cache**
   - Hard refresh: Ctrl + Shift + R
   - Clear cache and reload

---

## 🔄 State Management Issues

### Issue: Filters/sorting not working

**Symptoms:**
- Clicking filters has no effect
- Sort dropdown doesn't work
- Events don't update

**Solutions:**

1. **Check Browser Console**
   - Look for JavaScript errors
   - Check React warnings

2. **Verify State Updates**
   - Check `App.jsx` state management
   - Ensure filter/sort functions are correct

3. **Clear Browser Cache**
   - Hard refresh page
   - Clear local storage

---

## 🚀 Performance Issues

### Issue: Slow loading

**Symptoms:**
- Long wait times
- Laggy interface
- Slow API responses

**Solutions:**

1. **Check Network Speed**
   - Test internet connection
   - Check MongoDB Atlas region

2. **Optimize Database Queries**
   - Add indexes to frequently queried fields
   - Limit returned data

3. **Check Data Size**
   - Large number of registrations may slow down
   - Consider implementing pagination

4. **Browser Performance**
   - Close unnecessary tabs
   - Clear browser cache
   - Try different browser

---

## 🔐 Environment Variable Issues

### Issue: Environment variables not loading

**Symptoms:**
- "MONGO_URI is undefined" error
- Server can't find configuration
- Connection string errors

**Solutions:**

1. **Verify .env File**
   - Check file is named exactly `.env`
   - No spaces in filename
   - Located in project root

2. **Check .env Format**
   ```
   MONGO_URI=mongodb+srv://...
   PORT=5000
   ```
   - No quotes around values
   - No spaces around `=`
   - No trailing spaces

3. **Restart Server**
   - Stop server (Ctrl + C)
   - Start again: `npm run server`

4. **Check dotenv Import**
   - Verify `server/index.js` has:
     ```javascript
     import dotenv from 'dotenv';
     dotenv.config();
     ```

---

## 📱 Mobile/Responsive Issues

### Issue: Layout broken on mobile

**Symptoms:**
- Overlapping elements
- Text too small
- Buttons not clickable

**Solutions:**

1. **Check Viewport Meta Tag**
   - Verify `index.html` has:
     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     ```

2. **Test Responsive Classes**
   - Check Tailwind responsive classes
   - Use browser DevTools device emulation

3. **Clear Mobile Browser Cache**
   - Clear cache on mobile device
   - Try different mobile browser

---

## 🐛 Common Error Messages

### "Cannot find module"
**Solution:** Run `npm install`

### "Port already in use"
**Solution:** Kill process or change port

### "MongoDB connection timeout"
**Solution:** Check internet, verify IP whitelist

### "CORS policy blocked"
**Solution:** Ensure backend CORS is enabled

### "Failed to fetch"
**Solution:** Check backend is running

### "Cannot read property of undefined"
**Solution:** Check data structure, add null checks

---

## 🔍 Debugging Tips

### 1. Check Browser Console
- Press F12 to open DevTools
- Look for red error messages
- Check warnings

### 2. Check Network Tab
- See all API requests
- Check request/response
- Look for failed requests

### 3. Check Server Logs
- Look at terminal running server
- Check for error messages
- Verify successful connections

### 4. Use Console.log
- Add logging to components
- Check state values
- Verify data flow

### 5. Test API Directly
- Use browser to visit API endpoints
- Use Postman or Thunder Client
- Verify responses

---

## 📞 Getting Help

If you're still stuck:

1. **Check Documentation**
   - README.md
   - ARCHITECTURE.md
   - PROJECT_SUMMARY.md

2. **Review Code**
   - Compare with original files
   - Check for typos
   - Verify syntax

3. **Search Online**
   - Google the error message
   - Check Stack Overflow
   - Read official documentation

4. **Start Fresh**
   - Delete node_modules
   - Reinstall dependencies
   - Reseed database

---

## 🔄 Reset Everything

If all else fails, complete reset:

```bash
# Stop all servers (Ctrl + C in terminals)

# Delete dependencies
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install

# Reseed database
npm run seed

# Start fresh
npm run server  # Terminal 1
npm run dev     # Terminal 2
```

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] Node.js v18+ installed
- [ ] npm install completed successfully
- [ ] .env file exists with correct values
- [ ] MongoDB Atlas cluster is running
- [ ] IP address is whitelisted
- [ ] Backend server is running (port 5000)
- [ ] Frontend server is running (port 3000)
- [ ] No errors in browser console
- [ ] No errors in server terminal
- [ ] Database has been seeded
- [ ] Internet connection is stable

---

**Still having issues?** Double-check all steps and error messages carefully. Most issues are due to:
- Missing dependencies
- Incorrect environment variables
- MongoDB connection problems
- Port conflicts

**Good luck! 🍀**
