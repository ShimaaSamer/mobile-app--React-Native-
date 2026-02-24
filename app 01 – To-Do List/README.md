# 📱 App 01 – To-Do List App

---

## 📌 **Description**
A modern To-Do List mobile application developed using **React Native** and **Expo Snack**. The app is designed with **3D animations** for tasks, adding a visually engaging experience. Users can manage their daily goals efficiently by adding, editing, deleting, marking tasks as completed, and interacting with a scrollable list.

---

## ⚙️ **Features**
- **Add new goals**: Users can input new tasks easily.
- **Edit existing goals**: Users can modify existing tasks.
- **Delete goals**: Remove tasks from the list.
- **Mark goals as completed**: Toggle between completed and pending states for tasks.
- **Scrollable list**: Tasks are displayed in a scrollable list using **FlatList**.
- **Keyboard handling**: Proper handling of keyboard appearance with **KeyboardAvoidingView**.
- **3D Animated Effects**: Tasks come with animated transitions, including 3D effects for goals when added or removed.
- **Empty state message**: When the list is empty, users are prompted to add a goal.

---

## 🔗 **Expo Snack Link**
You can run the app on Expo Snack here:  
[App – To-Do List](https://snack.expo.dev/@shoroukmm7/todo_list_lab_2)

---

## 🎨 **Color Palette**
The application uses a **modern dark UI** design with a clean and professional color scheme inspired by productivity apps.

| Purpose             | Color Name           | Hex Code    |
|---------------------|----------------------|-------------|
| Main Background     | Dark Navy            | `#0f172a`   |
| Card Background     | Dark Slate           | `#1e293b`   |
| Primary Accent      | Indigo               | `#6366f1`   |
| Update Action       | Green                | `#10b981`   |
| Delete Action       | Red                  | `#ef4444`   |
| Borders             | Muted Blue-Gray      | `#334155`   |
| Primary Text        | Off White            | `#f8fafc`   |
| Secondary Text      | Gray                 | `#64748b`   |
| Placeholder Text    | Light Gray           | `#94a3b8`   |

This palette enhances focus, reduces eye strain, and ensures a smooth user experience.

---

## 🔤 **Fonts**
The app uses the default system font provided by React Native with the following font weights:
- Regular
- Medium
- Bold
- Extra Bold

---

## 🛠️ **Technologies Used**
- **React Native**: Framework for building the app.
- **Expo Snack**: Development and testing environment.
- **JavaScript**: Primary programming language.
- **FlatList**: Used for displaying the task list.
- **React Hooks**: (`useState` and `useEffect`) for managing state.

---

## 🎓 **Course Information**
- **Course**: Mobile Application Development  
- **University**: Helwan University – FEHU  
- **Student**: Shimaa Samer Ahmed

---

## 🧑‍💻 **Code Overview**
This app leverages **React Native** with **3D animated transitions** for the task list, utilizing both **LayoutAnimation** for smooth animations and **Animated API** for the 3D card effects.

### Key Functions:
- **addOrEditGoalHandler**: Adds a new task or updates an existing one.
- **toggleComplete**: Toggles the completion status of a goal.
- **deleteGoalHandler**: Deletes a task with a 3D animation.
- **GoalCard3D**: A custom component rendering each task with 3D effects, including scaling, rotation, and opacity changes.


---

## 🛠️ **Installation Steps**
1. Clone the repository or use the provided Expo Snack link.
2. Ensure you have **Expo Go** app installed on your device or run on the web through **Expo Snack**.
3. Scan the QR code or visit the link to load the app in the Expo Go app.
4. Edit the task list by adding, editing, or deleting tasks. Use the animated 3D effects for an interactive experience.

---

## ⚙️ **App Demo**
Explore the interactive features by visiting the **Expo Snack** demo link:  
[**Try the To-Do List App**](https://snack.expo.dev/@shimaa_samer/todo_list_1)

---