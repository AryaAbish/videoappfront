import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory, getAllcategories, getVideo, removeCategory, updateCategory } from '../service/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import { Trash } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';


function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to store input
  const [uploadcategory, setUploadCategory] = useState({
    id: "",
    name: "",
    allvideos: []
  })

  const [categories,setcategories]=useState([])

  const setInput = (e) => {
    // console.log(e.target.value);
    let { name, value } = e.target
    setUploadCategory({ ...uploadcategory, [name]: value})
  }
  // console.log(uploadcategory);

  const getallcat=async()=>{
    const result=await getAllcategories()
    // console.log(result.data);
    setcategories(result.data)
  }
  // console.log(categories);

  useEffect(()=>{
    getallcat()
  },[])

  const handleAdd = async () => {
    let id=uniqid()
    setUploadCategory({ ...uploadcategory })
    // console.log({ ...uploadcategory });

    const { categoryName } = uploadcategory
    if (id == "") {
      // alert("Enter id")
      toast.warn('please enter id', {
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
    else if (categoryName == "") {
      // alert("enter category name")
      toast.warn('please enter category name', {
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
      const result = await addCategory(uploadcategory)
      if (result.status >= 200 && result.status < 300) {
        toast.success('Category added', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // alert('Category Added')
        setShow(false);
        getallcat()
      }
    }
  }

  const handleDelete=async(id)=>{
    const response=await removeCategory(id)
    // console.log(response);
    if(response.status>=200 && response.status<300){
      // toast.success('category deleted')
      // alert('category deleted')
      getallcat()
    }
  }

  const draggedOver=(e)=>{
    e.preventDefault()
    // console.log("Dragged over the category...");
  }
  const dropped=async(e,id)=>{
    // console.log("category id "+id);
    //access video id transfered from start drag
    let sourceCardId=e.dataTransfer.getData("cardId") //cardId transferred when card dragged
    // console.log("Source card id is "+sourceCardId);

    const {data}=await getVideo(sourceCardId)
    // console.log(data);

    //update category
    //find selected category from all categories using cat id
    const selectedCategory=categories.find(i=>i.id==id)
    // console.log(selectedCategory);

    //add videos to allvideos array of selected category
    selectedCategory.allvideos.push(data)
    // console.log(selectedCategory);

    //update category in db
    await updateCategory(id,selectedCategory)

    //to access updated category from db
    getallcat()
  }

  return (
    <div>
      <>
        <Button variant="primary" className='mt-4' onClick={handleShow}>
          Add Category
        </Button>

        {
          categories?.map(item=>(
            <div droppable onDragOver={(e)=>draggedOver(e)}
            onDrop={(e)=>dropped(e,item?.id)}
             className='border m-1 p-2'>
              <h6>{item?.name} <span onClick={()=>handleDelete(item?.id)} className='float-end text-danger btn p-1'><Trash></Trash></span></h6>
              <Row>
                {
                  item?.allvideos.map(i=>(
                    <Col>
                    <VideoCard inCard={true} video={i}></VideoCard>
                    </Col>
                  ))
                }
              </Row>
            </div>
          ))
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="category name"
              label="category name"
              className="mb-3">
              <Form.Control type="text" name='name' onChange={(e)=>setInput(e)} />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleAdd} variant="primary">
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
      </>
    </div>
  )

}

export default Category