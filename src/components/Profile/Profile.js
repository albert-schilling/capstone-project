import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { getUser } from '../../services/userServices'
import IconClose from '../Icons/IconClose'
import SpeechCard from '../Speech/Card/SpeechCard'
import { getSpeechesByUser } from '../../services/speechServices'

export default function Profile({
  speakerId = '',
  setSpeakerId = () => {},
  profile = {},
  setActivePage = () => {},
  modal = '',
  setModal = () => {},
  setSpeech,
  useLoading = true,
  exampleProfile = null,
}) {
  const [lightbox, setLightbox] = useState(false)
  const [loading, setLoading] = useState(useLoading)
  const [foreignProfile, setForeignProfile] = useState(
    exampleProfile && exampleProfile
  )
  const [speechesByUser, setSpeechesByUser] = useState([])

  useEffect(() => {
    speakerId.length > 0 &&
      getUser({ id: speakerId })
        .then(res => setForeignProfile(res))
        .then(() => setLoading(false))
        .catch(error => console.log('Error retrieving user:', error))
    speakerId.length > 0 &&
      getSpeechesByUser({ id: speakerId }).then(res => setSpeechesByUser(res))
  }, [speakerId])
  return (
    <Section
      className={modal === 'profile' && 'visible'}
      onClick={handleClickOnContainer}
      title="container"
    >
      <Wrapper>
        <IconClose position="topright" callback={() => setModal('')} />

        {loading ? (
          <Spinner>
            <SpinnerBalls />
          </Spinner>
        ) : (
          <>
            <ProfileSection>
              {lightbox ? (
                <Lightbox>
                  <LightboxClose>
                    <IconClose
                      color="#fff"
                      callback={() => setLightbox(false)}
                    />
                  </LightboxClose>
                  <LightboxImage>
                    <Image
                      src={
                        foreignProfile.portrait &&
                        foreignProfile.portrait.length > 0
                          ? foreignProfile.portrait
                          : '/images/default_protrait_cicero_001.jpg'
                      }
                      alt={
                        foreignProfile.portrait &&
                        foreignProfile.portrait.length > 0
                          ? `Portrait by ${foreignProfile.firstName} ${foreignProfile.lastName}`
                          : 'Default image of a user foreignProfile on Ciceroic, showing Marcus Tullius Cicero, the great rhetorician from ancient Rome.'
                      }
                    />
                  </LightboxImage>
                </Lightbox>
              ) : (
                <Portrait
                  onClick={() => setLightbox(true)}
                  style={{
                    backgroundImage: `url('${
                      foreignProfile.portrait &&
                      foreignProfile.portrait.length > 0
                        ? foreignProfile.portrait
                        : '/images/default_protrait_cicero_001.jpg'
                    }')`,
                  }}
                />
              )}
              <AboutSection>
                <Name>
                  {foreignProfile.firstName} {foreignProfile.lastName}
                </Name>
                <About>{foreignProfile.about}</About>
              </AboutSection>
            </ProfileSection>
            {speechesByUser.length > 0 ? (
              <>
                <p>Speeches by {foreignProfile.firstName}:</p>
                <Speeches>
                  {speechesByUser.map(speech => (
                    <SpeechCard
                      key={speech._id}
                      profile={profile}
                      speech={speech}
                      setSpeech={setSpeech}
                      setActivePage={setActivePage}
                      setModal={setModal}
                      speakerId={speech.userId}
                      setSpeakerId={setSpeakerId}
                    />
                  ))}
                </Speeches>
              </>
            ) : (
              <p>No speeches yet.</p>
            )}
          </>
        )}
      </Wrapper>
    </Section>
  )
  function handleClickOnContainer(event) {
    event.persist()
    event.target.title === 'container' && setModal('')
  }
}

const Section = styled.section`
  position: fixed;
  top: 0;
  display: none;
  align-content: flex-start;
  justify-items: center;
  grid-gap: 20px;
  margin: 0;
  height: 100vh;
  width: 100%;
  padding: 80px 20px 20px 20px;
  overflow: hidden;
  z-index: 20;
  &.visible {
    display: grid;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: grid;
  align-content: flex-start;
  width: 100%;
  max-width: 700px;
  border: 1px solid var(--highlight-color);
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
  box-shadow: 0 0 40px #888;
  > *:last-child {
    padding-bottom: 40px;
  }
`

const ProfileSection = styled.section`
  display: grid;
  @media (min-width: 700px) {
    display: grid;
    grid-template: auto / 1fr 1fr;
    grid-gap: 40px;
  }
`

const Portrait = styled.section`
  background-size: cover;
  justify-self: center;
  margin: 0 0 20px 0;
  border: 2px solid var(--light-grey);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  @media (min-width: 700px) {
    width: 250px;
    height: 250px;
  }
`
const AboutSection = styled.section`
  @media (min-width: 700px) {
    display: grid;
    grid-gap: 12px;
    align-content: center;
  }
`

const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`

const About = styled.p`
  margin: 0;
  line-height: 1.4rem;
`

const Lightbox = styled.section`
  position: fixed;
  display: grid;
  grid-template: auto max-content / 1fr;
  width: 100%;
  height: 100%;
  z-index: 20;
  left: 0;
  top: 0;
`
const LightboxImage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--primary-font-color);
  overflow: hidden;
  > img {
    width: auto;
    height: 100%;
  }
`
const Image = styled.img`
  text-align: center;
  align-self: center;
`

const LightboxClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
`

const Speeches = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > *:nth-child(n) {
    margin-bottom: 12px;
  }
  @media (min-width: 700px) {
    > *:nth-child(n) {
      width: calc(50% - 6px);
    }
  }
`

const Spinner = styled.section`
  position: absolute;
  left: calc(50% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 4px;
  height: 200px;
  margin: 20px 0;
`

const SpinnerBalls = styled.div`
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  clear: both;
  border-radius: 50%;
  background-color: #000;
  width: 18px;
  height: 18px;
  :before,
  :after {
    position: absolute;
    border-radius: 50%;
    background-color: #000;
    width: 18px;
    height: 18px;
    transform-origin: center center;
    display: inline-block;
  }
  position: relative;
  background-color: rgba(#000, 1);
  opacity: 1;
  -webkit-animation: spScaleAlpha 1s infinite linear;
  animation: spScaleAlpha 1s infinite linear;
  :before,
  :after {
    content: '';
    opacity: 0.25;
  }
  :before {
    left: 30px;
    /* left: 30px; */
    /* top: 0px; */
    -webkit-animation: spScaleAlphaBefore 1s infinite linear;
    animation: spScaleAlphaBefore 1s infinite linear;
  }
  :after {
    right: 30px;

    /* left: -30px; */
    /* top: -23px; */
    -webkit-animation: spScaleAlphaAfter 1s infinite linear;
    animation: spScaleAlphaAfter 1s infinite linear;
  }
  @-webkit-keyframes spScaleAlpha {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes spScaleAlpha {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes spScaleAlphaBefore {
    0% {
      opacity: 0.25;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0.25;
    }
  }
  @keyframes spScaleAlphaBefore {
    0% {
      opacity: 0.25;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0.25;
    }
  }
  @-webkit-keyframes spScaleAlphaAfter {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
  @keyframes spScaleAlphaAfter {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
`
