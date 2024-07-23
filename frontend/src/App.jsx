import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([{"firstName":"Mostafa", "lastName":"Nouri", "email":"work.mst06@outlook.com", id:10}])

  useEffect(() => {
    //fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  return <ContactList contacts={contacts}></ContactList>
}

export default App