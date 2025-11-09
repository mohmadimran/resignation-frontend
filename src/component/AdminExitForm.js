import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

const AdminExitResponseList = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/admin/exit_responses", {
          headers: {
            Authorization: token,
          },
        });
        setResponses(res.data.data);
      } catch (err) {
        console.error("Error fetching exit responses:", err);
        setError("Failed to fetch responses.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="p-4">
      <Typography variant="h5" gutterBottom>
        Exit Questionnaire Responses
      </Typography>
      {responses.map((item, index) => (
        <Card key={index} className="mb-4 shadow-md">
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              Employee ID: {item.employeeId}
            </Typography>
            <List>
              {item.responses.map((resp, idx) => (
                <React.Fragment key={idx}>
                  <ListItem>
                    <ListItemText
                      primary={resp.questionText}
                      secondary={resp.response}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminExitResponseList;
