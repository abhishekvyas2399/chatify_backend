✅ Environment variables (keys, secrets, JWT secret key etc.)
✅ Database connection (Mongoose setup)


.env File (Store Secrets)

config/db.js (MongoDB Connection by mongoose.connect(process.env.MONGO_URI))


it store all type of connection 
	•	Database connection (MongoDB, Redis)
	•	Authentication settings (JWT, Hashing)
	•	Socket.io WebSockets configuration
	•	Email & notifications settings
	•	Cloud storage settings (AWS S3, Cloudinary)
	•	Security settings (CORS, Helmet)
	•	Logging (Winston, Morgan)
	•	Payment integration (Stripe, PayPal)
	•	Third-party APIs (Google, Twilio, OpenAI, etc.)