import { Drawer, styled } from "@mui/material";
import SideBarContent from "./SideBarContent";

const StyledDrawer = styled(Drawer)`
  margin-top: 54px;
`;

const SideBar = ({ openDrawer }) => {
  return (
    <StyledDrawer
      anchor="left"
      open={openDrawer}
      hideBackdrop={true}
      modelprops={{
        keepMounted: true,
      }}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          marginTop: "64px",
          width: 250,
          background: "#F5F5F5",
          borderRight: "none",
          height: "calc(100vh-64px)",
        },
      }}
    >
      <SideBarContent />
    </StyledDrawer>
  );
};

export default SideBar;
