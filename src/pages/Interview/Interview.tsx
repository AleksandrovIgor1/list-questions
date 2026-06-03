import { Icon } from '../../icons/Icon';
import styles from './styles.module.css'
import { useGetInterviewQuery } from '../../store/api/InterviewApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { AnswerStatus } from '../../store/api/types';
import { setAnswer } from '../../store/slices/interviewSlice';
import { InterviewProgress } from '../../components/InterviewProgress/InterviewProgress';
import { InterviewAnswerContainer } from '../../components/InterviewAnswerContainer/InterviewAnswerContainer';
import { useInterviewNavigation } from '../../hooks/useInterviewNavigation';



const Interview = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const specializationId = id ? Number(id) : undefined;

  const { data: interview, isLoading, error } = useGetInterviewQuery({ specialization: specializationId ?? 0 }, { skip: specializationId === undefined })

  const dispatch = useAppDispatch();

  const answers = useAppSelector((state) => state.interview.answers);

  const {
    currentQuestion,
    currentQuestionIndex,
    handlePrev,
    handleNext,
  } = useInterviewNavigation(interview);

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const handleAnswer = (status: AnswerStatus) => {
    if (!currentQuestion) return;
    dispatch(setAnswer({
      questionId: currentQuestion.id,
      status
    }))
  }

  const handleShowAnswer = () => {
    if (!currentQuestion) return;
    navigate(`/questions/${currentQuestion.id}`);
  };

  const handleFinish = () => {
    navigate(`/statistics/${specializationId}`);
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {'status' in error ? JSON.stringify(error.data) : error.message}</div>;
  if (!interview) return <div>Not found</div>;

  return (
    <div className={styles.container}>
      <InterviewProgress current={currentQuestionIndex} total={interview.fullCount} />
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
                onClick={handleShowAnswer}
              >
                Посмотреть ответ
              </span>
            </div>
            <InterviewAnswerContainer currentAnswer={currentAnswer} onAnswer={handleAnswer} className={styles.answerContainerDesktop} />
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
              onClick={handleShowAnswer}
            >
              Посмотреть ответ
            </span>

            <InterviewAnswerContainer currentAnswer={currentAnswer} onAnswer={handleAnswer} className={styles.answerContainerMobile} />
          </div>

        </div>
        <button onClick={handleFinish} className={styles.finishButton}>Завершить</button>
      </section>
    </div>
  );
};

export default Interview;