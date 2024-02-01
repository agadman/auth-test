import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';

const QuizModal = ({ isVisible, onClose, questions = [] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of the quiz, you can close the modal or show a summary
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
          <Text style={styles.closeX} onPress={onClose}>
            X
          </Text>

        <ScrollView style={styles.content}>
          {/* Display the current question */}
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex]?.question}
          </Text>

          {/* Display the answers for the current question */}
          {questions[currentQuestionIndex]?.answers.map((answer, index) => (
            <TouchableOpacity key={index} style={styles.answerButton}>
              <Text>{answer}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleNextQuestion}>
            <Text style={styles.nextButton}>Next</Text>
          </TouchableOpacity>
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
    maxHeight: '80%',
    padding: 20,
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
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#3498db',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default QuizModal;
