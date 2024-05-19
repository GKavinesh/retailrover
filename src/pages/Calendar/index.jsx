import React, { useState, useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const calendarRef = useRef(null);

  const handleDateClick = (selected) => {
    setNewEventDate(selected.startStr);
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNewEventTitleChange = (event) => {
    setNewEventTitle(event.target.value);
  };

  const handleAddEvent = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      title: newEventTitle,
      start: newEventDate,
      allDay: true // Adjust this as per your event requirements
    });
    handleCloseDialog();
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Box m="20px">
          <Header title="Calendar" />
          <Box display="flex" justifyContent="space-between">
            <Box
              flex="1 1 20%"
              backgroundColor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
            >
              <Typography variant="h5">Events</Typography>
              <List>
                {currentEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {new Date(event.start).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box flex="1 1 100%" ml="15px">
              <FullCalendar
                ref={calendarRef}
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                  {
                    id: "12315",
                    title: "All-day event",
                    date: "2022-09-14",
                  },
                  {
                    id: "5123",
                    title: "Timed event",
                    date: "2022-09-28",
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="event-title"
              label="Event Title"
              type="text"
              fullWidth
              value={newEventTitle}
              onChange={handleNewEventTitleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddEvent} variant="contained" color="primary">Add Event</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;


