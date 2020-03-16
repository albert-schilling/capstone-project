import React from 'react'
import styled from 'styled-components/macro'

export default function TextArea({
  title = 'default textarea',
  name = 'default name',
  rows = 5,
  cols = 100,
  maxlength = 500,
  placeholder = 'Type here',
  evaluation,
  setEvaluation,
  reference,
}) {
  return (
    <>
      <TextAreaTitle>{title}</TextAreaTitle>
      <TextAreaStyled
        type="textarea"
        name={name}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        maxlength={maxlength}
        onChange={handleChange}
        value={evaluation[name]}
        ref={reference}
      ></TextAreaStyled>
    </>
  )
  function handleChange(event) {
    console.log('handleChange called')
    console.log('event.target.value', event.target.value)
    console.log('evaluation[name]', evaluation[name])
    console.log('evaluation', evaluation)
    Object.assign(evaluation, { name: event.target.value })
    console.log('evaluation before setEv after editing', evaluation)

    setEvaluation(evaluation)
    console.log('evaluation after editing', evaluation)
  }
}

const TextAreaStyled = styled.textarea`
  border: 1px solid var(--primary-font-color);
  width: 100%;
  padding: 8px;
  background: var(--light-grey);
  font-family: inherit;
  font-size: 0.8rem;
`

const TextAreaTitle = styled.p`
  margin: 0;
`
