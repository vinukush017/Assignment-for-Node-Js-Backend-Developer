import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../Models/userModel";

const router = express.Router();
let users: User[] = [];

// Get all users
router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

// Get user by ID
router.get("/:userId", (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// Create a new user
router.post("/", (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;
  if (
    !username ||
    typeof username !== "string" ||
    !age ||
    typeof age !== "number"
  ) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies: Array.isArray(hobbies) ? hobbies : [],
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
router.put("/:userId", (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[userIndex] = { id: userId, username, age, hobbies };
  res.json(users[userIndex]);
});

// Delete an existing user
router.delete("/:userId", (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  users = users.filter((user) => user.id !== userId);
  res.status(204).end();
});

export default router;
