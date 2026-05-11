"use server";

export const aichat = async (message: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;

  // ট্রাই করার জন্য মডেলের লিস্ট
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-pro"
  ];

  for (const model of models) {
    try {
      // এই URL ফরম্যাটটি সরাসরি ডকুমেন্টেশন থেকে নেওয়া
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      });

      const data = await res.json();

      // যদি সাকসেস হয় তবে রিটার্ন করবে
      if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }

      // যদি ৪-৪ বা অন্য এরর আসে তবে লুপ পরের মডেলে যাবে
      console.log(`Model ${model} failed, trying next...`);
      
    } catch (err) {
      console.error(`Error with model ${model}:`, err);
    }
  }

  return "সবগুলো মডেল ট্রাই করা হয়েছে কিন্তু কাজ করেনি। আপনার API Key অথবা Google Cloud প্রজেক্টে সমস্যা আছে।";
};