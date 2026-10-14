import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'



const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 2",
      description: "test description 2"
    },
    {
      title: "test title 3",
      description: "test description 3"
    },
    {
      title: "test title 4",
      description: "test description 4"
    },
    {
      title: "test title 4",
      description: "test description 4"
    },
  ])


  function getNotes() {
    axios.get("https://backend-5-29x7.onrender.com//api/notes")
      .then((res) => {
        setNotes(res.data.note)
      })
  }



  function submitHandler(e) {
    e.preventDefault()

    const { title, description } = e.currentTarget.elements;

    axios.post("https://backend-5-29x7.onrender.com//api/notes", {
      title: title.value,
      description: description.value
    }).then((res) => {
      console.log(res.data)
      getNotes()
    })
  }

  
  useEffect(() => {
    getNotes()
  }, [])
  return (
    <div className="parent">


      <div  className="form">
        <form className='child' onSubmit={submitHandler}>
          <input name="title" type="text" placeholder='title' />
          <input name="description" type="text" placeholder='description' />
          <button>submit</button>
        </form>

      </div>

      {notes.map((note, index) => (
        <div className="box" key={index}>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </div>
      ))}

    </div>
  )
}

export default App
