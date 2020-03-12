import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'

export default function UserForm({ userData, setUserData }) {
  return (
    <AuthConsumer>
      {({ logIn }) => (
        <>
          <Form>
            <Input
              type="email"
              name="email"
              placeholder="Enter your E-Mail"
              value={userData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            <ButtonSection>
              <Button name="logIn" onClick={event => logIn(userData, event)}>
                Login
              </Button>
              <NavLinkStyled name="signUp" to={'/signup'}>
                Sign Up
              </NavLinkStyled>
            </ButtonSection>
          </Form>
        </>
      )}
    </AuthConsumer>
  )
  function handleChange(event) {
    event.target.name === 'email' &&
      setUserData({ ...userData, email: event.target.value })
    event.target.name === 'password' &&
      setUserData({ ...userData, password: event.target.value })
  }
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`
const Input = styled.input`
  font-size: 1rem;
`
const ButtonSection = styled.section`
  display: grid;
  grid-template: auto / 1fr 1fr;
  grid-gap: 8px;
`

const Button = styled.button`
  border: none;
  padding: 12px;
  background: ${props =>
    props.name === 'signUp' ? 'var(--primary-bg-color)' : '#eee'};
  font-size: 1rem;
  color: ${props =>
    props.name === 'signUp' ? 'var(--inverse-primary-font-color)' : 'inherit'};
  cursor: pointer;
`

const NavLinkStyled = styled(NavLink)`
  border: none;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-bg-color);
  font-size: 1rem;
  text-decoration: none;
  color: var(--inverse-primary-font-color);
`
