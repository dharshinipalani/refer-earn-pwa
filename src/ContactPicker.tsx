import React, { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material"
const ContactPicker: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectContacts = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        setLoading(true);
        const props = ["name", "email", "tel" , "icon"];
        const selectedContacts = await (navigator as any).contacts.select(
          props,
          { multiple: true }
        );
        setContacts(selectedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Contacts API not supported");
    }
  };

  return (
    <div>
      <button onClick={handleSelectContacts} disabled={loading}>
        {loading ? "Loading..." : "Select Contacts"}
      </button>
      {contacts.length > 0 && (
          contacts.map((contact, index) => (
            <Box>
              {contact.icon.length > 0 ? (
                contact.icon[0]
              ) : (
                <Avatar>{contact.name[0].charAt(0).toUpperCase()}</Avatar>
              )}
              <Box>
                <Typography variant="subtitle1">{contact.name}</Typography>
                <Typography variant="body1">{contact.tel}</Typography>
              </Box>
            </Box>
          ))
      )}
      {
        contacts.length === 0 && (
          <Typography variant="body1">
            No contacts selected. Please enable "Allow sharing contacts" in your
            device's settings.
          </Typography>
        )
      }
    </div>
  );
};

export default ContactPicker;
