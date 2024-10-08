const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Habit = require("../models/Habit.model");
const Task = require("../models/Task.model");
const TaskTracker = require("../models/TaskTracker.model");
const HabitTracker = require("../models/HabitTracker.model");
const SuccessStory = require("../models/SuccessStory.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/habit-tracker-app";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    seedData();
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const saltRounds = 10;

async function seedData() {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync("abc123", salt);

    // Create Users
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        age: 30,
        gender: "male",
        isAdmin: true,
        picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        age: 25,
        gender: "female",
        isAdmin: false,
        picture:
          "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde",
      },
      {
        name: "Sam Johnson",
        email: "sam@example.com",
        password: hashedPassword,
        age: 28,
        gender: "non-binary",
        isAdmin: false,
        picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    ]);

    // Create Habits
    const habits = await Habit.insertMany([
      {
        name: "Quit Smoking",
        description: "A daily habit to avoid smoking",
        frequency: "Daily",
        defaultTasks: ["Don't smoke today"],
        creator: users[0]._id,
        displayedPicture:
          "https://images.unsplash.com/photo-1555441293-6c6fb1eb9773",
      },
      {
        name: "Eat Healthy",
        description: "A daily habit to eat nutritious meals",
        frequency: "Daily",
        defaultTasks: ["Eat a balanced meal"],
        creator: users[1]._id,
        displayedPicture:
          "https://images.unsplash.com/photo-1598563596732-6e4d1d5206d7",
      },
      {
        name: "Do Exercise",
        description: "A daily habit to stay fit",
        frequency: "Daily",
        defaultTasks: ["Do a 30-minute workout"],
        creator: users[2]._id,
        displayedPicture:
          "https://plus.unsplash.com/premium_photo-1664444389139-f883bf3791e6",
      },
      {
        name: "Drink Water",
        description: "A daily habit to stay hydrated",
        frequency: "Daily",
        defaultTasks: ["Drink 8 glasses of water"],
        creator: users[0]._id,
        displayedPicture:
          "https://images.unsplash.com/photo-1529079337819-f6d0024bd364",
      },
      {
        name: "Sleep Well",
        description: "A daily habit to improve sleep quality",
        frequency: "Daily",
        defaultTasks: ["Get at least 7 hours of sleep"],
        creator: users[1]._id,
        displayedPicture:
          "https://images.unsplash.com/photo-1495197359483-d092478c170a",
      },
      {
        name: "Screen Time Reduction",
        description: "A daily habit to reduce screen time",
        frequency: "Daily",
        defaultTasks: ["Limit screen time to 2 hours"],
        creator: users[2]._id,
        displayedPicture:
          "https://images.unsplash.com/photo-1514464750060-00e6e34c8b8c",
      },
      {
        name: "Read a Book",
        description: "A daily habit to read and grow",
        frequency: "Daily",
        defaultTasks: ["Read for 20 minutes"],
        creator: users[0]._id,
        displayedPicture:
          "https://plus.unsplash.com/premium_photo-1663099672816-216f4cf67abb",
      },
    ]);

    // Create Tasks
    const tasks = await Task.insertMany([
      {
        name: "Don't smoke today",
        description: "Task to avoid smoking for one day",
        habitId: habits[0]._id,
        creator: users[0]._id,
      },
      {
        name: "Eat a balanced meal",
        description: "Task to eat a nutritious meal",
        habitId: habits[1]._id,
        creator: users[1]._id,
      },
      {
        name: "Do a 30-minute workout",
        description: "Task to stay physically active",
        habitId: habits[2]._id,
        creator: users[2]._id,
      },
      {
        name: "Drink 8 glasses of water",
        description: "Task to stay hydrated",
        habitId: habits[3]._id,
        creator: users[0]._id,
      },
      {
        name: "Get at least 7 hours of sleep",
        description: "Task to improve sleep quality",
        habitId: habits[4]._id,
        creator: users[1]._id,
      },
      {
        name: "Limit screen time to 2 hours",
        description: "Task to reduce screen exposure",
        habitId: habits[5]._id,
        creator: users[2]._id,
      },
      {
        name: "Read for 20 minutes",
        description: "Task to read a book for personal growth",
        habitId: habits[6]._id,
        creator: users[0]._id,
      },
    ]);

    // Create Success Stories
    const successStories = await SuccessStory.insertMany([
      {
        userId: users[0]._id,
        habitId: habits[0]._id,
        title: "John's Quit Smoking Journey",
        description: "I've been smoke-free for a month now, and I feel great!",
      },
      {
        userId: users[1]._id,
        habitId: habits[1]._id,
        title: "Jane's Healthy Eating Success",
        description:
          "Eating healthy has given me more energy and improved my mood.",
      },
      {
        userId: users[2]._id,
        habitId: habits[2]._id,
        title: "Sam's Fitness Breakthrough",
        description: "Working out daily has helped me reach my fitness goals.",
      },
    ]);

    // Create Task Trackers
    const taskTrackers = await TaskTracker.insertMany([
      {
        taskId: tasks[0]._id,
        userId: users[0]._id,
        isCompleted: true,
        date: new Date(),
        comments: "Feeling healthier already!",
      },
      {
        taskId: tasks[1]._id,
        userId: users[1]._id,
        isCompleted: true,
        date: new Date(),
        comments: "Ate a great salad today!",
      },
      {
        taskId: tasks[2]._id,
        userId: users[2]._id,
        isCompleted: true,
        date: new Date(),
        comments: "Did a great workout today!",
      },
      {
        taskId: tasks[3]._id,
        userId: users[0]._id,
        isCompleted: false,
        date: new Date(),
        comments: "Only drank 6 glasses of water.",
      },
      {
        taskId: tasks[4]._id,
        userId: users[1]._id,
        isCompleted: true,
        date: new Date(),
        comments: "Slept 8 hours last night!",
      },
      {
        taskId: tasks[5]._id,
        userId: users[2]._id,
        isCompleted: false,
        date: new Date(),
        comments: "Exceeded my screen time limit.",
      },
      {
        taskId: tasks[6]._id,
        userId: users[0]._id,
        isCompleted: true,
        date: new Date(),
        comments: "Read a great book chapter.",
      },
    ]);

    // Create Habit Trackers
    const habitTrackers = await HabitTracker.insertMany([
      {
        habitId: habits[0]._id,
        userId: users[0]._id,
        taskTrackerIds: [taskTrackers[0]._id],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week
        progress: 100,
      },
      {
        habitId: habits[1]._id,
        userId: users[1]._id,
        taskTrackerIds: [taskTrackers[1]._id],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        progress: 100,
      },
      {
        habitId: habits[2]._id,
        userId: users[2]._id,
        taskTrackerIds: [taskTrackers[2]._id],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        progress: 100,
      },
    ]);

    console.log("Data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}
