import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StartForm from "../components/StartForm"
import TwilioVideo from "twilio-video"

const Video = ({ token }) => {
  const localVidRef = useRef();
  const remoteVidRef = useRef();
  useEffect(() => {
    TwilioVideo
    .connect(token, { video: true, audio: true, name: "test" })
    .then(room => {
      //attach local video
        TwilioVideo.createLocalVideoTrack()
        .then(track=>{
          localVidRef.current.appendChild(track.attach());
        })

        //attach remote tracks
        room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed){
              const track = publication.track;

              remoteVidRef.current.appendChild(track.attach());
            }
          })
        })
      }
    )
  }, [token])

  return (
    <>
      <div ref={localVidRef}></div>
      <div ref={remoteVidRef}></div>
    </>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Twilio test</h1>
      {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
      <p>
        1. Show local video 2. Connect to a room 3. Show participants' video 4.
        Handle events
      </p>
    </Layout>
  )
}

export default IndexPage
