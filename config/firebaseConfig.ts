import {
    initializeApp,
    cert,
    getApps,
    App,
    AppOptions,
    ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const getFirebaseConfig = (): AppOptions => {
    const {
        FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY,
    } = process.env;

    if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY
    ) {
        throw new Error(
            "Missing Firebase configuration. Please check your environment variables."
        );
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
        credential: cert(serviceAccount),
    };
};

const initializeFirebaseAdmin = (): App => {
    const existingApp: App | undefined = getApps()[0];
    if (existingApp) {
        return existingApp;
    }

    return initializeApp(getFirebaseConfig());
};

const getDb = (): Firestore => {
    const app = initializeFirebaseAdmin();
    return getFirestore(app);
};

const getFirebaseAuth = (): Auth => {
    const app = initializeFirebaseAdmin();
    return getAuth(app);
};

export { getDb, getFirebaseAuth };