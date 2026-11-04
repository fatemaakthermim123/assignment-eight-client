
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth} from "better-auth";
import { jwt } from "better-auth/plugins"
import { tr } from "date-fns/locale";


const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('assignment-eight');

export const auth = betterAuth({
  database: mongodbAdapter(db, {

    client,
  }),
   emailAndPassword: { 
    enabled: true, 
    minPasswordLength:6,
  }, 
  plugins:[jwt(),],
  session:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      maxAge:7*24*60*60
    }
  }
});
