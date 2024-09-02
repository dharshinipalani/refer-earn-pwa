import React, { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material"
const ContactPicker: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

    const handleSelectContacts = async () => {
    setLoading(true);

    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'tel', 'icon'];
        const options = { multiple: true }; 
        const selectedContacts = await (navigator as any).contacts.select(props, options);

        setContacts(selectedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    } else {
      console.warn("The Contacts API is not supported on this device.");
    }

    setLoading(false);
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
