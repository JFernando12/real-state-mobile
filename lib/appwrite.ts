import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";

export const config = {
  platform: "com.jfernando.realstate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    // const redirectUri = Linking.createURL("/");
    const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
    if (!deepLink.hostname) {
      deepLink.hostname = "localhost";
    }
    console.log("Deep link:", deepLink);
    const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'playground://'

    // Start OAuth flow
    const loginUrl = account.createOAuth2Token(
      OAuthProvider.Google,
      `${deepLink}`,
      `${deepLink}`
    );

    // Open loginUrl and listen for the scheme redirect
    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

    if (result.type !== "success") throw new Error("Failed to login");

    const url = new URL(result.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to login");

    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    if (!user.$id) return;

    const userAvatar = await avatar.getInitials(user.name);
    return {
      ...user,
      avatar: userAvatar.toString(),
    };
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents.map((property) => ({
      $id: property.$id,
      name: property.name,
      address: property.address,
      price: property.price,
      image: property.image,
      rating: property.rating,
    }));
  } catch (error) {
    console.error("Get latest properties error:", error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter?: string;
  query?: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc('$createdAt')];

    if (filter && filter !== 'All') {
      buildQuery.push(Query.equal('type', filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search('name', query),
          Query.search('address', query),
          Query.search('type', query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents.map((property) => ({
      $id: property.$id,
      name: property.name,
      address: property.address,
      price: property.price,
      image: property.image,
      rating: property.rating,
    }));
  } catch (error) {
    console.error('Get properties error:', error);
    return [];
  }
}
