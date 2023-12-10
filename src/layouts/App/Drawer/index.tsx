import React from "react";

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Paper,
  Box,
} from "@mui/material";

//Icons
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  // DrawerHeader
} from "../components";
import { DrawerData } from "./drawerData";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import { stringAvatar } from "@/utilities/stringAvatar";
import previewAttachment from "@/utilities/s3Attachment";

const AppDrawer: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
  open,
  toggleDrawer,
}) => {
  const auth = useAuth();
  const user = useUser();
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            justifyContent: open ? "initial" : "center",
          }}
        >
          <Avatar
            variant={"square"}
            src={"/favicon.svg"}
            sx={{
              position: "relative",
              width: open ? "0px" : "53px",
              height: "auto",
              p: open ? 0 : 0.8,
              transition: "all 0.5s ease-in-out",
            }}
          />
          <Avatar
            variant={"square"}
            src={"/name-light.svg"}
            sx={{
              position: "relative",
              width: open ? "150px" : "0px",
              height: "auto",
              p: open ? 0.8 : 0,
              transition: "all 0.5s ease-in-out",
            }}
            // className="mix-blend-difference"
          />
        </DrawerHeader>
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Box
          sx={{
            height: "calc(100vh-128px)",
            overflow: "hidden",
            overflowY: "auto",
            mb: "60px",
          }}
        >
          {DrawerData(auth.logout)?.map?.((item, index) => (
            <List
              key={item.title}
              subheader={
                open ? (
                  <ListSubheader
                    sx={{
                      color: "#000",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "0.7em",
                      lineHeight: "30px",
                    }}
                  >
                    {item.title}
                  </ListSubheader>
                ) : index ? (
                  <Divider variant={"middle"} />
                ) : (
                  <></>
                )
              }
            >
              {item.sublist?.map?.(
                (navbtn) =>
                  !navbtn.hide && (
                    <ListItemButton
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      key={navbtn.to || navbtn.name}
                      component={navbtn.to ? Link : ListItemButton}
                      to={navbtn.to}
                      onClick={navbtn.function}
                      disabled={navbtn.disabled}
                    >
                      <Tooltip title={navbtn.name} placement={"right"} arrow>
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 1.5 : "auto",
                            justifyContent: "center",
                            bgcolor: "primary.50",
                            borderColor: "primary.100",
                            borderWidth: "1px",
                            color: "primary.600",
                            fontSize: "1.5rem",
                            p: 1,
                            borderRadius: "4px",
                          }}
                        >
                          {navbtn.icon}
                        </ListItemIcon>
                      </Tooltip>

                      <ListItemText
                        primary={navbtn.name}
                        sx={{ opacity: open ? 1 : 0 }}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "0.9em",
                          },
                        }}
                      />
                    </ListItemButton>
                  )
              )}
            </List>
          ))}
        </Box>
        <DrawerFooter
          sx={{
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
        >
          {open ? (
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#F6F7F8",
                width: "100%",
                p: 1,
                py: 0.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 1,
              }}
            >
              <Avatar
                src={
                  user?.display_picture
                    ? previewAttachment(user?.display_picture)
                    : undefined
                }
                {...stringAvatar(
                  `${user?.first_name || ""} ${user?.last_name || ""}`
                )}
                variant={"rounded"}
                className="text-xs"
              />
              <ListItemText
                primary={`${user?.first_name} ${user?.last_name}`}
                secondary={`${user?.role?.name || "No Role Assigned"}`}
                primaryTypographyProps={{
                  variant: "subtitle2",
                  sx: {
                    width: "165px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                  },
                }}
                secondaryTypographyProps={{
                  variant: "caption",
                  sx: {
                    width: "165px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "-2px",
                    fontWeight: "medium",
                  },
                }}
              />
              <Tooltip title={"Collapse Drawer"} placement={"right"} arrow>
                <IconButton
                  onClick={toggleDrawer}
                  color={"primary"}
                  sx={{
                    color: "primary.600",
                  }}
                >
                  {open ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
                </IconButton>
              </Tooltip>
            </Paper>
          ) : (
            <Tooltip title={"Expand Drawer"} placement={"right"} arrow>
              <IconButton
                onClick={toggleDrawer}
                color={"primary"}
                sx={{
                  color: "primary.600",
                }}
              >
                {open ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
              </IconButton>
            </Tooltip>
          )}
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export default React.memo(AppDrawer);
