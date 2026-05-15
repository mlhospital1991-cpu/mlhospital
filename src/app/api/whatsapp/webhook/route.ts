import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

// GET: Webhook Verification
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }
  return new Response("Bad Request", { status: 400 });
}

// POST: Handle Messages
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if it's a WhatsApp message
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: "ok" });
    }

    const message = messages[0];
    const phone = message.from; // User's WhatsApp number
    const text = message.text?.body?.trim();

    if (!text) {
      return NextResponse.json({ status: "ok" });
    }

    // Get or create state
    let state = await prisma.whatsAppState.findUnique({
      where: { phone },
    });

    if (!state) {
      state = await prisma.whatsAppState.create({
        data: {
          phone,
          step: 0,
          data: "{}",
        },
      });
    }

    const data = JSON.parse(state.data);
    let nextStep = state.step;
    let replyText = "";

    const questions = [
      "Hi! I'm your virtual assistant for the FREE Second Opinion service. To get started, what is the **Patient's Full Name**?",
      "Thank you. Please provide your **Email Address** so we can send the specialist's report.",
      "What is the patient's **Age and Gender**? (e.g., 45, Male)",
      "Please describe the **Symptoms** or health issues in detail.",
      "Is there any **Current Diagnosis**? (Type 'None' if not applicable)",
      "Do you have any specific **Questions** for the doctor? (Type 'None' if none)",
    ];

    if (state.step === 0) {
      // Expecting Name
      data.patientName = text;
      nextStep = 1;
      replyText = questions[1];
    } else if (state.step === 1) {
      // Expecting Email
      data.email = text;
      nextStep = 2;
      replyText = questions[2];
    } else if (state.step === 2) {
      // Expecting Age & Gender
      const parts = text.split(",");
      data.age = parseInt(parts[0]?.trim()) || null;
      data.gender = parts[1]?.trim() || null;
      nextStep = 3;
      replyText = questions[3];
    } else if (state.step === 3) {
      // Expecting Symptoms
      data.symptoms = text;
      nextStep = 4;
      replyText = questions[4];
    } else if (state.step === 4) {
      // Expecting Diagnosis
      data.currentDiagnosis = text === "None" ? null : text;
      nextStep = 5;
      replyText = questions[5];
    } else if (state.step === 5) {
      // Expecting Questions
      data.questions = text === "None" ? null : text;
      nextStep = 6;
      
      // Save to SecondOpinion model
      try {
        await prisma.secondOpinion.create({
          data: {
            patientName: data.patientName || "Unknown",
            email: data.email || "no-email@provided.com",
            phone: phone, // Use WhatsApp number
            age: data.age,
            gender: data.gender,
            symptoms: data.symptoms || "No symptoms provided",
            currentDiagnosis: data.currentDiagnosis,
            questions: data.questions,
            status: "pending",
          },
        });

        replyText = "Thank you! Your details have been securely collected. Please **wait 1-2 hours**. A senior specialist will review your case and get in touch.";
        
        // Reset state for future requests
        nextStep = 0;
        data.patientName = "";
        data.email = "";
        data.age = null;
        data.gender = null;
        data.symptoms = "";
        data.currentDiagnosis = null;
        data.questions = null;
      } catch (error) {
        console.error("Error creating second opinion from WhatsApp:", error);
        replyText = "Sorry, there was an error saving your details. Please try again.";
      }
    }

    // Update state
    await prisma.whatsAppState.update({
      where: { phone },
      data: {
        step: nextStep,
        data: JSON.stringify(data),
      },
    });

    // Send WhatsApp Message
    if (replyText) {
      await sendWhatsAppMessage(phone, replyText);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
