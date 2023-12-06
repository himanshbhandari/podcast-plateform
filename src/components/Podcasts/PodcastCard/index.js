import React from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'

function PodcastCard({id,title, displayImage}) {
    // var filteredPodcasts=podcasts.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <Link to={`/podcast/${id}`}>
        <div className='podcast-card'>
            <img className='display-image-podcast' src={displayImage}/>
            <p className='title-podcast'>{title}</p>
        </div>
    </Link>
  )
}

export default PodcastCard