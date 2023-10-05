import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideos } from '../service/allApis'

function View({data}) {

  const [videos,setVideos]=useState([])
  const [deletestatus,setDeleteState]=useState(false)

  const getVideos=async()=>{
    const result=await getAllVideos()
    // console.log(result.data);
    setVideos(result.data)
  }
  // console.log(videos);

  useEffect(()=>{
    getVideos()
  },[data,deletestatus])

  return (
    <div className='border rounded'>
      <Row>
        {
          videos?.map(video=>(
            <Col sm={12} md={4}>
            <VideoCard deleteUpdate={setDeleteState} video={video}></VideoCard>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default View