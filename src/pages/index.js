import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import StartForm from "../components/StartForm"
import TwilioVideo from "twilio-video"

import './index.css'

const Video = ({ token }) => {
  const localVidRef = useRef()
  const remoteVidRef = useRef()
  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        //attach local video
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
        })

        const addParticipant = participant => {
          console.log("Participant joined: ", participant)
          //attach remote tracks
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track

              remoteVidRef.current.appendChild(track.attach())
            }
          })
          participant.on("trackSubscribed", track => {
            remoteVidRef.current.appendChild(track.attach());
          })
        }
        room.participants.forEach(addParticipant)
        room.on("participantConnected", addParticipant)
      }
    )
  }, [token])

  return (
    <div class="video-container" >
      <div ref={localVidRef}></div>
      <div ref={remoteVidRef}></div>
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)

  return (
    <Layout>
      {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
    </Layout>
  )
}

export default IndexPage
