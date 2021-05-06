import "./styles.css";
// Create a single supabase client for interacting with your database
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button, Typography, TextField } from "@material-ui/core";

const supabaseUrl = "https://lltnqegjbzilitaitduj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjIwMTQxODMxLCJleHAiOjE5MzU3MTc4MzF9.NU1lCwjq1pYRMXsFMps230_F5UhZjVXwJ-JYw8i-QMQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function FamiliesTable() {
  const [db, setDb] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [volunteerInput, setVolunteerInput] = useState("");

  const fetchDb = () => {
    supabase
      .from("volunteers")
      .select(`name, families(name)`)
      .then(({ data, error }) => {
        setDb(data);
      });
  };

  const addVolunteer = () => {
    if (volunteerInput) {
      supabase
        .from("volunteers")
        .insert([{ name: `${volunteerInput}` }])
        .then(({ data, error }) => {
          setNeedsUpdate(!needsUpdate);
          console.log(data);
        });
    }
  };

  useEffect(() => {
    fetchDb();
  }, [needsUpdate]);

  return (
    <div className="App">
      <Typography variant="h3">Shabbat Walk Volunteers</Typography>
      <Typography variant="h4">
        This is the db test for the shabbat walk
      </Typography>
      <div>
        {db
          ? db.map((volunteer, volunteerIndex) => {
              return (
                <div key={volunteerIndex}>
                  <h5>{volunteer.name}</h5>
                  {volunteer.families.map((volunteer, volunteerIndex) => {
                    return <p key={volunteerIndex}> {volunteer.name} </p>;
                  })}
                </div>
              );
            })
          : console.log(db)}
      </div>
      <h2>Add Volunteer</h2>

      <TextField
        variant="outlined"
        onChange={(event) => setVolunteerInput(event.target.value)}
      />
      <Button onClick={addVolunteer} variant="contained" color="primary">
        Add
      </Button>
    </div>
  );
}
