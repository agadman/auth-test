import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../components/Colors';
import areaMapping from '../../areaMapping.json';

const QuizModal = ({ isVisible, onClose, questions = [], saveMaxAreaToFirestore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Use an array for multiple answers
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [resultAreas, setResultAreas] = useState({});

  useEffect(() => {
    // Reset the quiz state when the modal is opened
    if (isVisible) {
      setCurrentQuestionIndex(0);
      setQuizStarted(false);
      setSelectedAnswers([]);
      setQuizCompleted(false);
      setUserAnswers([]);
      setResultAreas({});
    }
  }, [isVisible]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswers.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
  
      const areas = Object.keys(areaMapping);
      for (const area of areas) {
        const keywords = areaMapping[area];
        if (selectedAnswers.some(answer => keywords.some(keyword => answer.toLowerCase().includes(keyword.toLowerCase())))) {
          setResultAreas({ ...resultAreas, [area]: (resultAreas[area] || 0) + 1 });
          break; // Stop checking other areas once a match is found
        }
      }
  
      // Proceed to the next question only if at least one answer is selected
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswers([...userAnswers, selectedAnswers]); // Save the selected answers
        setSelectedAnswers([]); // Reset selected answers for the next question
      } else {
        // Handle end of the quiz, show summary
        setUserAnswers([...userAnswers, selectedAnswers]); // Save the last selected answers
        setQuizCompleted(true);
      }
    }
  };


  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Toggle the selection for multiple answers if allowed
    if (currentQuestion.allowMultipleAnswers) {
      setSelectedAnswers((prevSelectedAnswers) => {
        if (prevSelectedAnswers.includes(answer)) {
          return prevSelectedAnswers.filter((selectedAnswer) => selectedAnswer !== answer);
        } else {
          return [...prevSelectedAnswers, answer];
        }
      });
    } else {
      // Single answer mode
      setSelectedAnswers([answer]);
    }
  };

  const getMaxArea = () => {
    let maxArea = null;
    let maxCount = 0;

    for (const area in resultAreas) {
      const count = resultAreas[area];
      if (count > maxCount) {
        maxCount = count;
        maxArea = area;
      }
    }

    return maxArea;
  };

  const handleEndQuiz = () => {
    const maxArea = getMaxArea();
    saveMaxAreaToFirestore(maxArea);
    onClose(); 
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        onClose();
        // Reset quizStarted state when the modal is closed
        setQuizStarted(false);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.closeX} onPress={onClose}>
          X
        </Text>
        <Text style={styles.headerStyle}>Min hälsa</Text>

        <ScrollView style={styles.content}>
          {/* Display the initial message and Start Quiz button */}
          {!quizStarted && !quizCompleted && (
            <View>
              <Text style={styles.initialMessage}>Ok, nu kör vi...</Text>
              <Text>Få grepp om din hälsa. Ibland kan enkla saker få dig att må så mycket bättre. Gör testet och få en personlig rekommendation på de saker som kan ge din hälsa en skjuts i rätt riktning.</Text>
              <TouchableOpacity onPress={handleStartQuiz} style={styles.startQuizButton}>
                <Text style={styles.startQuizButtonText}>Starta testet</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Display the current question */}
          {quizStarted && !quizCompleted && (
            <>
              <Text style={styles.questionText}>
                {questions[currentQuestionIndex]?.question}
              </Text>

              {/* Display the answers for the current question */}
              {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.answerButton,
                    selectedAnswers.includes(answer) && styles.selectedAnswerButton,
                  ]}
                  onPress={() => handleAnswerSelect(answer)}
                >
                  <Text>{answer}</Text>
                </TouchableOpacity>
              ))}

              {/* Display Next button */}
              <TouchableOpacity
                onPress={handleNextQuestion}
                disabled={selectedAnswers.length === 0} // Disable button if no answer is selected
              >
                <Text
                  style={[
                    styles.nextButton,
                    selectedAnswers.length === 0 && styles.disabledButton,
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Display quiz summary */}
          {quizCompleted && (
            <>
              <Text style={styles.summaryText}>Quiz Summary</Text>
              <View style={styles.summaryItem}>
                <Text>{`Your area is: ${getMaxArea()}`}</Text>
              </View>
              <TouchableOpacity onPress={handleEndQuiz}>
                <Text style={styles.nextButton}>End Quiz</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  closeX: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    backgroundColor: 'white',
    maxHeight: '85%',
    padding: 20,
  },
  initialMessage: {
    marginBottom: 10,
    fontSize: 16,
  },
  startQuizButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 20,
    width: '75%',
    marginTop: 20,
  },
  startQuizButtonText: {
    color: COLORS.white,
  },
  questionText: {
    marginBottom: 10,
    fontSize: 16,
  },
  answerButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 50,
    padding: 20,
    width: '75%',
    marginTop: 20,
  },

  selectedAnswerButton: {
    backgroundColor: '#AED581', // You can customize the color for the selected answer
  },

  disabledButton: {
    backgroundColor: '#D3D3D3', // You can customize the color for the disabled button
  },

  summaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  summaryItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
  },
});

export default QuizModal;