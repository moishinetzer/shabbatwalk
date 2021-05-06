import "./styles.css";
import "@fontsource/roboto";

import { Button, Typography } from "@material-ui/core";

// Create a single supabase client for interacting with your database
import { useEffect, useState } from "react";

import FamiliesTable from "./FamiliesTable";
import VolunteersTable from "./VolunteersTable";
import OtherNewTable from "./OtherNewTable";
// note
export default function App() {
  const [tab, setTab] = useState("families");

  return (
    <>
      <Button
        onClick={() => setTab("families")}
        variant="contained"
        color="primary"
      >
        {" "}
        Families{" "}
      </Button>
      <Button
        onClick={() => setTab("volunteers")}
        variant="contained"
        color="primary"
      >
        {" "}
        volunteers{" "}
      </Button>
      {tab === "families" ? <FamiliesTable /> : <VolunteersTable />}
      <OtherNewTable />
    </>
  );
}
