import React from 'react'
import Evaluation from './Evaluation'
import useForm from '../../hooks/useForm'

export default function CommunityEvaluations({
  user,
  profile,
  speech,
  setSpeech,
}) {
  const { setEvaluation } = useForm()

  return (
    <>
      {speech.evaluations ? (
        <>
          {speech.evaluations
            .filter(evaluation => evaluation.evaluator.id !== user._id)
            .map(evaluation => (
              <Evaluation
                key={`Evaluation by ${evaluation.evaluator.firstName}`}
                title={`Evaluation by ${evaluation.evaluator.firstName}`}
                user={user}
                evaluation={evaluation}
                setEvaluation={setEvaluation}
                profile={profile}
                speech={speech}
                setSpeech={setSpeech}
              />
            ))}
        </>
      ) : (
        <>
          <p>There are no evaluations yet.</p>
          {speech.userId !== user._id && (
            <p>Be the first to evaluate this speech!</p>
          )}
        </>
      )}
    </>
  )
}
