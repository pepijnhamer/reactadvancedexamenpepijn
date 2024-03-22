import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { CategoryContextProvider } from "./CategoryContext";
import { UserContextProvider } from "./UserContext";

export const Root = () => {
  return (
    <CategoryContextProvider>
      <UserContextProvider>
        <Box>
          <Navigation />
          <Outlet />
        </Box>
      </UserContextProvider>
    </CategoryContextProvider>
  );
};
