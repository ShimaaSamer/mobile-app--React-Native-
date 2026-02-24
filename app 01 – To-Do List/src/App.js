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
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// تفعيل خاصية التحريك (Animation) على أجهزة أندرويد
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [editId, setEditId] = useState(null);
  
  // Animated values for 3D effects
  const [animatedValues] = useState(() => 
    new Map()
  );

  // Get or create animated value for a goal
  const getAnimatedValue = (id) => {
    if (!animatedValues.has(id)) {
      animatedValues.set(id, new Animated.Value(0));
    }
    return animatedValues.get(id);
  };

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
      
      // Animate new goal with 3D effect
      const animValue = getAnimatedValue(newGoal.id);
      animValue.setValue(-30);
      Animated.spring(animValue, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
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
    const animValue = getAnimatedValue(id);
    Animated.timing(animValue, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setGoalsWithAnimation(goals.filter((g) => g.id !== id));
      animatedValues.delete(id);
    });
  };

  // بدء عملية التعديل
  const startEditHandler = (item) => {
    setEnteredGoal(item.text);
    setEditId(item.id);
  };

  // حساب نسبة الإنجاز
  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  // 3D Card Component
  const GoalCard3D = ({ item }) => {
    const animatedValue = getAnimatedValue(item.id);
    
    const rotateX = animatedValue.interpolate({
      inputRange: [-30, 0, 30],
      outputRange: ['-15deg', '0deg', '15deg'],
    });

    const translateY = animatedValue.interpolate({
      inputRange: [-30, 0, 100],
      outputRange: [-50, 0, 100],
    });

    const scale = animatedValue.interpolate({
      inputRange: [-30, 0],
      outputRange: [0.8, 1],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.goalItem,
          item.completed && styles.completedItem,
          {
            transform: [
              { perspective: 1000 },
              { rotateX },
              { translateY },
              { scale },
            ],
            opacity,
          },
        ]}
      >
        <TouchableOpacity 
          style={styles.goalTextWrapper} 
          onPress={() => toggleComplete(item.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox3D, item.completed && styles.checkboxCompleted3D]}>
            <Ionicons 
              name={item.completed ? "checkmark" : ""} 
              size={18} 
              color="white" 
            />
          </View>
          <Text style={[styles.goalText, item.completed && styles.completedText]}>
            {item.text}
          </Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          {!item.completed && (
            <TouchableOpacity 
              onPress={() => startEditHandler(item)} 
              style={[styles.iconBtn, styles.iconBtn3D]}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={22} color="#6200ee" />
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            onPress={() => deleteGoalHandler(item.id)} 
            style={[styles.iconBtn, styles.iconBtn3D, styles.deleteBtn3D]}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={22} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      
      {/* الجزء العلوي - الهيدر الاحترافي مع تأثير 3D */}
      <View style={styles.header3D}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>My Goals 🚀</Text>
          <Text style={styles.subTitle}>
            {completedCount} of {goals.length} tasks completed
          </Text>
        </View>
        <View style={styles.progressCircle3D}>
          <View style={styles.progressCircleInner}>
            <Text style={styles.progressText}>{progressPercent}%</Text>
          </View>
        </View>
      </View>

      {/* منطقة الإدخال العائمة مع تأثير 3D */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputWrapper}
      >
        <View style={styles.inputContainer3D}>
          <View style={styles.inputInner3D}>
            <TextInput
              placeholder="What's your goal?"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={setEnteredGoal}
              value={enteredGoal}
            />
          </View>
          <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.addBtn3D, editId ? styles.editBtnActive3D : null]} 
            onPress={addOrEditGoalHandler}
          >
            <View style={styles.addBtnInner3D}>
              <Ionicons name={editId ? "save" : "add"} size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* قائمة المهام */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <GoalCard3D item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon3D}>
              <Ionicons name="clipboard-outline" size={80} color="#ccc" />
            </View>
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
    backgroundColor: '#E8F4F8',
  },
  
  // 3D Header Styles
  header3D: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // 3D Shadow Effect
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 15,
    // Layer effect
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 216, 0.3)',
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    color: '#00B4D8',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 180, 216, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subTitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  
  // 3D Progress Circle
  progressCircle3D: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 180, 216, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    // 3D effect with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#00B4D8',
  },
  progressCircleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  progressText: {
    color: '#00B4D8',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 180, 216, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // 3D Input Container
  inputWrapper: {
    marginTop: -35,
    paddingHorizontal: 20,
    marginBottom: 10,
    zIndex: 10,
  },
  inputContainer3D: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    alignItems: 'center',
    // Deep 3D shadow with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 216, 0.2)',
  },
  inputInner3D: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 15,
    paddingVertical: 12,
    // Inner shadow effect
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  addBtn3D: {
    width: 56,
    height: 56,
    borderRadius: 22,
    backgroundColor: '#00B4D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    // 3D button effect with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  addBtnInner3D: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: '#00C4E4',
    justifyContent: 'center',
    alignItems: 'center',
    // Inner highlight
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  editBtnActive3D: {
    backgroundColor: '#FF9800',
    shadowColor: '#FF9800',
  },
  
  // 3D Goal Items
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  goalItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 22,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // 3D card effect with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 216, 0.15)',
  },
  completedItem: {
    backgroundColor: '#F1F1F1',
    opacity: 0.7,
    shadowOpacity: 0.05,
  },
  goalTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  // 3D Checkbox
  checkbox3D: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00B4D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    // 3D checkbox effect with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 216, 0.3)',
  },
  checkboxCompleted3D: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  
  goalText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  
  // 3D Action Buttons
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 8,
    marginLeft: 8,
  },
  iconBtn3D: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // 3D button effect with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 216, 0.2)',
  },
  deleteBtn3D: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(255, 82, 82, 0.3)',
    shadowColor: '#FF5252',
  },
  
  // Empty State with 3D
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon3D: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // 3D floating effect with glow
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 216, 0.2)',
  },
  emptyText: {
    color: '#00B4D8',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '500',
  },
});