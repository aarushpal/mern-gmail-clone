import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  styled,
  InputBase,
  TextField,
  Button,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 15,
    borderBottom: "1px solid #f5f5f5",
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  textAlign: "center",
});

const SendButton = styled(Button)({
  background: "#0b57d0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  //putting this info in config because it does not change once configured
  const config = {
    Host: "smtp.elasticemail.com",

    //hiding confidential info. in the env file
    Username: "cursedbanana88@yopmail.com",
    Password: "0EC529541C8596599CFB51CBCACB2189FC36 ",
    Port: 2525,
  };

  const closeComposeMail = (e) => {
    e.preventDefault();
    const payload = {
      to: data.to,
      from: "aarushpal2@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Aarush Pal",
      starred: false,
      type: "drafts",
    };

    saveDraftService.call(payload);
    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    } else {
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();

    //email always attaches itself to the window. So we have to check
    if (window.Email) {
      window.Email.send({
        //using the spread operator to include the details from the config
        ...config,
        To: data.to,
        From: "aarushpal2@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }

    const payload = {
      to: data.to,
      from: "aarushpal2@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Aarush Pal",
      starred: false,
      type: "sent",
    };

    sentEmailService.call(payload);
    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
    } else {
    }

    setOpenDialog(false);
  };
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>
      <RecipientsWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </RecipientsWrapper>
      <TextField
        multiline
        rows={15}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        onChange={(e) => onValueChange(e)}
        name="body"
      />
      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
