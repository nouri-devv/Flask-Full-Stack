import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts")
      const data = await response.json()
      setContacts(data.contacts)
    } catch (error) {
      console.error("Error fetching contacts:", error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openCreateModal = () => {
    setIsModalOpen(true)
  }

  const handleContactCreated = async () => {
    await fetchContacts()
    closeModal()
  }

  return (
    <div className="app-container">
      <ContactList contacts={contacts}/>
      <button onClick={openCreateModal} className="create-button">Create New Contact</button>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <ContactForm onContactCreated={handleContactCreated} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App