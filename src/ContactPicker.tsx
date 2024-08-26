import React, { useState } from "react";

const ContactPicker: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectContacts = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        setLoading(true);
        const props = ["name", "email", "tel"];
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
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <div>
                <strong>
                  {contact.name ? contact.name.join(", ") : "No Name"}
                </strong>
                <div>{contact.tel ? contact.tel[0] : "No Phone"}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactPicker;
