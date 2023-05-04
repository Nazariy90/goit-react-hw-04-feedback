import React, { useState, useCallback, useMemo } from 'react';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Notification } from './Notification';

export const FeedbackApp = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = useCallback(option => {
    setFeedback(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  }, []);

  const countTotalFeedback = useMemo(() => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  }, [feedback]);

  const countPositiveFeedbackPercentage = useMemo(() => {
    const { good } = feedback;
    const totalFeedback = countTotalFeedback;
    return totalFeedback === 0 ? 0 : Math.round((good / totalFeedback) * 100);
  }, [feedback, countTotalFeedback]);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={feedback} onLeaveFeedback={handleFeedback} />
      </Section>
      {countTotalFeedback > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
