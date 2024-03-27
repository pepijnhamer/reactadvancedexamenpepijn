import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { CategoryContextProvider } from "./Category";
import { UserContextProvider } from "./User";

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
