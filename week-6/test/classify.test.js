import test from "node:test";
import assert from "node:assert/strict";

import { classifySupportMessage } from "../src/llm/classify.js";


// TEST 1
test("accepts a valid billing classification", async () => {
    const fakeClient = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    category: "billing",
                                    urgency: "high",
                                    confidence: 0.95,
                                    reason: "Customer was charged twice."
                                })
                            }
                        }
                    ]
                })
            }
        }
    };

    const result = await classifySupportMessage(
        "My payment was charged twice",
        fakeClient
    );

    assert.equal(result.category, "billing");
    assert.equal(result.urgency, "high");
    assert.equal(result.confidence, 0.95);
});


// TEST 2
test("accepts a valid feature classification", async () => {
    const fakeClient = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    category: "feature",
                                    urgency: "normal",
                                    confidence: 0.88,
                                    reason: "Customer is requesting a new feature."
                                })
                            }
                        }
                    ]
                })
            }
        }
    };

    const result = await classifySupportMessage(
        "Can you add dark mode to the application?",
        fakeClient
    );

    assert.equal(result.category, "feature");
    assert.equal(result.urgency, "normal");
    assert.equal(result.confidence, 0.88);
});


// TEST 3
test("rejects an invalid AI category", async () => {
    const fakeClient = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    category: "refund",
                                    urgency: "high",
                                    confidence: 0.9,
                                    reason: "Customer wants a refund."
                                })
                            }
                        }
                    ]
                })
            }
        }
    };

    await assert.rejects(
        classifySupportMessage(
            "I want a refund",
            fakeClient
        ),
        {
            message: "AI returned an invalid classification"
        }
    );
});


// TEST 4
test("rejects malformed AI JSON", async () => {
    const fakeClient = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [
                        {
                            message: {
                                content: "Sure! Your issue is related to billing."
                            }
                        }
                    ]
                })
            }
        }
    };

    await assert.rejects(
        classifySupportMessage(
            "My payment has an issue",
            fakeClient
        ),
        {
            message: "AI returned invalid JSON"
        }
    );
});


// TEST 5
test("accepts an uncertain classification as other with low confidence", async () => {
    const fakeClient = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    category: "other",
                                    urgency: "normal",
                                    confidence: 0.2,
                                    reason: "The message is unclear."
                                })
                            }
                        }
                    ]
                })
            }
        }
    };

    const result = await classifySupportMessage(
        "Something happened with my account",
        fakeClient
    );

    assert.equal(result.category, "other");
    assert.equal(result.confidence, 0.2);
});


// TEST 6
test("rejects confidence outside the 0 to 1 range", async () => {
    const fakeClient = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    category: "bug",
                                    urgency: "high",
                                    confidence: 1.5,
                                    reason: "Customer reports a problem."
                                })
                            }
                        }
                    ]
                })
            }
        }
    };

    await assert.rejects(
        classifySupportMessage(
            "The application crashed",
            fakeClient
        ),
        {
            message: "AI returned an invalid classification"
        }
    );
});


// TEST 7
test("retries a temporary AI failure and succeeds", async () => {
    let attempts = 0;

    const fakeClient = {
        chat: {
            completions: {
                create: async () => {
                    attempts++;

                    if (attempts === 1) {
                        const error = new Error("Temporary server error");
                        error.status = 503;
                        throw error;
                    }

                    return {
                        choices: [
                            {
                                message: {
                                    content: JSON.stringify({
                                        category: "bug",
                                        urgency: "high",
                                        confidence: 0.9,
                                        reason: "Customer reports an application error."
                                    })
                                }
                            }
                        ]
                    };
                }
            }
        }
    };

    const result = await classifySupportMessage(
        "The application keeps crashing",
        fakeClient
    );

    assert.equal(result.category, "bug");
    assert.equal(attempts, 2);
});


// TEST 8
test("stops after three failed AI attempts", async () => {
    let attempts = 0;

    const fakeClient = {
        chat: {
            completions: {
                create: async () => {
                    attempts++;

                    const error = new Error("Server unavailable");
                    error.status = 503;
                    throw error;
                }
            }
        }
    };

    await assert.rejects(
        classifySupportMessage(
            "The application is unavailable",
            fakeClient
        ),
        {
            message: "Server unavailable"
        }
    );

    assert.equal(attempts, 3);
});