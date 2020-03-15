import React, { useState, useEffect } from 'react'

import styled from 'styled-components/macro'

export default function VoteButton({
  name = 'VoteButton',
  className = '',
  disabled = false,
  clickHandler = () => {
    console.log('VoteButton clicked')
  },
  content = 'VoteButton Content',
  counter = 0,
}) {
  return (
    <VoteButtonStyled
      className={className}
      disabled={disabled}
      id={name}
      name={name}
      key={`${counter} ${name}`}
      onClick={clickHandler}
    >
      {content}
      {'  '}
      {counter}
    </VoteButtonStyled>
  )
}

const VoteButtonStyled = styled.button`
  border: none;
  background: var(--inverse-primary-font-color);

  padding: 4px;
  text-align: center;
  font-size: 1rem;
  color: var(--primary-font-color);
  cursor: pointer;
  &.voted {
    background: red;
  }
`
