import { NextResponse } from 'next/server';
import { Log } from 'logging-middleware';

export async function POST(request) {
    try {
        const body = await request.json();
        const { level, package: pkg, message } = body;

        await Log("frontend", level, pkg, message);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
