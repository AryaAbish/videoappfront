import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, removeVideo } from '../service/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import { format } from 'date-fns';

function VideoCard({ video, deleteUpdate, inCard }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    let id = uniqid()
    let date = format(new Date(), 'MMMM d yyyy,h:mm:ss a')
    const { caption, url } = video

    if (id != "" && date != "" && caption != "" && url != "") {
      const body = {
        id, cardName: caption, url, date
      }
      await addHistory(body)
    }
  }

  const handleDelete = async (id) => {
    const response = await removeVideo(id)
    // console.log(response);
    if (response.status >= 200 && response.status < 300) {
      toast.success('video deleted')
      deleteUpdate(true)
    }
  }

  const dragStarted = (e, id) => {
    // console.log("drag started... source card id "+id);
    //to store dragged data
    e.dataTransfer.setData("cardId", id) //key and value to store the id of dragged card
  }

  return (
    <div className='p-2'>
      <Card draggable onDragStart={(e) => dragStarted(e, video?.id)} style={{ width: '100%',height:'50%' }}>
        <Card.Img onClick={handleShow} variant="top" src={video?.thumbnail} style={{ height: '220px' }} />
        <Card.Body>
          <Card.Text>
            {video?.caption}
          </Card.Text>
          <Button onClick={() => handleDelete(video?.id)} variant="light" className='float-end'>
            {inCard ? "" :
              <Trash2 color='#991f00' size={20}></Trash2>
            }          
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{video?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="100%" height="400px"
            src={video?.url + "?autoplay=1"}
            title="title"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
          </iframe>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default VideoCard