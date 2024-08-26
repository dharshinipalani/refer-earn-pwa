import { Typography } from "@mui/material";
import React, { useState } from "react";

const ContactPicker: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectContacts = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        setLoading(true);
        const allContacts = await (navigator as any).contacts.getAll({
          multiple: true,
        });
        setContacts(allContacts);
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
      {contacts.length > 0 &&
        contacts.map((contact) => {
          return <Typography>{contact.name}</Typography>;
        })}
    </div>
  );
};

export default ContactPicker;
