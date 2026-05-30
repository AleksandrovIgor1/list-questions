import { useState } from 'react';
import { Progress } from '../../ui/Progress/Progress';
import { Icon } from '../../icons/Icon';
import styles from './styles.module.css'
import { useGetInterviewQuery } from '../../store/api/InterviewApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { AnswerStatus } from '../../store/api/types';
import { setAnswer } from '../../store/slices/interviewSlice';



const Interview = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const specializationId = id ? Number(id) : undefined;

  const { data: interview, isLoading, error } = useGetInterviewQuery({ specialization: specializationId! }, { skip: specializationId === undefined })

  const dispatch = useAppDispatch();
  const answers = useAppSelector(state => state.interview.answers)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentQuestion = interview?.questions[currentQuestionIndex];
  const handleAnswer = (status: AnswerStatus) => {
    if (!currentQuestion) return;
    dispatch(setAnswer({
      questionId: currentQuestion.id,
      status
    }))
  }

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handlePrev = () => {
    if (currentQuestionIndex === 0) return;

    setCurrentQuestionIndex(prev => prev - 1);
  }

  const handleNext = () => {
    if (!interview) return;

    const isLastQuestionIndex = currentQuestionIndex >= interview.questions.length - 1;

    if (isLastQuestionIndex) return;

    setCurrentQuestionIndex(prev => prev + 1);
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {'status' in error ? JSON.stringify(error.data) : error.message}</div>;
  if (!interview) return <div>Not found</div>;

  return (
    <div className={styles.container}>
      <section className={styles.progressSection}>
        <div className={styles.headerProgress}>
          <h2 className={styles.title}>
            Вопросы собеседования
          </h2>

          <span className={styles.questionsCountDesktop}>
            {`${currentQuestionIndex + 1}/${interview.fullCount}`}
          </span>
        </div>

        <div className={styles.progressWrapper}>
          <Progress
            value={currentQuestionIndex + 1}
            max={interview.fullCount}
          />
        </div>

        <span className={styles.questionsCountMobile}>
          {`${currentQuestionIndex + 1}/${interview.fullCount}`}
        </span>
      </section>
      <section className={styles.questionWrapper}>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.prevButton}
            onClick={handlePrev}
          >
            <Icon name="arrow-prev" />
            <span className={styles.prevTitle}>Назад</span>
          </button>
          <Icon className={styles.prevTablet} name="prev-tablet-interview" onTouchStart={handlePrev} />
          <button
            type="button"
            className={styles.nextButton}
            onClick={handleNext}
          >
            <span className={styles.nextTitle}>Далее</span>
            <Icon name="arrow-next" />
          </button>
          <Icon className={styles.nextTablet} name="next-tablet-interview" onTouchStart={handleNext} />
        </div>
        <div className={styles.questionContainer}>
          <div className={styles.questionBody}>
            <div className={styles.questionInfo}>
              <h2 className={styles.questionTitle}>
                <Icon name='ellipse' className={styles.ellipseIcon} />
                <span className={styles.questionSpanTitle}>
                  {currentQuestion?.title}
                </span>
              </h2>
              <span
                className={styles.showAnswerDesktop}
                onClick={() => navigate(`/questions/${currentQuestion?.id}`)}
              >
                Посмотреть ответ
              </span>
            </div>

            <div className={styles.answerContainerDesktop}>
              <button
                onClick={() => handleAnswer('UNKNOWN')}
                className={`${styles.dontKnowButton} ${currentAnswer === 'UNKNOWN'
                  ? styles.dontKnowButtonActive
                  : ''
                  }`}
              >
                <Icon name='thumbs-down' className={styles.thumbsDownIcon} />
                <span className={styles.dontKnowTitle}>Не знаю</span>
              </button>

              <button
                onClick={() => handleAnswer('KNOWN')}
                className={`${styles.knowButton} ${currentAnswer === 'KNOWN'
                  ? styles.knowButtonActive
                  : ''
                  }`}
              >
                <Icon name='thumbs-up' className={styles.thumbsUpIcon} />
                <span className={styles.knowTitle}>Знаю</span>
              </button>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              className={styles.questionImage}
              src={currentQuestion?.imageSrc ?? ""}
              alt={currentQuestion?.title}
            />
          </div>
          <div className={styles.mobileActions}>
            <span
              className={styles.showAnswerMobile}
              onClick={() => navigate(`/questions/${currentQuestion?.id}`)}
            >
              Посмотреть ответ
            </span>

            <div className={styles.answerContainerMobile}>
              <button
                onClick={() => handleAnswer('UNKNOWN')}
                className={`${styles.dontKnowButton} ${currentAnswer === 'UNKNOWN'
                  ? styles.dontKnowButtonActive
                  : ''
                  }`}
              >
                <Icon name='thumbs-down' className={styles.thumbsDownIcon} />
                <span className={styles.dontKnowTitle}>Не знаю</span>
              </button>

              <button
                onClick={() => handleAnswer('KNOWN')}
                className={`${styles.knowButton} ${currentAnswer === 'KNOWN'
                  ? styles.knowButtonActive
                  : ''
                  }`}
              >
                <Icon name='thumbs-up' className={styles.thumbsUpIcon} />
                <span className={styles.knowTitle}>Знаю</span>
              </button>
            </div>
          </div>

        </div>
        <button onClick={() => navigate(`/statistics/${specializationId}`)} className={styles.finishButton}>Завершить</button>
      </section>
    </div>
  );
};

export default Interview;