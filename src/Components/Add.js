import React from 'react'
import { PlusSquare } from 'react-feather'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import { addVideo } from '../service/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({updateData}) {

  //state for store input data
  const [uploadData, setUploadData] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: ""
  })

  //function to input data
  const setInput = (e) => {
    // console.log(e.target.value);
    // let {value}=e.target      //value=e.target.value
    //access key
    // console.log(e.target.name);
    let { name, value } = e.target
    //upload the key values with existing object
    setUploadData({ ...uploadData, [name]: value })
  }
  // console.log(uploadData);

  const extractUrl = (e) => {
    let videoUrl = e.target.value
    //check the url contain v= string
    if (videoUrl.includes("v=")) {
      let index = videoUrl.indexOf("v=")
      // console.log(index);
      let extractUrl = videoUrl.substring(index + 2, index + 13)
      // console.log(extractUrl);
      let fullUrl = `https://www.youtube.com/embed/${extractUrl}`
      // console.log({...uploadData,[e.target.name]:fullUrl});
      setUploadData({ ...uploadData, [e.target.name]: fullUrl })
    }
  }

  //function to add
  const handleAdd = async () => {
    // console.log(uniqid());
    let id = uniqid()
    setUploadData({ ...uploadData, ["id"]: id })
    // console.log({...uploadData,["id"]:uniqid()});

    const { caption, thumbnail, url } = uploadData
    if (caption == "") {
      toast.warn('please input caption', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else if (thumbnail == "") {
      toast.warn('please input thumbnail', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else if (url == "") {
      toast.warn('please input url', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      const result = await addVideo(uploadData)
      if (result.status >= 200 && result.status < 300) {
        // alert("video added")
        updateData(result.data)
        toast.success('video added', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setShow(false);
      }
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <PlusSquare onClick={handleShow} className='btn' size={100}></PlusSquare>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="caption"
            label="Video Caption"
            className="mb-3">
            <Form.Control name='caption' onChange={setInput} type="text" />
          </FloatingLabel>

          <FloatingLabel
            controlId="cover"
            label="Video Cover Image URL"
            className="mb-3">
            <Form.Control name='thumbnail' onChange={setInput} type="text" />
          </FloatingLabel>

          <FloatingLabel
            controlId="uvideo"
            label="Youtube Video URL"
            className="mb-3">
            <Form.Control name='url' onChange={extractUrl} type="text" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="success">
            Add
          </Button>
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

export default Add