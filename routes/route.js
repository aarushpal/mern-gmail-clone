import express from "express";
import {
  saveSendEmails,
  getEmails,
  moveEmailsToBin,
  toggleStarredEmails,
  deleteEmails,
} from "../controller/email-controller.js";

const routes = express.Router();

//when we hit the /save url, saveSentEmails is triggered
routes.post("/save", saveSendEmails);
routes.get("/emails/:type", getEmails);
routes.post("/save-draft", saveSendEmails);
routes.post("/bin", moveEmailsToBin);
routes.post("/starred", toggleStarredEmails);
routes.delete("/delete", deleteEmails);

export default routes;
