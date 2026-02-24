import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
// تأكد من وجود مكتبة الأيقونات (تأتي افتراضياً مع Expo)
import { Ionicons } from '@expo/vector-icons';

// تفعيل خاصية التحريك (Animation) على أجهزة أندرويد
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [editId, setEditId] = useState(null);

  // وظيفة لتحديث القائمة مع إضافة حركة سلاسة (Animation)
  const setGoalsWithAnimation = (newGoals) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGoals(newGoals);
  };

  // إضافة أو تعديل هدف
  const addOrEditGoalHandler = () => {
    if (enteredGoal.trim().length === 0) return;

    if (editId) {
      const updatedGoals = goals.map((g) =>
        g.id === editId ? { ...g, text: enteredGoal } : g
      );
      setGoalsWithAnimation(updatedGoals);
      setEditId(null);
    } else {
      const newGoal = {
        id: Date.now().toString(),
        text: enteredGoal,
        completed: false,
      };
      setGoalsWithAnimation([newGoal, ...goals]);
    }
    setEnteredGoal('');
  };

  // تغيير حالة الهدف (تم الإنجاز أم لا)
  const toggleComplete = (id) => {
    const updatedGoals = goals.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    setGoalsWithAnimation(updatedGoals);
  };

  // حذف هدف
  const deleteGoalHandler = (id) => {
    setGoalsWithAnimation(goals.filter((g) => g.id !== id));
  };

  // بدء عملية التعديل
  const startEditHandler = (item) => {
    setEnteredGoal(item.text);
    setEditId(item.id);
  };

  // حساب نسبة الإنجاز
  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      
      {/* الجزء العلوي - الهيدر الاحترافي */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>My Goals 🚀</Text>
          <Text style={styles.subTitle}>
            {completedCount} of {goals.length} tasks completed
          </Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>{progressPercent}%</Text>
        </View>
      </View>

      {/* منطقة الإدخال العائمة */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputWrapper}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="What's your goal?"
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={setEnteredGoal}
            value={enteredGoal}
          />
          <TouchableOpacity 
            activeOpacity={0.7}
            style={[styles.addBtn, editId ? styles.editBtnActive : null]} 
            onPress={addOrEditGoalHandler}
          >
            <Ionicons name={editId ? "save" : "add"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* قائمة المهام */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.goalItem, item.completed && styles.completedItem]}>
            <TouchableOpacity 
              style={styles.goalTextWrapper} 
              onPress={() => toggleComplete(item.id)}
            >
              <Ionicons 
                name={item.completed ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={item.completed ? "#4CAF50" : "#6200ee"} 
              />
              <Text style={[styles.goalText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              {!item.completed && (
                <TouchableOpacity onPress={() => startEditHandler(item)} style={styles.iconBtn}>
                  <Ionicons name="create-outline" size={22} color="#6200ee" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteGoalHandler(item.id)} style={styles.iconBtn}>
                <Ionicons name="trash-outline" size={22} color="#FF5252" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="clipboard-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No goals yet. Add one above!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 5,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#03DAC6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputWrapper: {
    marginTop: -30,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  addBtn: {
    backgroundColor: '#6200ee',
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnActive: {
    backgroundColor: '#FF9800',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  goalItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
  },
  completedItem: {
    backgroundColor: '#F1F1F1',
    opacity: 0.7,
  },
  goalTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 5,
    marginLeft: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: '#bbb',
    fontSize: 18,
    marginTop: 15,
  },
});