/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
export const validarLogin = functions.https.onCall(async (data, context) => {
    try {
      const { email, password } = data;
      const usuariosRef = admin.firestore().collection("usuarios");
      const usuarioQuery = await usuariosRef
        .where("email", "==", email)
        .limit(1)
        .get();
  
      if (usuarioQuery.empty) {
        console.log("Usuário não encontrado");
        return {success: false, message: "Usuário não encontrado"};
      }
  
      const usuarioDoc = usuarioQuery.docs[0];
      const usuarioData = usuarioDoc.data();
      const usuarioPassword = usuarioData.password;
      const usuarioNome = usuarioData.usuarioo;
  
      if (usuarioPassword === password) {
        console.log(`Bem-Vindo de volta ${usuarioNome}`);
        return {success: true, message: `Bem-Vindo de volta ${usuarioNome}`};} else{
        console.log("Senha Incorreta");
        return {success: false, message: "Senha Incorreta" };
      }} catch (error) {
      console.error("Erro ao validar login:", error);
      return {success: false, message: "Erro ao validar login" };}
  });

