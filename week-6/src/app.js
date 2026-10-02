import "dotenv/config";
import express from "express";
import { z } from "zod";
import { classifySupportMessage } from "./llm/classify.js";

const app = express();

app.use(express.json());

const InputSchema = z.object({
    text: z.string().trim().min(1).max(2000)
}).strict();

app.get("/", (req, res) => {
    res.json({
        message: "Week 6 AI API is running"
    });
});

app.post("/classify", async (req, res) => {
    try {
        const parsedInput = InputSchema.safeParse(req.body);

        if (!parsedInput.success) {
            return res.status(400).json({
                error: "text must be a string between 1 and 2000 characters"
            });
        }

        const result = await classifySupportMessage(
            parsedInput.data.text
        );

        res.json(result);

    } catch (error) {
        console.error(error);

        res.status(502).json({
            error: error.message
        });
    }
});

export default app;