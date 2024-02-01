import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../components/Colors';

const QuizModal = ({ isVisible, onClose, questions = [] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of the quiz, you can close the modal or show a summary
      onClose();
      setQuizStarted(false);
    }
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

          <ScrollView style={styles.content}>
          {/* Display the initial message and Start Quiz button */}
          {!quizStarted && (
            <View>
              <Text style={styles.initialMessage}>
                Ok, nu kör vi...
              </Text>
              <TouchableOpacity onPress={handleStartQuiz}>
                <Text style={styles.startQuizButton}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Display the current question */}
          {quizStarted && (
            <>
              <Text style={styles.questionText}>
                {questions[currentQuestionIndex]?.question}
              </Text>

              {/* Display the answers for the current question */}
              {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                <TouchableOpacity key={index} style={styles.answerButton}>
                  <Text>{answer}</Text>
                </TouchableOpacity>
              ))}
              
              {/* Display Next button */}
              <TouchableOpacity onPress={handleNextQuestion}>
                <Text style={styles.nextButton}>Next</Text>
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
    color: COLORS.white,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
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
});

export default QuizModal;
