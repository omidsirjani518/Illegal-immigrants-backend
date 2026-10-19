require('dotenv').config();

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

// GraphQL
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Socket
const socketHandler = require('./socket');

// تنظیمات پورت‌ها
const HTTP_PORT = process.env.HTTP_PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 4443;
const MONGO_URI = process.env.MONGO_URI;

// ریشه برای PKG / exe
const rootDir = process.pkg ? path.dirname(process.execPath) : path.resolve();

// SSL
const sslOptions = {
    key: fs.readFileSync(path.join(rootDir, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(rootDir, 'ssl', 'cert.pem')),
};

async function startServer() {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true }));

    // سرو public از rootDir
    app.use(express.static(path.join(rootDir, 'src', 'public'))); 
    app.get('/', (req, res) => { res.sendFile(path.join(rootDir, 'src', 'public', 'index.html')); });

    // سرو public از rootDir
    app.use(express.static(path.join(rootDir, 'src', 'admin'))); 
    app.get('/admin', (req, res) => { res.sendFile(path.join(rootDir, 'src', 'admin', 'index.html')); });

    // سرو chat از rootDir
    app.use(express.static(path.join(rootDir, 'src', 'chat'))); 
    app.get('/register', (req, res) => { res.sendFile(path.join(rootDir, 'src', 'register', 'index.html')); });

    // Routeهای ماژولار
    const authRoutes = require('./routes/auth');
    const uploadRoutes = require('./routes/upload');
    const userRoutes = require('./routes/users');
    const messageRoutes = require('./routes/messages');
    const profileRoutes = require('./routes/profile');
    const chatRoutes = require('./routes/chat');
    const crmRoutes = require('./routes/crm');
    const notificationRoutes = require('./routes/notification');

    app.use('/api/auth', authRoutes);
    app.use('/api/upload', uploadRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/profile', profileRoutes); // /api/profile/avatar
    app.use('/api/chat', chatRoutes);
    app.use('/api/crm', crmRoutes);
    app.use('/api/notification', notificationRoutes);

    // Apollo Server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res }),
        introspection: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    // دو سرور: HTTP + HTTPS
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(sslOptions, app);

    // Socket روی HTTPS (برای وب و موبایل امن)
    const socketOptions = {
        cors: { origin: "*" },
        maxHttpBufferSize: 100 * 1024 * 1024 // 100MB
    };
    
    const io = require("socket.io")(httpServer, socketOptions);
    const ioSecure = require("socket.io")(httpsServer, socketOptions);
    
    socketHandler(io);
    socketHandler(ioSecure);
    

    httpServer.listen(HTTP_PORT, () => {
        console.log(`🌐 HTTP server on http://localhost:${HTTP_PORT}`);
    });

    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`🔒 HTTPS server on https://localhost:${HTTPS_PORT}`);
        console.log(`🚀 GraphQL at https://localhost:${HTTPS_PORT}${apolloServer.graphqlPath}`);
        console.log('📡 Socket.IO on HTTPS server');
    });
}

startServer().catch(err => console.error(err));
