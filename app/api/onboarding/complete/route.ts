// app/api/onboarding/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const OnboardingSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ").max(100).trim(),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล").max(100).trim(),
  phone: z.string().max(20).trim().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = OnboardingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
          details: validation.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, phone } = validation.data;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        phone: phone || "",
        name: `${firstName} ${lastName}`, // Update full name
        onboardingCompleted: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        onboardingCompleted: true,
      },
    });

    console.log(`✅ User ${session.user.id} completed onboarding`);

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
        message: "บันทึกข้อมูลสำเร็จ",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Onboarding completion error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}