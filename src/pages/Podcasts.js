import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { setPodcasts } from '../slices/podcastSlice';
import PodcastCard from '../components/Podcasts/PodcastCard';
import InputComponent from '../components/common/input';

function PodcastsPage() {
    const dispatch=useDispatch();
    const podcasts=useSelector((state)=>state.podcasts.podcasts);

    const [search, setSearch]=useState(""); 


    useEffect(()=>{
        const unsubscribe=onSnapshot(
            query(collection(db,"podcasts")),
            (querySnapshot)=>{
                const podcastData=[];
                querySnapshot.forEach((doc)=>{
                    podcastData.push({id:doc.id,...doc.data()});
                });
                dispatch(setPodcasts(podcastData));
            },
            (error)=>{
                console.error("Error fetching podcasts:", error);
            }
        );

        return ()=>{
            unsubscribe();
        }
    },[dispatch])
    
    console.log(podcasts);
    var filteredPodcasts=podcasts.filter((item)=>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

  return (
    <div>
         <Header/>
        <div className='input-wrapper' style={{marginTop:"2rem"}}>
            <h1>Discover Podcasts</h1>

            <InputComponent
                state={search} 
                setState={setSearch} 
                placeholder={"Search By Title"} 
                type={"text"} 
            />

            {filteredPodcasts.length>0?( 
                <div className='podcasts-flex' style={{marginTop:"1.5rem"}}>  
                    {filteredPodcasts.map((item )=>{
                        return  (
                            <PodcastCard 
                                key={item.id}
                                id={item.id} 
                                title={item.title} 
                                displayImage={item.displayImage} 
                            />
                        )
                    })} 
                </div>
            ):(
            <p>{search?"No Podcast Found":"No Podcasts"}</p>
            )}
        </div>
    </div>
  )
}

export default PodcastsPage